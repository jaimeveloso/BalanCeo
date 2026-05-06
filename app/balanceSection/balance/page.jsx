"use client"
import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import PieChart from "@/components/Charts/Pie/PieChart"
import BarChart from "@/components/Charts/Bar/BarChart"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import Header from "@/app/Header/Header"
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
    acc[total.category] += total.money
    return acc
  }, negativeCategoriesMoney)

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#B4CADC]">
      <Header />
      <img
        src="/rounded-balanceo.png"
        alt="logo"
        className="absolute inset-0 w-full h-full object-contain opacity-1 pointer-events-none z-0"
      />
      <div className="w-full flex flex-col gap-20 items-center py-6 justify-center">
        <div className="flex justify-center w-full px-20">
          <Link href="/" className="flex items-center">
            <Button>
              <BackIcon />
            </Button>
          </Link>
          <h1 className="px-20 font-serif text-4xl font-bold">Balance</h1>
        </div>
        <div className="grid grid-cols-2 w-full gap-20">
          <BarChart formData={formData} />
          <PieChart sumCategoriesMoney={sumCategoriesMoney} />
        </div>
      </div>
    </div>
  )
}
export default BalanceBoard
