const express = require("express")
const router = express.Router()
const { register, login, refresh, logout, myProfile } = require("../controllers/auth")
const { validateBody, registerSchema, loginSchema } = require("../middlewares/validate")
const { requireAuth } = require("../middlewares/auth")

router.get("/me", requireAuth, myProfile)
router.post("/register", validateBody(registerSchema), register)
router.post("/login", validateBody(loginSchema), login)
router.post("/refresh", refresh)
router.delete("/logout", logout)

module.exports = router
