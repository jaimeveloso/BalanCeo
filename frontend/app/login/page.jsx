"use client"
import { useContext, useState } from "react"
import Link from "next/link"
import Button from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import { AuthContext } from "@/context/AuthContext"
import { getAuthErrorMessage } from "@/app/utils/getAuthErrorMessage"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useContext(AuthContext)

  async function handleSubmit(event) {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setFieldErrors({})
    setErrorMessage("")
    try {
      await login(email, password)
    } catch (error) {
      setFieldErrors(error.fieldErrors || {})
      setErrorMessage(getAuthErrorMessage(error))
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-slate-100 min-h-screen flex justify-center items-center px-4 dark:bg-slate-900">
      <div className="flex flex-col w-full gap-4 max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl p-6 dark:bg-slate-800 dark:border-slate-700">
        <h1 className="text-center text-slate-900 font-semibold tracking-tight text-2xl dark:text-slate-100">
          Iniciar sesión
        </h1>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-3 dark:text-slate-100"
        >
          <div className="flex flex-col items-center mb-2">
            <Input
              text="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              hasError={Boolean(fieldErrors.email)}
              placeholder="tu@email.com"
            />
          </div>
          <div className="flex flex-col items-center mb-2">
            <Input
              text="Contraseña"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              hasError={Boolean(fieldErrors.password)}
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-center text-rose-600 dark:text-rose-400">
              {errorMessage}
            </p>
          )}
          <Button className="w-full text-center rounded-lg bg-blue-700 text-white font-semibold shadow-sm hover:bg-blue-800 active:scale-95 transition p-3 hover:cursor-pointer dark:bg-blue-800 dark:hover:bg-blue-700">
            {isSubmitting ? "Enviando..." : "Entrar"}
          </Button>
        </form>
        <p className="text-center text-sm text-slate-600 dark:text-slate-300">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-700 hover:underline dark:text-blue-400"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
