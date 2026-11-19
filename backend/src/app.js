const express = require("express")
const app = express()
const { errorHandler } = require("./middlewares/errorHandler")
const authRouter = require("./routes/auth")
app.use(express.json())

app.use("/auth", authRouter)

app.use(errorHandler)

module.exports = app
