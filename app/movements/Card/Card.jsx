import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import { SCREENS } from "@/app/constants/screens"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import DetailIcon from "@/components/ui/icons/DetailIcon"
import DeleteIcon from "@/components/ui/icons/DeleteIcon"
import CloseDetailIcon from "@/components/ui/icons/CloseDetailIcon"
import Image from "next/image"
import DetailMovement from "../DetailMovement/DetailMovement"
import Spinner from "@/components/ui/Spinner/Spinner"
import CreateMovement from "../CreateMovement/CreateMovement"

function Card() {
  const {
    formData,
    detailMovement,
    changeScreenAtMovement,
    isDetailSelected,
    handleDetailSelection,
    deletedMovementBanner,
    loading,
    deleteMovement,
    openCreate,
    addedMovementBanner,
  } = useContext(FinanceContext)

  return (
    <>
      {openCreate && <CreateMovement />}
      <div className="flex justify-center items-center px-2 py-2">
        {loading && <Spinner />}
        {addedMovementBanner && (
          <p className="rounded-lg bg-green-300/50 w-full text-center px-2 py-2">
            Movimiento realizado correctamente
          </p>
        )}
        {deletedMovementBanner && (
          <p className="rounded-lg bg-red-300/50 w-full text-center px-2 py-2">
            Movimiento eliminado correctamente
          </p>
        )}
      </div>
      <div className="flex items-center flex-col py-10">
        <Image
          src="/rounded-balanceo.png"
          alt="logo"
          fill
          className="absolute inset-0 w-full h-full object-contain opacity-1 pointer-events-none z-0"
        />
        <div className="flex flex-col w-full max-w-lg gap-6 rounded-lg  bg-gray-50 shadow-lg p-6 dark:bg-gray-600 dark:tracking-wide">
          <Link href="/">
            <Button className="absloute top-4 dark:text-white dark:hover:text-zinc-200">
              <BackIcon />
            </Button>
          </Link>
          <div className="flex gap-2 justify-center text-white dark:text-black">
            <Button
              onClick={() => changeScreenAtMovement(SCREENS.LIST)}
              className="rounded-lg py-1 px-2 bg-gray-500 hover:bg-gray-600 hover:cursor-pointer dark:bg-white/80 dark:hover:bg-white"
            >
              Listado
            </Button>
            <Button
              onClick={() => changeScreenAtMovement(SCREENS.CARD)}
              className="rounded-lg py-1 px-2 bg-gray-500 hover:bg-gray-600 hover:cursor-pointer dark:bg-white/80 dark:hover:bg-white"
            >
              Tarjetas
            </Button>
          </div>
          <h1 className="text-center font-bold text-2xl dark:text-white">
            Movimientos
          </h1>
          <div className="grid w-full grid-cols-3 gap-3">
            {formData.map((data, index) => (
              <div
                key={index}
                className={`flex max-w-sm flex-col items-center px-2 py-2 rounded-lg shadow-sm hover:cursor-pointer ${Number(data.money) < 0 ? "bg-red-200/50 dark:bg-red-800/50 dark:text-white" : "bg-green-200/50 dark:bg-green-800/50 dark:text-white"}`}
              >
                <div className="flex flex-col items-center gap-2 py-2">
                  <p className="font-bold">{data.title}</p>
                  <p className="font-thin">{data.category}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <p className="">{data.money}€</p>
                  <div className="flex gap-3 items-center">
                    <Button
                      onClick={() => {
                        handleDetailSelection(data)
                      }}
                    >
                      {isDetailSelected(data.id) ? (
                        <CloseDetailIcon />
                      ) : (
                        <DetailIcon />
                      )}
                    </Button>
                    <Button onClick={() => deleteMovement(data.id)}>
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {detailMovement && <DetailMovement />}
        </div>
      </div>
    </>
  )
}
export default Card
