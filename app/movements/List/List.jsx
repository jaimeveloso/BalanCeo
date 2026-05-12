import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import { SCREENS } from "@/app/constants/screens"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import DeleteIcon from "@/components/ui/icons/DeleteIcon"
import DetailIcon from "@/components/ui/icons/DetailIcon"
import CloseDetailIcon from "@/components/ui/icons/CloseDetailIcon"
import Image from "next/image"
import DetailMovement from "../DetailMovement/DetailMovement"
import Spinner from "@/components/ui/Spinner/Spinner"

function List() {
  const {
    formData,
    detailMovement,
    changeScreenAtMovement,
    deleteMovement,
    deletedMovementBanner,
    isDetailSelected,
    handleDetailSelection,
    loading,
  } = useContext(FinanceContext)

  return (
    <>
      <div className="flex justify-center items-center px-2 py-2">
        {loading && <Spinner />}
        {deletedMovementBanner && (
          <p className="rounded-lg bg-red-300/50 w-full text-center px-2 py-2">
            Movimiento eliminado correctamente
          </p>
        )}
      </div>
      <div className="flex items-center flex-col w-full py-10">
        <Image
          src="/rounded-balanceo.png"
          alt="logo"
          fill
          className="absolute inset-0 w-full h-full object-contain opacity-1 pointer-events-none z-0"
        />

        <div className="flex flex-col w-full max-w-lg gap-6 rounded-xl bg-gray-50 shadow-lg p-6">
          <Link href="/">
            <Button className="absloute top-4 hover:text-blue-950">
              <BackIcon />
            </Button>
          </Link>
          <div className="flex gap-2 justify-center text-white">
            <Button
              onClick={() => changeScreenAtMovement(SCREENS.LIST)}
              className="rounded-lg py-1 px-2 bg-gray-500 hover:bg-gray-600 hover:cursor-pointer"
            >
              Listado
            </Button>
            <Button
              onClick={() => changeScreenAtMovement(SCREENS.CARD)}
              className="rounded-lg py-1 px-2 bg-gray-500 hover:bg-gray-600 hover:cursor-pointer"
            >
              Tarjetas
            </Button>
          </div>
          <h1 className="text-center font-bold text-2xl">Movimientos</h1>
          {formData.map((data, index) => (
            <div
              key={index}
              className={`flex justify-between items-center px-2 py-2 rounded-lg shadow-sm ${Number(data.money) < 0 ? "bg-red-200/50" : "bg-green-200/50"}`}
            >
              <div>
                <p className="font-bold">{data.title}</p>
                <p className="font-thin">{data.category}</p>
              </div>
              <div className="flex gap-5">
                <p className="">{data.money}€</p>
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
          ))}
          {detailMovement && <DetailMovement />}
        </div>
      </div>
    </>
  )
}
export default List
