"use client"
import BarChart from "@/components/Charts/Bar/BarChart"
import Button from "@/components/ui/Button/Button"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import { useContext } from "react"

function BalanceSection() {
  const { formData } = useContext(FinanceContext)
  const totalMoney = formData.reduce(
    (acc, total) => acc + Number(total.money || 0),
    0,
  )
  return (
    <div className="flex flex-col justify-around h-full items-center py-4 px-10">
      <div className="rounded-lg flex flex-col justify-center items-center">
        <Link href="/balanceSection/balance">
          <Button className="text-4xl px-5 py-3 font-serif my-1 text-gray-800 active:scale-105 transition-transform hover:cursor-pointer dark:text-white">
            Balance 🏦
          </Button>
        </Link>
      </div>
      <div className=" bg-gray-200 shadow-xs  shadow-gray-400 h-full w-full flex flex-col gap-5 justify-center rounded-lg px-3 dark:bg-gray-600/90 dark:shadow-black/70 dark:text-white">
        <h1 className="text-4xl py-3 text-center font-mono">{totalMoney}€</h1>
        <BarChart />
      </div>
    </div>
  )
}
export default BalanceSection
