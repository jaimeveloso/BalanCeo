"use client"
import { useState } from "react"
export default function Home() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [money, setMoney] = useState("")
  const [date, setDate] = useState("")
  const [formData, setFormData] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const totalMoney = formData.reduce(
    (acc, total) => acc + Number(total.money || 0),
    0,
  )
  function changePageToCreate() {
    setIsCreating(true)
  }

  function goToDashBoardPage() {
    setIsCreating(false)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const newData = {
      title: title,
      category: category,
      money: money,
      date: date,
      description: description,
    }
    setFormData((previousData) => [...previousData, newData])
    setTitle("")
    setCategory("")
    setMoney("")
    setDate("")
    setDescription("")
    setIsCreating(false)
  }
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* ------------------------------------------------DASHBOARD---------------------------------------------------- */}
      {/* --------------NAVEGACIÓN HEADER--------------- */}
      {!isCreating && (
        <>
          <header className="bg-blue-900 shadow-md shadow-blue-950 rounded-md">
            <div className="max-w-6xl mx-auto flex justify-around px-3 py-7 items-center text-white">
              <h1>LOGO</h1>
              <div className="flex gap-7">
                <button onClick={() => changePageToCreate()}>
                  Crear Movimiento
                </button>
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
                  <h1 className="text-5xl py-3">{totalMoney}€</h1>
                </div>
                <div className=" bg-gray-200 shadow-xs border shadow-gray-400 flex w-full h-full gap-2 justify-around text-end rounded-lg px-3 py-10">
                  <p className="p-2 bg-green-200 h-full rounded-lg">
                    Gráfica 1
                  </p>
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
                  {formData.length === 0 ? (
                    <p className="text-blue-950 text-center text-2xl">
                      No hay movimientos
                    </p>
                  ) : (
                    <>
                      {formData.slice(-3).map((data, index) => (
                        <div
                          key={index}
                          className="flex justify-around py-10 bg-red-200 rounded-lg"
                        >
                          <p>{data.title}</p>
                          <p>{data.money}€</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </section>
          </main>
        </>
      )}
      {/* ----------------------------------------------CREAR MOVIMIENTO-------------------------------------------------------- */}
      {isCreating && (
        <div className="flex justify-center items-center flex-col h-screen">
          <div className="flex flex-col w-full max-w-md gap-6 rounded-lg bg-blue-950 shadow-lg p-6 text-white/90 relative">
            <button onClick={goToDashBoardPage} className="absolute top-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <div className="flex items-center justify-around w-full">
              <h1 className="text-center font-bold text-2xl">
                Crear un nuevo movimiento
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col items-center mb-2">
                <label className="block font-medium">Título</label>
                <input
                  type="text"
                  onChange={(event) => setTitle(event.target.value)}
                  value={title}
                  placeholder="Entradas"
                  className="w-full border italic border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-white"
                ></input>
              </div>
              <div className="flex flex-col items-center mb-2">
                <label className="block font-medium">Categoría</label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="rounded-sm p-1 bg-white text-blue-950"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="social">Ocio</option>
                  <option value="food">Alimentación</option>
                  <option value="transport">Transporte</option>
                  <option value="home">Vivienda</option>
                  <option value="health">Salud</option>
                </select>
              </div>
              <div className="flex flex-col items-center mb-2">
                <label className="block font-medium">Descripción</label>
                <input
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  type="text"
                  placeholder="Entradas para ver a Coldplay"
                  className="w-full border italic border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-white"
                ></input>
              </div>
              <div className="flex flex-col items-center mb-2">
                <label className="block font-medium">Cantidad</label>
                <input
                  value={money}
                  onChange={(event) => setMoney(event.target.value)}
                  type="text"
                  placeholder="0.00 €"
                  className="w-full border italic border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-white"
                ></input>
              </div>
              <div className="flex flex-col items-center mb-2">
                <label className="block font-medium">Fecha</label>
                <input
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  type="date"
                  className="rounded-sm p-1 bg-white text-blue-950"
                ></input>
              </div>
              <button className="w-full text-center rounded-lg bg-white text-blue-950 hover:bg-blue-100 hover:text-black p-3">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
