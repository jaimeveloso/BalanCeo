import { FinanceContext } from "@/context/FinanceContext"
import Button from "../Button/Button"
import { useContext, useState } from "react"

function Switch() {
  const { isDark, setIsDark } = useContext(FinanceContext)
  return (
    <Button
      onClick={() => {
        document.documentElement.classList.toggle("dark")
        setIsDark(!isDark)
      }}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 hover:cursor-pointer ${
        isDark ? "bg-zinc-600" : "bg-blue-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 flex items-center justify-center text-[11px] ${
          isDark ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </Button>
  )
}
export default Switch
