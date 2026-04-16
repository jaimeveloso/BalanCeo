"use client"
//siguiente -> componetizar header, crear movimiento y movimientos
//añadir color rojo o verde de gasto o ingreso en los movimientos y añadir el detalle del movimiento IMPORTANTE
//añadir gráfica de balance en el dashboard
//añadir vista balance
//añadir el logo y el favicon

import { useState } from "react"
const SCREENS = {
  LIST: "LIST",
  CARD: "CARD",
}
export default function Home() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [money, setMoney] = useState("")
  const [date, setDate] = useState("")
  const [formData, setFormData] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [isMovement, setIsMovement] = useState(false)
  const [selectedPage, setSelectedPage] = useState(SCREENS.LIST)
  const [typeOfMovement, setTypeOfMovement] = useState("expense")

  const totalMoney = formData.reduce(
    (acc, total) => acc + Number(total.money || 0),
    0,
  )
  console.log(formData)
  function changeScreenAtMovement(page) {
    setSelectedPage(page)
  }
  function changePageToCreate() {
    setIsCreating(true)
  }
  function changePageToMovement() {
    setIsMovement(true)
  }

  function goToDashBoardPage() {
    setIsCreating(false)
    setIsMovement(false)
  }
  function reset() {
    setTitle("")
    setCategory("")
    setMoney("")
    setDate("")
    setDescription("")
    setTypeOfMovement("expense")
    setIsCreating(false)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const moneyType =
      typeOfMovement === "expense" ? -Number(money) : Number(money)
    const newData = {
      title: title,
      category: category,
      money: moneyType,
      date: date,
      description: description,
    }
    setFormData((previousData) => [...previousData, newData])

    reset()
  }
  console.log(typeOfMovement)
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* ------------------------------------------------DASHBOARD---------------------------------------------------- */}
      {/* --------------NAVEGACIÓN HEADER--------------- */}
      {!isCreating && !isMovement && (
        <>
          <header className="bg-blue-900 shadow-md shadow-blue-950 rounded-md">
            <div className="max-w-6xl mx-auto flex justify-around px-3 py-7 items-center text-white">
              <h1>LOGO</h1>
              <div className="flex gap-7">
                <button onClick={changePageToCreate}>Crear Movimiento</button>
                <button>Light/Dark</button>
              </div>
            </div>
          </header>
          <main className="flex-1 flex flex-row gap-20 justify-around py-4 my-10 mx-20 rounded-lg shadow">
            {/* --------------------------BALANCE--------------------- */}
            <section className="w-full">
              <div className="flex flex-col justify-around h-full items-center py-4 px-10">
                <div className="rounded-lg flex flex-col justify-center items-center">
                  <h2 className="text-4xl px-5 py-5 font-serif my-1">
                    Balance
                  </h2>
                </div>
                <div className=" bg-gray-200 shadow-xs  shadow-gray-400 flex w-full h-full gap-2 justify-around text-end rounded-lg px-3 py-10">
                  <p className="p-2 bg-green-200 h-full rounded-lg">
                    Gráfica 1
                  </p>
                  <h1 className="text-4xl py-3 text-start">{totalMoney}€</h1>

                  <p className="p-2 bg-red-200 h-full rounded-lg">Gráfica 2</p>
                </div>
              </div>
            </section>
            {/* ------------------MINI HISTORIAL MOVIMIENTOS----------------- */}
            <section className="w-full">
              <div className="h-full items-center flex justify-around flex-col py-4 px-10">
                <div className=" rounded-lg">
                  <button
                    onClick={changePageToMovement}
                    className="text-4xl text-gray-600 px-3 py-3 my-1 font-serif hover:text-black transition-all duration-200 hover:scale-110"
                  >
                    Movimientos
                  </button>
                </div>

                <div className="w-full bg-gray-200 rounded-lg  shadow-sm shadow-gray-400 flex flex-col justify-around h-full px-3 py-10">
                  {formData.length === 0 ? (
                    <p className="text-blue-950 text-center text-2xl">
                      No hay movimientos
                    </p>
                  ) : (
                    <>
                      {formData.slice(-3).map((data, index) => (
                        <div
                          key={index}
                          className={`flex justify-around py-10 rounded-lg ${Number(data.money) < 0 ? "bg-red-200" : "bg-green-200"}`}
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
          <div className="flex flex-col w-full max-w-md gap-6 rounded-lg bg-linear-to-r from-transparent via-blue-900 to-transparent bg-blue-950 shadow-lg p-6 text-white/90 relative ">
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

            <h1 className="text-center font-bold text-2xl">
              Crear un nuevo movimiento
            </h1>
            <div className="flex justify-center w-full text-blue-950 gap-1">
              <button
                onClick={() => {
                  setTypeOfMovement("income")
                }}
                className={
                  typeOfMovement === "income"
                    ? "rounded-sm bg-green-200 flex-1 py-1 hover:bg-green-300"
                    : "rounded-sm bg-gray-100 flex-1 py-1 hover:bg-gray-200"
                }
              >
                Ingreso
              </button>
              <button
                onClick={() => {
                  setTypeOfMovement("expense")
                }}
                className={
                  typeOfMovement === "income"
                    ? "rounded-sm bg-gray-100 flex-1 py-1 hover:bg-gray-200"
                    : "rounded-sm bg-red-200 flex-1 py-1 hover:bg-red-300"
                }
              >
                Gasto
              </button>
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
                  {typeOfMovement === "income" && (
                    <>
                      <option value="Nómina">Nómina</option>
                      <option value="Extra">Extra</option>
                    </>
                  )}
                  {typeOfMovement === "expense" && (
                    <>
                      <option value="Ocio">Ocio</option>
                      <option value="Alimentación">Alimentación</option>
                      <option value="Transporte">Transporte</option>
                      <option value="Vivienda">Vivienda</option>
                      <option value="Salud">Salud</option>
                    </>
                  )}
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
              <button className="w-full text-center rounded-lg bg-white text-blue-950 hover:bg-gray-200 hover:text-black p-3">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
      {/* ---------------------------------------------------MOVIMIENTOS----------------------------------------------------------- */}
      {/* movimientos tipo lista o card y poder hacer click para ver el detalle del movimiento */}
      {/*----------------------LISTA--------------------- */}
      {isMovement && selectedPage === SCREENS.LIST && (
        <div className="flex items-center flex-col h-full my-10">
          <div className="flex flex-col w-full max-w-lg gap-6 rounded-lg  bg-blue-100 shadow-lg p-6">
            <button
              onClick={goToDashBoardPage}
              className="absloute top-4 hover:text-blue-950"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <div className="flex gap-2 justify-center text-white">
              <button
                onClick={() => changeScreenAtMovement(SCREENS.LIST)}
                className="rounded-lg py-1 px-1 bg-gray-500 hover:bg-gray-600"
              >
                Listado
              </button>
              <button
                onClick={() => changeScreenAtMovement(SCREENS.CARD)}
                className="rounded-lg py-1 px-1 bg-gray-500 hover:bg-gray-600"
              >
                Tarjetas
              </button>
            </div>
            <h1 className="text-center font-bold text-2xl">Movimientos</h1>
            {formData.map((data, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-2 py-2 bg-blue-200 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-bold">{data.title}</p>
                  <p className="font-thin">{data.category}</p>
                </div>
                <p className="">{data.money}€</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* ---------------------CARD---------------------- */}
      {isMovement && selectedPage === SCREENS.CARD && (
        <div className="flex items-center flex-col h-full my-10">
          <div className="flex flex-col w-full max-w-lg gap-6 rounded-lg  bg-blue-100 shadow-lg p-6">
            <button onClick={goToDashBoardPage} className="absloute top-4">
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
            <div className="flex gap-2 justify-center text-white">
              <button
                onClick={() => changeScreenAtMovement(SCREENS.LIST)}
                className="rounded-lg py-1 px-1 bg-gray-500 hover:bg-gray-600"
              >
                Listado
              </button>
              <button
                onClick={() => changeScreenAtMovement(SCREENS.CARD)}
                className="rounded-lg py-1 px-1 bg-gray-500 hover:bg-gray-600"
              >
                Tarjetas
              </button>
            </div>
            <h1 className="text-center font-bold text-2xl">Movimientos</h1>
            <div className="grid w-full grid-cols-3 gap-3">
              {formData.map((data, index) => (
                <div
                  key={index}
                  className="flex max-w-sm flex-col px-2 py-2 rounded-lg shadow-sm bg-blue-200"
                >
                  <div className="flex flex-col gap-2 py-2">
                    <p className="font-bold">{data.title}</p>
                    <p className="font-thin">{data.category}</p>
                  </div>
                  <p className="pb-2">{data.money}€</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
