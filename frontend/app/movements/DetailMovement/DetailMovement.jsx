"use client"
import Button from "@/components/ui/Button/Button"
import CloseIcon from "@/components/ui/icons/CloseIcon"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import { formatMoney } from "@/app/utils/formatMoney"
import { categoryLabel } from "@/app/config/categories"
import { useContext } from "react"

const LABEL =
  "text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
const FIELD =
  "rounded-lg bg-white border border-slate-200 py-2 px-3 dark:bg-slate-800 dark:border-slate-600"

function DetailMovement() {
  const { detailMovement, setDetailMovement } = useContext(FinanceContext)
  if (!detailMovement) return null
  return (
    <div className="flex flex-col justify-center text-center gap-2 w-full p-4 rounded-xl bg-slate-50 border border-slate-200 relative text-slate-800 dark:bg-slate-700/40 dark:border-slate-600 dark:text-slate-100">
      {detailMovement.title && (
        <h1 className="font-semibold text-center text-xl">
          {detailMovement.title}
        </h1>
      )}
      {!detailMovement.title && (
        <h1 className="text-center text-xl italic">Sin título</h1>
      )}
      <Link href="/movements">
        <Button
          onClick={() => setDetailMovement(null)}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:cursor-pointer transition-colors"
        >
          <CloseIcon />
        </Button>
      </Link>
      <div className={FIELD}>
        <p className={LABEL}>Categoría</p>
        <p>{categoryLabel(detailMovement.category)}</p>
      </div>
      <div className={FIELD}>
        <p className={LABEL}>Descripción del movimiento</p>
        <p>{detailMovement.description}</p>
      </div>
      <div className={FIELD}>
        <p className={LABEL}>Fecha del gasto</p>
        <p>
          {new Date(detailMovement.date).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
      <div className={FIELD}>
        <p className={LABEL}>Cantidad</p>
        <p className="font-semibold tabular-nums">
          {formatMoney(detailMovement.money)}
        </p>
      </div>
    </div>
  )
}
export default DetailMovement
