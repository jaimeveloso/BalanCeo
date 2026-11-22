"use client"
import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import {
  apiRequest,
  clearTokens,
  getTokens,
  saveTokens,
  SESSION_EXPIRED_EVENT,
} from "@/app/utils/apiClient"

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadSession() {
      if (!getTokens().token) {
        setIsLoading(false)
        return
      }
      try {
        setUser(await apiRequest("/auth/me"))
      } catch {
        clearTokens()
      } finally {
        setIsLoading(false)
      }
    }
    loadSession()
  }, [])

  useEffect(() => {
    const clearUser = () => setUser(null)
    window.addEventListener(SESSION_EXPIRED_EVENT, clearUser)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, clearUser)
  }, [])

  async function login(email, password) {
    const tokens = await apiRequest("/auth/login", {
      method: "POST",
      body: { email, password },
      requiresAuth: false,
    })
    saveTokens(tokens)
    setUser(await apiRequest("/auth/me"))
  }

  async function register(name, email, password) {
    await apiRequest("/auth/register", {
      method: "POST",
      body: { name, email, password },
      requiresAuth: false,
    })
    await login(email, password)
  }

  async function logout() {
    try {
      await apiRequest("/auth/logout", {
        method: "DELETE",
        body: { refreshToken: getTokens().refreshToken },
        requiresAuth: false,
      })
    } catch (error) {
      console.error("Logout request failed:", error.message)
    } finally {
      clearTokens()
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
