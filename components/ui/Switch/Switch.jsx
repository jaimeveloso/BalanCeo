import { FinanceContext } from "@/context/FinanceContext"
import { useContext } from "react"

function SunIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
    </svg>
  )
}

function MoonIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" />
    </svg>
  )
}

function Switch() {
  const { isDark, setIsDark } = useContext(FinanceContext)
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Cambiar entre modo claro y oscuro"
      onClick={() => {
        document.documentElement.classList.toggle("dark")
        setIsDark(!isDark)
      }}
      className={`relative w-16 h-8 rounded-full border shadow-inner transition-colors duration-500 hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${
        isDark
          ? "bg-gradient-to-r from-slate-700 to-indigo-900 border-slate-600"
          : "bg-gradient-to-r from-sky-300 to-blue-400 border-white/40"
      }`}
    >
      <SunIcon
        className={`absolute left-1.5 top-1/2 -translate-y-1/2 size-4 transition-opacity duration-300 ${
          isDark ? "text-slate-400 opacity-80" : "opacity-0"
        }`}
      />
      <MoonIcon
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 size-4 transition-opacity duration-300 ${
          isDark ? "opacity-0" : "text-white/80"
        }`}
      />
      <span
        className={`absolute top-[3px] left-[3px] size-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-500 ease-out ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <MoonIcon className="size-4 text-indigo-600" />
        ) : (
          <SunIcon className="size-4 text-amber-500" />
        )}
      </span>
    </button>
  )
}
export default Switch
