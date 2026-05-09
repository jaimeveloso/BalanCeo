import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import CloseIcon from "@/components/ui/icons/CloseIcon"
import { SCREENS } from "@/app/screens/screens"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import DeleteIcon from "@/components/ui/icons/DeleteIcon"
import DetailIcon from "@/components/ui/icons/DetailIcon"
import CloseDetailIcon from "@/components/ui/icons/CloseDetailIcon"
import Image from "next/image"

function List() {
  const {
    formData,
    detailMovement,
    setDetailMovement,
    selectDetailMovement,
    changeScreenAtMovement,
    deleteMovement,
  } = useContext(FinanceContext)
  return (
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
            className={`flex justify-between items-center px-2 py-2 rounded-lg shadow-sm ${Number(data.money) < 0 ? "bg-red-100" : "bg-green-100"}`}
          >
            <div>
              <p className="font-bold">{data.title}</p>
              <p className="font-thin">{data.category}</p>
            </div>
            <div className="flex gap-5">
              <p className="">{data.money}€</p>
              <Button
                onClick={() => {
                  if (detailMovement?.id === data.id) {
                    setDetailMovement(null)
                  } else {
                    selectDetailMovement(data)
                  }
                }}
              >
                {detailMovement?.id === data.id ? (
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
        {/* -----------------DETALLE MOVIMIENTO--------------------- */}
        {detailMovement && (
          <div className="flex flex-col justify-center text-center gap-2 w-full py-3 px-3 rounded-lg shadow-md relative">
            {detailMovement.title && (
              <h1 className="font-bold text-center text-xl">
                {detailMovement.title}
              </h1>
            )}
            {!detailMovement.title && (
              <h1 className="text-center text-xl italic">Sin título</h1>
            )}
            <Button
              onClick={() => setDetailMovement(null)}
              className="absolute top-2 right-2"
            >
              <CloseIcon />
            </Button>
            <div className="rounded-md shadow-sm py-2">
              <p className="font-bold font-mono">Categoría</p>
              <p>{detailMovement.category}</p>
            </div>
            <div className="rounded-md shadow-sm py-2">
              <p className="font-bold font-mono">Descripción del movimiento</p>
              <p>{detailMovement.description}</p>
            </div>
            <div className="rounded-md shadow-sm py-2">
              <p className="font-bold font-mono">Fecha del gasto</p>
              <p>
                {new Date(detailMovement.date).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="rounded-md shadow-sm py-2">
              <p className="font-bold font-mono">Cantidad</p>
              <p>{detailMovement.money}€</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default List
