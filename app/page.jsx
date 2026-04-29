"use client"
//(check) -> componetizado iconos, boton, inputs y labels. Corrigiendo errores como se ven los botones sin campos completados.
//(check) -> Añadir detalle movimiento
//siguiente -> crean vista de balance y despues filtrados por categorias, fecha, etc
//componetizar crear movimiento y movimientos
//añadir color rojo o verde de gasto o ingreso en los movimientos
//(check) ->añadir gráfica de balance en el dashboard
//(check) -> añadir el logo y el favicon

import { useState } from "react"
import Header from "@/components/Header/Header"
import BackIcon from "@/components/ui/icons/BackIcon"
import CloseIcon from "@/components/ui/icons/CloseIcon"
import Button from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import Select from "@/components/ui/Select/Select"
import DashboardChart from "@/components/Charts/Bar/BarChart"
import FilterIcon from "@/components/ui/icons/FilterIcon"
import BalanceBoard from "./BalanceBoard"
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
  const [detailMovement, setDetailMovement] = useState(null)
  const [balanceView, setBalanceView] = useState(false)

  const totalMoney = formData.reduce(
    (acc, total) => acc + Number(total.money || 0),
    0,
  )

  function changeScreenAtMovement(page) {
    setSelectedPage(page)
  }
  function changeBalanceView() {
    setBalanceView(true)
  }

  function goesToCreatePage() {
    setIsCreating(true)
  }
  function changePageToMovement() {
    setIsMovement(true)
  }
  function selectDetailMovement(data) {
    setDetailMovement(data)
  }
  //poner los setters directamente en la llamada del onclick
  function goToDashBoardPage() {
    setIsCreating(false)
    setIsMovement(false)
    setDetailMovement(null)
    setBalanceView(false)
  }
  function resetForm() {
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

    resetForm()
  }
  console.log(formData)
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* ------------------------------------------------DASHBOARD---------------------------------------------------- */}
      {/* --------------NAVEGACIÓN HEADER--------------- */}
      {!isCreating && !isMovement && !balanceView && (
        <>
          <Header goesToCreatePage={goesToCreatePage} />
          <main className="flex-1 flex flex-row gap-20 justify-around py-4 my-10 mx-20 rounded-lg shadow bg-[#4893B1] relative overflow-hidden">
            <img
              src="/Balanceo.png"
              alt="logo"
              className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none z-0"
            />
            {/* --------------------------BALANCE--------------------- */}
            <section className="w-full z-10">
              <div className="flex flex-col justify-around h-full items-center py-4 px-10">
                <div className="rounded-lg flex flex-col justify-center items-center">
                  <Button
                    onClick={changeBalanceView}
                    className="text-4xl px-5 py-3 font-serif my-1 text-gray-600 hover:text-black transition-all duration-400 hover:scale-110"
                  >
                    Balance
                  </Button>
                </div>
                <div className=" bg-gray-200 shadow-xs  shadow-gray-400 h-full w-full flex flex-col gap-5 justify-center rounded-lg px-3">
                  <h1 className="text-4xl py-3 text-center font-mono">
                    {totalMoney}€
                  </h1>
                  <DashboardChart formData={formData} />
                </div>
              </div>
            </section>
            {/* ------------------MINI HISTORIAL MOVIMIENTOS----------------- */}
            <section className="w-full z-10">
              <div className="h-full items-center flex justify-around flex-col py-4 px-10">
                <div className=" rounded-lg">
                  <button
                    onClick={changePageToMovement}
                    className="text-4xl text-gray-600 px-3 py-3 my-1 font-serif hover:text-black transition-all duration-400 hover:scale-110"
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
                          className={`flex justify-around py-10 rounded-lg ${Number(data.money) < 0 ? "bg-red-300/50" : "bg-green-300/50"}`}
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
        <div className="flex justify-center items-center flex-col h-screen relative overflow-hidden bg-[#B4CADC]">
          <img
            src="/Balanceo-redondo.png"
            alt="logo"
            className="absolute inset-0 w-full h-full object-contain opacity-1 pointer-events-none z-0"
          />
          <div className="flex flex-col w-full gap-6 max-w-md rounded-lg bg-linear-to-r from-transparent via-blue-900 to-transparent bg-blue-950 shadow-lg p-6 text-white/90 relative ">
            <Button
              onClick={goToDashBoardPage}
              className="absolute top-4 left-4"
            >
              <BackIcon />
            </Button>

            <h1 className="text-center font-bold text-2xl">
              Crear un nuevo movimiento
            </h1>
            <div className="flex justify-center w-full text-blue-950 gap-1">
              <Button
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
              </Button>
              <Button
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
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col items-center mb-2">
                <Input
                  text="Título"
                  type="text"
                  onChange={(event) => setTitle(event.target.value)}
                  value={title}
                  placeholder="Entradas"
                />
              </div>
              <div className="flex flex-col items-center mb-2">
                <Select
                  labelTitle="Categoría"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  optionHeader="Seleccione una categoría"
                  options={
                    typeOfMovement === "income"
                      ? [
                          { title: "Nómina", value: "Nómina" },
                          { title: "Extra", value: "Extra" },
                        ]
                      : [
                          { title: "Ocio", value: "Ocio" },
                          { title: "Alimentación", value: "Alimentación" },
                          { title: "Transporte", value: "Transporte" },
                          { title: "Vivienda", value: "Vivienda" },
                          { title: "Salud", value: "Salud" },
                        ]
                  }
                />
              </div>
              <div className="flex flex-col items-center mb-2">
                <Input
                  text="Descripción"
                  type="text"
                  onChange={(event) => setDescription(event.target.value)}
                  value={description}
                  placeholder="Entradas para ver a Coldplay"
                />
              </div>
              <div className="flex flex-col items-center mb-2">
                <Input
                  text="Cantidad"
                  type="text"
                  onChange={(event) => setMoney(event.target.value)}
                  value={money}
                  placeholder="0,00€"
                />
              </div>
              <div className="flex flex-col items-center mb-2">
                <Input
                  text="Fecha"
                  type="date"
                  onChange={(event) => setDate(event.target.value)}
                  value={date}
                />
              </div>

              <Button className="w-full text-center rounded-lg bg-white text-blue-950 hover:bg-gray-200 hover:text-black p-3">
                Guardar
              </Button>
            </form>
          </div>
        </div>
      )}
      {/* ---------------------------------------------------MOVIMIENTOS----------------------------------------------------------- */}
      {/* movimientos tipo lista o card y poder hacer click para ver el detalle del movimiento */}
      {/*----------------------LISTA--------------------- */}
      {isMovement && selectedPage === SCREENS.LIST && (
        <div className="flex items-center flex-col h-full w-full h-screen py-10 bg-[#B4CADC]">
          <img
            src="/Balanceo-redondo.png"
            alt="logo"
            className="absolute inset-0 w-full h-full object-contain opacity-1 pointer-events-none z-0"
          />
          <div className="flex flex-col w-full max-w-lg gap-6 rounded-lg  bg-blue-100 shadow-lg p-6">
            <Button
              onClick={goToDashBoardPage}
              className="absloute top-4 hover:text-blue-950"
            >
              <BackIcon />
            </Button>
            <div className="flex gap-2 justify-center text-white">
              <Button
                onClick={() => changeScreenAtMovement(SCREENS.LIST)}
                className="rounded-lg py-1 px-1 bg-gray-500 hover:bg-gray-600"
              >
                Listado
              </Button>
              <Button
                onClick={() => changeScreenAtMovement(SCREENS.CARD)}
                className="rounded-lg py-1 px-1 bg-gray-500 hover:bg-gray-600"
              >
                Tarjetas
              </Button>
            </div>
            <h1 className="text-center font-bold text-2xl">Movimientos</h1>
            {formData.map((data, index) => (
              <div
                key={index}
                onClick={() => selectDetailMovement(data)}
                className="flex justify-between items-center px-2 py-2 bg-blue-200 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-bold">{data.title}</p>
                  <p className="font-thin">{data.category}</p>
                </div>
                <p className="">{data.money}€</p>
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
                  <p className="font-bold font-mono">
                    Descripción del movimiento
                  </p>
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
      )}

      {/* ---------------------CARD---------------------- */}
      {isMovement && selectedPage === SCREENS.CARD && (
        <div className="flex items-center flex-col h-full my-10">
          <div className="flex flex-col w-full max-w-lg gap-6 rounded-lg  bg-blue-100 shadow-lg p-6">
            <Button onClick={goToDashBoardPage} className="absloute top-4">
              <BackIcon />
            </Button>
            <div className="flex gap-2 justify-center text-white">
              <Button
                onClick={() => changeScreenAtMovement(SCREENS.LIST)}
                className="rounded-lg py-1 px-1 bg-gray-500 hover:bg-gray-600"
              >
                Listado
              </Button>
              <Button
                onClick={() => changeScreenAtMovement(SCREENS.CARD)}
                className="rounded-lg py-1 px-1 bg-gray-500 hover:bg-gray-600"
              >
                Tarjetas
              </Button>
            </div>
            <h1 className="text-center font-bold text-2xl">Movimientos</h1>
            <div className="grid w-full grid-cols-3 gap-3">
              {formData.map((data, index) => (
                <div
                  key={index}
                  onClick={() => selectDetailMovement(data)}
                  className="flex max-w-sm flex-col items-center px-2 py-2 rounded-lg shadow-sm bg-blue-200"
                >
                  <div className="flex flex-col gap-2 py-2">
                    <p className="font-bold">{data.title}</p>
                    <p className="font-thin">{data.category}</p>
                  </div>
                  <p className="pb-2">{data.money}€</p>
                </div>
              ))}
            </div>
            {/*--------------------- DETALLE MOVIMIENTO----------------- */}
            {detailMovement && (
              <div className="flex flex-col justify-center text-center gap-2 w-full py-3 px-3 rounded-lg shadow-md relative">
                <h1 className="font-bold text-center text-xl">
                  {detailMovement.title}
                </h1>
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
                  <p className="font-bold font-mono">
                    Descripción del movimiento
                  </p>
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
      )}
      {/* datos a necesitar: 
-balance total
-total ingresos
-total gastos
-dinero por categorías (gasto)
-dinero entre fechas (ingreso y gasto) */}
      {balanceView && (
        <BalanceBoard setBalanceView={setBalanceView} formData={formData} />
      )}
    </div>
  )
}
