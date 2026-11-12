import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import { useContext } from "react"
import { formatMoney } from "@/app/utils/formatMoney"
import { movementTone } from "@/app/utils/movementStyles"

function MovementsSection() {
  const { formData } = useContext(FinanceContext)
  return (
    <Link
      href="/movements"
      className="group flex flex-col self-start w-full gap-4 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
    >
      <h2 className="self-start text-2xl font-semibold tracking-tight text-slate-800 group-hover:text-blue-700 transition-colors dark:text-slate-100 dark:group-hover:text-blue-300">
        Movimientos
      </h2>

      <div className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col gap-3 p-6 transition-all group-hover:shadow-md group-hover:border-blue-300 dark:bg-slate-800 dark:border-slate-700 dark:group-hover:border-blue-400/50">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Últimos movimientos
        </p>
        {formData.length === 0 ? (
          <p className="py-6 text-slate-400 text-center text-lg dark:text-slate-500">
            No hay movimientos
          </p>
        ) : (
          <>
            {formData.slice(-3).map((data) => (
              <div
                key={data.id}
                className={`flex justify-between items-center px-4 py-4 rounded-xl border ${movementTone(data.money)}`}
              >
                <p className="font-medium">{data.title}</p>
                <p className="font-semibold tabular-nums">
                  {formatMoney(data.money)}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </Link>
  )
}
export default MovementsSection
