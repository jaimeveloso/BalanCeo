const express = require("express")
const app = express()
const { errorHandler } = require("./middlewares/errorHandler")
const authRouter = require("./routes/auth")
const cors = require("cors")
app.use(express.json())

app.use(cors({ origin: ["http://localhost:3000", "https://balanceo-delta.vercel.app"] }))
app.use("/auth", authRouter)

app.use(errorHandler)

module.exports = app
