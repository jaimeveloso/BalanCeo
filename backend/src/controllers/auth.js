const bcrypt = require("bcryptjs")
const SALT_ROUNDS = 10
const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const config = require("../config/index")
const crypto = require("crypto")
const { saveRefreshToken, findRefreshToken, deleteRefreshToken } = require("../db/tokens")
const asyncHandler = require("../utils/asyncHandler")

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  })
  const userData = { id: user._id, name: user.name, email: user.email }
  return res.status(201).json(userData)
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" })
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" })
  }
  const token = jwt.sign({ id: user._id }, config.jwtAccessSecret, {
    expiresIn: config.jwtAccessExpires,
    jwtid: crypto.randomUUID(),
  })
  const refreshToken = jwt.sign({ id: user._id }, config.jwtRefreshSecret, {
    expiresIn: config.refreshTokenExpires,
    jwtid: crypto.randomUUID(),
  })
  const refreshTokenExpiresAt = new Date(Date.now() + SEVEN_DAYS_IN_MS)
  await saveRefreshToken(user._id, refreshToken, refreshTokenExpiresAt)

  return res.status(200).json({ token, refreshToken })
})

const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token not found" })
  }
  const tokenDoc = await findRefreshToken(refreshToken)
  if (!tokenDoc) {
    return res.status(401).json({ error: "Refresh token does not exist or expired" })
  }
  await deleteRefreshToken(refreshToken)
  const user = await User.findById(tokenDoc.userId)
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" })
  }
  const newToken = jwt.sign({ id: user._id }, config.jwtAccessSecret, {
    expiresIn: config.jwtAccessExpires,
    jwtid: crypto.randomUUID(),
  })
  const newRefreshToken = jwt.sign({ id: user._id }, config.jwtRefreshSecret, {
    expiresIn: config.refreshTokenExpires,
    jwtid: crypto.randomUUID(),
  })
  const refreshTokenExpiresAt = new Date(Date.now() + SEVEN_DAYS_IN_MS)
  await saveRefreshToken(user._id, newRefreshToken, refreshTokenExpiresAt)
  return res.status(200).json({ token: newToken, refreshToken: newRefreshToken })
})

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token does not exist" })
  }
  await deleteRefreshToken(refreshToken)
  res.status(204).send()
})

const myProfile = asyncHandler(async (req, res) => {
  const id = req.user.id
  const user = await User.findById(id)
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" })
  }
  const userData = { id: user._id, name: user.name, email: user.email }
  res.status(200).json(userData)
})

module.exports = { register, login, refresh, logout, myProfile }
