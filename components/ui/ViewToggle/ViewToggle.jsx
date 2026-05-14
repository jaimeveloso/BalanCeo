import { useContext } from "react"
import Button from "../Button/Button"
import { FinanceContext } from "@/context/FinanceContext"
import { SCREENS } from "@/app/constants/screens"

function ViewToggle() {
  const { changeScreenAtMovement, selectedPage } = useContext(FinanceContext)
  return (
    <div className="flex gap-2 justify-center text-white dark:text-black">
      <Button
        onClick={() => changeScreenAtMovement(SCREENS.LIST)}
        className={
          selectedPage === SCREENS.LIST
            ? "rounded-lg py-1 px-2 bg-gray-500 hover:bg-gray-600 hover:cursor-pointer dark:bg-white/90 dark:hover:bg-white"
            : "rounded-lg py-1 px-2 bg-gray-400/50 hover:bg-gray-500/50 hover:cursor-pointer dark:bg-white/50 dark:hover:bg-white"
        }
      >
        Listado
      </Button>
      <Button
        onClick={() => changeScreenAtMovement(SCREENS.CARD)}
        className={
          selectedPage === SCREENS.CARD
            ? "rounded-lg py-1 px-2 bg-gray-500 hover:bg-gray-600 hover:cursor-pointer dark:bg-white/90 dark:hover:bg-white"
            : "rounded-lg py-1 px-2 bg-gray-400/50 hover:bg-gray-500/50 hover:cursor-pointer dark:bg-white/50 dark:hover:bg-white"
        }
      >
        Tarjetas
      </Button>
    </div>
  )
}
export default ViewToggle
