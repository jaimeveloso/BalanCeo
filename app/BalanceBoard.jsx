"use client"
import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import PieChart from "@/components/Charts/Pie/PieChart"
import BarChart from "@/components/Charts/Bar/BarChart"
function BalanceBoard({ formData, setBalanceView }) {
  const onlyNegativeCategories = formData.filter((num) => num.money < 0)
  const negativeCategoriesMoney = {
    social: 0,
    transport: 0,
    house: 0,
    health: 0,
    food: 0,
  }
  const sumCategoriesMoney = onlyNegativeCategories.reduce((acc, total) => {
    if (total.category === "Ocio") {
      acc.social += total.money
    }
    if (total.category === "Transporte") {
      acc.transport += total.money
    }
    if (total.category === "Alimentación") {
      acc.food += total.money
    }
    if (total.category === "Vivienda") {
      acc.house += total.money
    }
    if (total.category === "Salud") {
      acc.health += total.money
    }
    return acc
  }, negativeCategoriesMoney)

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#B4CADC]">
      <img
        src="/Balanceo-redondo.png"
        alt="logo"
        className="absolute inset-0 w-full h-full object-contain opacity-1 pointer-events-none z-0"
      />
      <div className="h-full w-full flex flex-col gap-20 items-center py-6">
        <div className="flex items-center gap-2 w-full px-10">
          <Button onClick={() => setBalanceView(false)}>
            <BackIcon />
          </Button>
          <h1 className="flex-1 text-center">Balance</h1>
        </div>
        <div className="grid grid-cols-2 w-full">
          <BarChart formData={formData} />
          <PieChart sumCategoriesMoney={sumCategoriesMoney} />
        </div>
      </div>
    </div>
  )
}
export default BalanceBoard
