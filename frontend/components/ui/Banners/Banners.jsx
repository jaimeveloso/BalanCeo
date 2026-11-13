"use client"
import { useContext, useState } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import Spinner from "@/components/ui/Spinner/Spinner"

function Toast({ show, className, children }) {
  const [render, setRender] = useState(show)
  if (show && !render) setRender(true)
  if (!render) return null
  return (
    <div
      onAnimationEnd={() => {
        if (!show) setRender(false)
      }}
      className={`col-start-1 row-start-1 ${className} ${show ? "animate-toast-in" : "animate-toast-out"}`}
    >
      {children}
    </div>
  )
}

function Banners() {
  const { loading, addedMovementBanner, deletedMovementBanner } =
    useContext(FinanceContext)
  return (
    <div className="fixed inset-x-0 top-20 z-30 grid justify-items-center px-4 pointer-events-none">
      <Toast
        show={loading}
        className="rounded-full bg-white border border-slate-200 shadow-lg p-1.5 dark:bg-slate-800 dark:border-slate-600"
      >
        <Spinner />
      </Toast>
      <Toast
        show={addedMovementBanner}
        className="rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-medium shadow-lg text-center px-5 py-2.5 dark:border-emerald-500/30 dark:bg-emerald-950 dark:text-emerald-300"
      >
        Movimiento realizado correctamente
      </Toast>
      <Toast
        show={deletedMovementBanner}
        className="rounded-lg border border-rose-200 bg-rose-50 text-rose-800 text-sm font-medium shadow-lg text-center px-5 py-2.5 dark:border-rose-500/30 dark:bg-rose-950 dark:text-rose-300"
      >
        Movimiento eliminado correctamente
      </Toast>
    </div>
  )
}
export default Banners
