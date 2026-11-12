"use client"
import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import PieChart from "@/components/Charts/Pie/PieChart"
import BarChart from "@/components/Charts/Bar/BarChart"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import Header from "@/app/Header/Header"
import Image from "next/image"
import Banners from "@/components/ui/Banners/Banners"
function BalanceBoard() {
  const { formData } = useContext(FinanceContext)
  const onlyNegativeCategories = formData.filter((num) => num.money < 0)
  const negativeCategoriesMoney = {
    social: 0,
    transport: 0,
    house: 0,
    health: 0,
    food: 0,
  }
  const sumCategoriesMoney = onlyNegativeCategories.reduce((acc, total) => {
    if (total.category in acc) {
      acc[total.category] += Number(total.money) || 0
    }
    return acc
  }, negativeCategoriesMoney)

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-slate-100 dark:bg-slate-900">
      <Header />
      <Banners />
      <Image
        src="/rounded-balanceo.png"
        alt="logo"
        fill
        className="absolute inset-0 w-full h-full object-contain opacity-[0.03] pointer-events-none z-0"
      />
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-6 px-6 pt-6 pb-10 text-slate-900 dark:text-slate-100">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Button className="text-slate-400 hover:text-blue-700 hover:cursor-pointer transition-colors dark:text-slate-500 dark:hover:text-white">
              <BackIcon />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Balance</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 dark:bg-slate-800 dark:border-slate-700">
            <BarChart formData={formData} />
          </div>
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 dark:bg-slate-800 dark:border-slate-700">
            <PieChart sumCategoriesMoney={sumCategoriesMoney} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default BalanceBoard
