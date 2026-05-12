"use client"
import Button from "@/components/ui/Button/Button"
import CloseIcon from "@/components/ui/icons/CloseIcon"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import { useContext } from "react"

function DetailMovement() {
  const { detailMovement, setDetailMovement } = useContext(FinanceContext)
  if (!detailMovement) return null
  return (
    <div className="flex flex-col justify-center text-center gap-2 w-full py-3 px-3 rounded-lg shadow-md relative">
      {detailMovement.title && (
        <h1 className="font-bold text-center text-xl">
          {detailMovement.title}
        </h1>
      )}
      {!detailMovement.title && (
        <h1 className="text-center text-xl italic">Sin título</h1>
      )}
      <Link href="/movements">
        <Button
          onClick={() => setDetailMovement(null)}
          className="absolute top-2 right-2"
        >
          <CloseIcon />
        </Button>
      </Link>
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
  )
}
export default DetailMovement
