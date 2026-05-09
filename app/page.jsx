"use client"
//DETALLES
//(check) -> cursor pointer en elementos clickables
//light/dark que sea un switch
//(check) -> Button de color del menu de arriba
//(check) -> quitar el icono de abajo de next
//(check 1/2) -> Boton de borrar movimiento -> falta en cards
//(check 1/2) -> boton para ver movimiento -> falta en cards
//(check) -> añadir color rojo o verde de gasto o ingreso en los movimientos
//al borrar un movimiento que aparezca un modal de confirmacion
//al crear un movimiento que aparezca un modal de confirmacion
//componetizar detalle de movimiento

//MODIFICACION GRANDE
//crear movimiento que sea un modal con el fondo mas sombreado (que aparezca encima del dashboard)
//que persista en indexedDB
//implementar wage API
//clases para light/dark mode
//ultimar detalles (buenas practicas, UX/UI -> colores y cositas visuales. Demás cosas que se puedan mejorar)

import Header from "@/app/Header/Header"
import BalanceSection from "./balanceSection/page"
import MovementsSection from "./movementSection/page"
import Image from "next/image"

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-row gap-20 justify-around py-4 my-10 mx-20 rounded-lg shadow bg-[#4893B1] relative overflow-hidden">
        <Image
          src="/balanceo.png"
          alt="logo"
          fill
          className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none z-0"
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
