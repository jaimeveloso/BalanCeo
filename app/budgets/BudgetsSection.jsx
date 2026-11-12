"use client"
import { useContext, useState } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import { categoryLabel } from "@/app/config/categories"
import { formatMoney } from "@/app/utils/formatMoney"

const VISIBLE_BUDGETS = 2

function barTone(ratio) {
  if (ratio > 1) return "bg-rose-500 dark:bg-rose-400"
  if (ratio >= 0.8) return "bg-amber-500 dark:bg-amber-400"
  return "bg-emerald-500 dark:bg-emerald-400"
}

function BudgetsSection() {
  const { formData, budgets, removeBudget, setOpenBudget } = useContext(FinanceContext)
  const entries = Object.entries(budgets)
  const [showAll, setShowAll] = useState(false)
  const hasMore = entries.length > VISIBLE_BUDGETS
  const visibleEntries = showAll ? entries : entries.slice(0, VISIBLE_BUDGETS)

  const spentIn = (category) =>
    formData.reduce(
      (acc, m) => (m.category === category && Number(m.money) < 0 ? acc - Number(m.money) : acc),
      0,
    )

  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
        Presupuestos
      </h2>
      <div className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col gap-4 p-6 dark:bg-slate-800 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setOpenBudget(true)}
          className="w-full rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 active:scale-95 transition hover:cursor-pointer dark:bg-blue-800 dark:hover:bg-blue-700"
        >
          Añadir presupuesto
        </button>

        {entries.length === 0 ? (
          <p className="text-center text-sm text-slate-400 dark:text-slate-500">
            Aún no has fijado ningún presupuesto
          </p>
        ) : (
          visibleEntries.map(([category, limit]) => {
            const spent = spentIn(category)
            const ratio = spent / limit
            const percent = Math.round(ratio * 100)
            return (
              <div key={category} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-slate-800 dark:text-slate-100">
                    {categoryLabel(category)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeBudget(category)}
                    aria-label={`Quitar presupuesto de ${categoryLabel(category)}`}
                    className="text-slate-400 hover:text-rose-600 text-lg leading-none hover:cursor-pointer transition-colors dark:text-slate-500 dark:hover:text-rose-300"
                  >
                    ×
                  </button>
                </div>
                <div
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.min(percent, 100)}
                  className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700"
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barTone(ratio)}`}
                    style={{ width: `${Math.min(ratio, 1) * 100}%` }}
                  />
                </div>
                <p
                  className={`text-xs tabular-nums ${ratio > 1 ? "text-rose-600 dark:text-rose-300" : "text-slate-500 dark:text-slate-400"}`}
                >
                  {formatMoney(spent)} de {formatMoney(limit)} · {percent}%
                </p>
              </div>
            )
          })
        )}

        {hasMore && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="self-center text-sm font-semibold text-blue-700 hover:text-blue-900 hover:cursor-pointer transition-colors dark:text-blue-300 dark:hover:text-blue-200"
          >
            {showAll
              ? "Ver menos"
              : `Ver más (${entries.length - VISIBLE_BUDGETS})`}
          </button>
        )}
      </div>
    </div>
  )
}
export default BudgetsSection
