"use client"
import { useContext, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"
import { FinanceContext } from "@/context/FinanceContext"

const PUBLIC_PATHS = ["/login", "/register"]
const LOGIN_PATH = "/login"
const HOME_PATH = "/"

function AuthGuard({ children }) {
  const { user, isLoading } = useContext(AuthContext)
  const { setOpenCreate, setOpenBudget } = useContext(FinanceContext)
  const pathname = usePathname()
  const router = useRouter()

  const isPublicPath = PUBLIC_PATHS.includes(pathname)
  let redirectPath = null
  if (!user && !isPublicPath) redirectPath = LOGIN_PATH
  if (user && isPublicPath) redirectPath = HOME_PATH

  useEffect(() => {
    if (isLoading || !redirectPath) return
    if (redirectPath === LOGIN_PATH) {
      setOpenCreate(false)
      setOpenBudget(false)
    }
    router.replace(redirectPath)
  }, [isLoading, redirectPath, router, setOpenCreate, setOpenBudget])

  if (isLoading || redirectPath) return null
  return children
}
export default AuthGuard
