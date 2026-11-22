const API_URL = process.env.NEXT_PUBLIC_API_BALANCEO_URL
const TOKEN_KEY = "token"
const REFRESH_TOKEN_KEY = "refreshToken"
export const SESSION_EXPIRED_EVENT = "session-expired"

let refreshPromise = null

export function getTokens() {
  if (typeof window === "undefined") return { token: null, refreshToken: null }
  return {
    token: localStorage.getItem(TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  }
}

export function saveTokens({ token, refreshToken }) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

async function sendRequest(path, { method = "GET", body, token } = {}) {
  const headers = {}
  if (body) headers["Content-Type"] = "application/json"
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = response.status === 204 ? null : await response.json().catch(() => null)

  if (!response.ok) {
    const fieldErrors = data?.errors
    const error = new Error(data?.error || Object.values(fieldErrors || {})[0] || "Request failed")
    error.status = response.status
    error.fieldErrors = fieldErrors
    throw error
  }
  return data
}

function refreshTokens() {
  if (!refreshPromise) {
    const { refreshToken } = getTokens()
    refreshPromise = sendRequest("/auth/refresh", { method: "POST", body: { refreshToken } })
      .then((tokens) => {
        saveTokens(tokens)
        return tokens.token
      })
      .catch((error) => {
        clearTokens()
        window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT))
        throw error
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

export async function apiRequest(path, { method, body, requiresAuth = true } = {}) {
  if (!requiresAuth) return sendRequest(path, { method, body })

  try {
    return await sendRequest(path, { method, body, token: getTokens().token })
  } catch (error) {
    if (error.status !== 401) throw error
    const newToken = await refreshTokens()
    return sendRequest(path, { method, body, token: newToken })
  }
}
