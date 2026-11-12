"use client"
import BarChart from "@/components/Charts/Bar/BarChart"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import { useContext } from "react"
import { formatMoney } from "@/app/utils/formatMoney"

function BalanceSection() {
  const { formData } = useContext(FinanceContext)
  const totalMoney = formData.reduce(
    (acc, total) => acc + Number(total.money || 0),
    0,
  )
  const totalIncome = formData.reduce(
    (acc, m) => (Number(m.money) > 0 ? acc + Number(m.money) : acc),
    0,
  )
  const totalExpense = formData.reduce(
    (acc, m) => (Number(m.money) < 0 ? acc + Number(m.money) : acc),
    0,
  )
  return (
    <Link
      href="/balance"
      className="group flex flex-col h-full gap-4 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
    >
      <h2 className="self-start text-2xl font-semibold tracking-tight text-slate-800 group-hover:text-blue-700 transition-colors dark:text-slate-100 dark:group-hover:text-blue-300">
        Balance
      </h2>
      <div className="bg-white border border-slate-200 shadow-sm h-full w-full flex flex-col gap-4 rounded-2xl p-6 transition-all group-hover:shadow-md group-hover:border-blue-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:group-hover:border-blue-400/50">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Saldo total
          </p>
          <h1
            className={`text-4xl font-semibold tabular-nums mt-1 ${totalMoney < 0 ? "text-rose-600 dark:text-rose-300" : "text-slate-900 dark:text-slate-100"}`}
          >
            {formatMoney(totalMoney)}
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-500/30 dark:bg-emerald-500/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Ingresos
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-emerald-800 dark:text-emerald-200">
              {formatMoney(totalIncome)}
            </p>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-500/30 dark:bg-rose-500/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-300">
              Gastos
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-rose-800 dark:text-rose-200">
              {formatMoney(totalExpense)}
            </p>
          </div>
        </div>
        <BarChart />
      </div>
    </Link>
  )
}
export default BalanceSection
