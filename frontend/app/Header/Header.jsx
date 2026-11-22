import Link from "next/link"
import Button from "../../components/ui/Button/Button"
import Image from "next/image"
import { useContext, useState } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import { AuthContext } from "@/context/AuthContext"
import Switch from "@/components/ui/Switch/Switch"

function Header() {
  const { setOpenCreate } = useContext(FinanceContext)
  const { user, logout } = useContext(AuthContext)

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 shadow-lg shadow-blue-950/20 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 dark:border-b dark:border-slate-700 dark:shadow-black/30">
      <div className="max-w-6xl mx-auto flex justify-between md:grid md:grid-cols-[1fr_auto_1fr] gap-2 md:gap-4 px-4 md:px-6 py-4 items-center text-white">
        <div className="flex items-center shrink-0">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/rounded-balanceo.png"
              alt="mini-logo"
              width={50}
              height={50}
              className="w-11 h-11 rounded-full ring-2 ring-white/25 shadow-lg shadow-black/30 transition-transform duration-200 group-hover:scale-105 hover:cursor-pointer"
            />

            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-brand text-2xl font-bold tracking-tight hover:cursor-pointer">
                Balan<span className="text-sky-300">Ceo</span>
              </span>
              <span className="hidden sm:block mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-200/70 dark:text-slate-400">
                El CEO de tu economía
              </span>
            </div>
          </Link>
        </div>
        <Button
          onClick={() => setOpenCreate(true)}
          className="hover:cursor-pointer rounded-lg py-2 px-3 md:px-4 text-sm font-semibold bg-white text-blue-900 shadow-sm hover:bg-blue-50 active:scale-95 transition dark:bg-blue-800 dark:text-slate-100 dark:hover:bg-blue-700"
        >
          Crear Movimiento
        </Button>
        <div className="flex items-center gap-2 md:gap-6 justify-self-end">
          <Switch />
          <span className="hidden md:block text-sm font-medium text-blue-100">
            Hola {user?.name}
          </span>
          <Button
            onClick={logout}
            className="hover:cursor-pointer rounded-lg py-2 px-3 md:px-4 text-sm font-semibold border border-white/30 text-white hover:bg-white/10 active:scale-95 transition"
          >
            Salir
          </Button>
        </div>
      </div>
    </header>
  )
}
export default Header
