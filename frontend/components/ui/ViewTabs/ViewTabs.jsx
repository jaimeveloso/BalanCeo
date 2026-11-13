"use client"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import { SCREENS } from "@/app/config/screens"
import Button from "@/components/ui/Button/Button"

const BASE =
  "rounded-lg py-1.5 px-4 text-sm font-medium transition-colors hover:cursor-pointer"
const ACTIVE = "bg-blue-700 text-white shadow-sm dark:bg-blue-800 dark:text-slate-100"
const INACTIVE =
  "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-slate-600"

function ViewTabs() {
  const { selectedPage, changeScreenAtMovement } = useContext(FinanceContext)
  return (
    <div className="flex gap-2 justify-center">
      <Button
        onClick={() => changeScreenAtMovement(SCREENS.LIST)}
        className={`${BASE} ${selectedPage === SCREENS.LIST ? ACTIVE : INACTIVE}`}
      >
        Listado
      </Button>
      <Button
        onClick={() => changeScreenAtMovement(SCREENS.CARD)}
        className={`${BASE} ${selectedPage === SCREENS.CARD ? ACTIVE : INACTIVE}`}
      >
        Tarjetas
      </Button>
    </div>
  )
}
export default ViewTabs
