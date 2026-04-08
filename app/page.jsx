"use client"
//APIs:
// - charts.js
// - DummyJson(usuarios fake)
// - Faker.js(cuenta bancaria o dinero fake)
//Primer input visual que queremos para que el usuario pueda tener algo con lo que tener una referencia visual:
//--> 1- Un dashboard inicial con los componentes que vayamos a trabajar posteriormente (nada funcional, solo visual)
//--> 2- Trabajar en cada vista individualmente (ir añadiendo funcionalidades poco a poco)

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* ------------------------------------------------DASHBOARD---------------------------------------------------- */}
      {/* --------------NAVEGACIÓN HEADER--------------- */}
      <header className="bg-blue-900 shadow-md shadow-blue-950 rounded-md">
        <div className="max-w-6xl mx-auto flex justify-around px-3 py-7 items-center text-white">
          <h1>LOGO</h1>
          <div className="flex gap-7">
            <button>Crear Movimiento</button>
            <button>Light/Dark</button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-row gap-20 justify-around py-4 my-10 mx-20 rounded-lg shadow">
        {/* --------------------------BALANCE--------------------- */}
        <section className="w-full">
          <div className="flex flex-col justify-around h-full items-center py-4 px-10">
            <div className="rounded-lg flex flex-col justify-center items-center">
              <h2 className="text-gray-400">Saldo disponible</h2>
              <h1 className="text-5xl py-3">1200€</h1>
            </div>
            <div className=" bg-gray-200 shadow-xs border shadow-gray-400 flex w-full h-full gap-2 justify-around text-end rounded-lg px-3 py-10">
              <p className="p-2 bg-green-200 h-full rounded-lg">Gráfica 1</p>
              <p className="p-2 bg-red-200 h-full rounded-lg">Gráfica 2</p>
            </div>
          </div>
        </section>
        {/* ------------------MINI HISTORIAL MOVIMIENTOS----------------- */}
        <section className="w-full">
          <div className="h-full items-center flex justify-around flex-col py-4 px-10">
            <div className=" rounded-lg">
              <h1 className="text-4xl px-5 py-7.5">Movimientos</h1>
            </div>
            <div className="w-full bg-gray-200 rounded-lg border shadow-xs shadow-gray-400 flex flex-col justify-around h-full px-3 py-10">
              <div className="flex justify-around py-10 bg-red-200 rounded-lg">
                <p>Cena</p>
                <p>20€</p>
              </div>
              <div className="flex justify-around py-10 bg-green-200 rounded-lg">
                <p>Bizum de amigo</p>
                <p>10€</p>
              </div>
              <div className="flex justify-around py-10 bg-red-200 rounded-lg">
                <p>Starbucks</p>
                <p>7,50€</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
