"use client"
//DETALLES
//(check) -> cursor pointer en elementos clickables
//(check) -> Button de color del menu de arriba
//(check) -> quitar el icono de abajo de next
//(check) -> Boton de borrar movimiento -> falta en cards
//(check) -> boton para ver movimiento -> falta en cards
//(check) -> añadir color rojo o verde de gasto o ingreso en los movimientos
//(check) -> al borrar un movimiento que aparezca un modal de confirmacion
//(check) -> al crear un movimiento que aparezca un modal de confirmacion
//(check) -> componetizar detalle de movimiento
//(check) -> correciones david
//(check) -> light/dark que sea un switch
//(check) -> terminar de decorar el modal de crear movimiento
//(check) -> el modal de crear movimiento que se abra en todas las vistas

//MODIFICACION GRANDE
//(check) -> crear movimiento que sea un modal con el fondo mas sombreado (que aparezca encima del dashboard)
//que persista en indexedDB
//implementar wage API
//(check) -> clases para light/dark mode
//ultimar detalles (buenas practicas, UX/UI -> colores y cositas visuales. Demás cosas que se puedan mejorar)

import Header from "@/app/Header/Header"
import BalanceSection from "./balanceSection/page"
import MovementsSection from "./movementSection/page"
import Image from "next/image"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import Spinner from "@/components/ui/Spinner/Spinner"
import CreateMovement from "./movements/CreateMovement/CreateMovement"

export default function Home() {
  const { addedMovementBanner, loading, openCreate, setOpenCreate } =
    useContext(FinanceContext)

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col dark:bg-blue-950/50">
      <Header setOpenCreate={setOpenCreate} />
      {openCreate && <CreateMovement />}
      <div className="flex justify-center items-center px-2 py-2">
        {loading && <Spinner />}
        {addedMovementBanner && (
          <p className="rounded-lg bg-green-300/50 w-full text-center px-2 py-2">
            Movimiento realizado correctamente
          </p>
        )}
      </div>
      <main className="flex-1 flex flex-row gap-20 justify-around py-4 my-10 mx-20 rounded-lg shadow bg-[#4893B1] relative overflow-hidden dark:bg-taupe-900/80">
        <Image
          src="/balanceodesign.png"
          alt="logo"
          fill
          className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none z-0 dark:opacity-1"
        />
        <section className="w-full z-10">
          <BalanceSection />
        </section>
        <section className="w-full z-10">
          <MovementsSection />
        </section>
      </main>
    </div>
  )
}
