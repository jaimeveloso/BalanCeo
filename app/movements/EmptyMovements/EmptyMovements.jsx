"use client"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"

function EmptyMovements() {
  const { setOpenCreate } = useContext(FinanceContext)
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
        Todavía no hay movimientos
      </p>
      <p className="text-sm text-slate-400 dark:text-slate-500">
        Añade tu primer ingreso o gasto para empezar.
      </p>
      <button
        type="button"
        onClick={() => setOpenCreate(true)}
        className="mt-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 hover:cursor-pointer transition-colors"
      >
        Crear movimiento
      </button>
    </div>
  )
}
export default EmptyMovements
