"use client"
//(check) -> componetizado iconos, boton, inputs y labels. Corrigiendo errores como se ven los botones sin campos completados.
//(check) -> Añadir detalle movimiento
//(check) -> crear vista de balance y graficos de balance y por categorias
//(check) -> componetizar crear movimiento
//(check) -> componetizar movimientos
//(check) ->añadir gráfica de balance en el dashboard
//(check) -> añadir el logo y el favicon
//(check) -> crear un contexto
//crear las rutas con next
//añadir color rojo o verde de gasto o ingreso en los movimientos
//clases para light/dark mode
//ultimar detalles (buenas practicas, UX/UI -> colores y cositas visuales. Demás cosas que se puedan mejorar)

import Header from "@/app/Header/Header"
import BalanceSection from "./balanceSection/page"
import MovementsSection from "./movementSection/page"

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-row gap-20 justify-around py-4 my-10 mx-20 rounded-lg shadow bg-[#4893B1] relative overflow-hidden">
        <img
          src="/balanceo.png"
          alt="logo"
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
