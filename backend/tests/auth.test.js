const request = require("supertest")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const app = require("../src/app")
const config = require("../src/config/index")
const User = require("../src/models/User")
const { connect, disconnect } = require("../src/db/connection")

const validUser = { name: "Test User", email: "test@test.com", password: "123456" }

const refreshTokens = () => mongoose.connection.collection("refreshtokens")

const registerUser = (user = validUser) => request(app).post("/auth/register").send(user)

const loginUser = (user = validUser) =>
  request(app).post("/auth/login").send({ email: user.email, password: user.password })

const registerAndLogin = async () => {
  await registerUser()
  const res = await loginUser()
  return res.body
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

describe("Auth", () => {
  beforeAll(async () => {
    await connect(process.env.MONGODB_TEST_URI)
  }, 10000)

  afterAll(async () => {
    await disconnect()
  })

  beforeEach(async () => {
    await User.deleteMany({})
    await refreshTokens().deleteMany({})
  })

  describe("POST /auth/register", () => {
    test("Registration successful", async () => {
      const res = await registerUser()

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty("id")
      expect(res.body.name).toBe(validUser.name)
      expect(res.body.email).toBe(validUser.email)
    })

    test("Response does not include the password", async () => {
      const res = await registerUser()

      expect(res.body).not.toHaveProperty("password")
    })

    test("Password is stored hashed, not as plain text", async () => {
      await registerUser()
      const savedUser = await User.findOne({ email: validUser.email })

      expect(savedUser.password).not.toBe(validUser.password)
      expect(savedUser.password).toMatch(/^\$2[aby]\$/)
    })

    test("Email is stored in lowercase", async () => {
      const res = await registerUser({ ...validUser, email: "TEST@Test.com" })

      expect(res.status).toBe(201)
      expect(res.body.email).toBe("test@test.com")
    })

    test("Duplicate email", async () => {
      await registerUser()
      const res = await registerUser({ ...validUser, name: "Another User" })

      expect(res.status).toBe(400)
      expect(res.body.error).toMatch(/email already exists/)
    })

    test("Invalid fields", async () => {
      const res = await registerUser({ name: "", email: "not-an-email", password: "123" })

      expect(res.status).toBe(422)
      expect(res.body.errors).toHaveProperty("name")
      expect(res.body.errors).toHaveProperty("email")
      expect(res.body.errors).toHaveProperty("password")
    })

    test("Missing body", async () => {
      const res = await request(app).post("/auth/register")

      expect(res.status).toBe(422)
    })
  })

  describe("POST /auth/login", () => {
    test("Login successful", async () => {
      await registerUser()
      const res = await loginUser()

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("token")
      expect(res.body).toHaveProperty("refreshToken")
    })

    test("Refresh token is stored hashed in the database", async () => {
      await registerUser()
      const res = await loginUser()
      const stored = await refreshTokens().find({}).toArray()

      expect(stored).toHaveLength(1)
      expect(stored[0].tokenHash).not.toBe(res.body.refreshToken)
    })

    test("Wrong password", async () => {
      await registerUser()
      const res = await loginUser({ ...validUser, password: "wrong-password" })

      expect(res.status).toBe(401)
      expect(res.body.error).toBe("Invalid credentials")
    })

    test("Email not registered returns the same error as a wrong password", async () => {
      const res = await loginUser({ email: "nobody@test.com", password: "123456" })

      expect(res.status).toBe(401)
      expect(res.body.error).toBe("Invalid credentials")
    })

    test("Invalid fields", async () => {
      const res = await request(app).post("/auth/login").send({ email: "not-an-email" })

      expect(res.status).toBe(422)
      expect(res.body.errors).toHaveProperty("email")
      expect(res.body.errors).toHaveProperty("password")
    })
  })

  describe("POST /auth/refresh", () => {
    test("Returns a new pair of tokens", async () => {
      const { refreshToken } = await registerAndLogin()
      const res = await request(app).post("/auth/refresh").send({ refreshToken })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty("token")
      expect(res.body).toHaveProperty("refreshToken")
    })

    test("The used refresh token cannot be reused", async () => {
      const { refreshToken } = await registerAndLogin()
      await wait(1100)
      const first = await request(app).post("/auth/refresh").send({ refreshToken })
      const second = await request(app).post("/auth/refresh").send({ refreshToken })

      expect(first.status).toBe(200)
      expect(first.body.refreshToken).not.toBe(refreshToken)
      expect(second.status).toBe(401)
    })

    test("The new refresh token works", async () => {
      const { refreshToken } = await registerAndLogin()
      await wait(1100)
      const first = await request(app).post("/auth/refresh").send({ refreshToken })
      const second = await request(app)
        .post("/auth/refresh")
        .send({ refreshToken: first.body.refreshToken })

      expect(second.status).toBe(200)
    })

    test("Unknown refresh token", async () => {
      const res = await request(app).post("/auth/refresh").send({ refreshToken: "made-up-token" })

      expect(res.status).toBe(401)
    })

    test("Missing refresh token", async () => {
      const res = await request(app).post("/auth/refresh").send({})

      expect(res.status).toBe(400)
    })

    test("User deleted after login", async () => {
      const { refreshToken } = await registerAndLogin()
      await User.deleteMany({})
      const res = await request(app).post("/auth/refresh").send({ refreshToken })

      expect(res.status).toBe(401)
    })
  })

  describe("DELETE /auth/logout", () => {
    test("Logout successful", async () => {
      const { refreshToken } = await registerAndLogin()
      const res = await request(app).delete("/auth/logout").send({ refreshToken })

      expect(res.status).toBe(204)
    })

    test("Refresh token stops working after logout", async () => {
      const { refreshToken } = await registerAndLogin()
      await request(app).delete("/auth/logout").send({ refreshToken })
      const res = await request(app).post("/auth/refresh").send({ refreshToken })

      expect(res.status).toBe(401)
    })

    test("Logout twice does not fail", async () => {
      const { refreshToken } = await registerAndLogin()
      await request(app).delete("/auth/logout").send({ refreshToken })
      const res = await request(app).delete("/auth/logout").send({ refreshToken })

      expect(res.status).toBe(204)
    })

    test("Missing refresh token", async () => {
      const res = await request(app).delete("/auth/logout").send({})

      expect(res.status).toBe(400)
    })
  })

  describe("GET /auth/me", () => {
    test("Returns the profile of the authenticated user", async () => {
      const { token } = await registerAndLogin()
      const res = await request(app).get("/auth/me").set("Authorization", `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body.name).toBe(validUser.name)
      expect(res.body.email).toBe(validUser.email)
      expect(res.body).not.toHaveProperty("password")
    })

    test("Missing token", async () => {
      const res = await request(app).get("/auth/me")

      expect(res.status).toBe(401)
    })

    test("Authorization header without Bearer", async () => {
      const { token } = await registerAndLogin()
      const res = await request(app).get("/auth/me").set("Authorization", token)

      expect(res.status).toBe(401)
    })

    test("Malformed token", async () => {
      const res = await request(app).get("/auth/me").set("Authorization", "Bearer not-a-token")

      expect(res.status).toBe(401)
      expect(res.body.error).toBe("Invalid token")
    })

    test("Expired token", async () => {
      await registerUser()
      const user = await User.findOne({ email: validUser.email })
      const expiredToken = jwt.sign({ id: user._id }, config.jwtAccessSecret, { expiresIn: -10 })
      const res = await request(app).get("/auth/me").set("Authorization", `Bearer ${expiredToken}`)

      expect(res.status).toBe(401)
      expect(res.body.error).toBe("Expired token")
    })

    test("Refresh token cannot be used as an access token", async () => {
      const { refreshToken } = await registerAndLogin()
      const res = await request(app).get("/auth/me").set("Authorization", `Bearer ${refreshToken}`)

      expect(res.status).toBe(401)
    })

    test("User deleted after login", async () => {
      const { token } = await registerAndLogin()
      await User.deleteMany({})
      const res = await request(app).get("/auth/me").set("Authorization", `Bearer ${token}`)

      expect(res.status).toBe(401)
    })
  })
})
