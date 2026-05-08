"use client"
import { useContext, useState } from "react"
import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import Input from "@/components/ui/Input/Input"
import Select from "@/components/ui/Select/Select"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import { useRouter } from "next/navigation"

function CreateMovement() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [money, setMoney] = useState("")
  const [date, setDate] = useState("")
  const [typeOfMovement, setTypeOfMovement] = useState("expense")
  const { addMovement } = useContext(FinanceContext)
  const router = useRouter()
  const handleSubmit = (event) => {
    event.preventDefault()
    const newData = {
      title: title,
      category: category,
      money: typeOfMovement === "expense" ? -Number(money) : Number(money),
      date: date,
      description: description,
    }
    addMovement(newData)
    resetForm()
  }
  function resetForm() {
    setTitle("")
    setCategory("")
    setMoney("")
    setDate("")
    setDescription("")
    setTypeOfMovement("expense")
    router.push("/")
  }
  const expenseCategories = [
    { title: "Ocio", value: "social" },
    { title: "Alimentación", value: "food" },
    { title: "Transporte", value: "transport" },
    { title: "Vivienda", value: "house" },
    { title: "Salud", value: "health" },
  ]
  const incomeCategories = [
    { title: "Nómina", value: "payroll" },
    { title: "Extra", value: "extrapay" },
  ]
  return (
    <div className="flex justify-center items-center flex-col h-screen relative overflow-hidden bg-[#B4CADC]">
      <img
        src="/rounded-balanceo.png"
        alt="logo"
        className="absolute inset-0 w-full h-full object-contain opacity-1 pointer-events-none z-0"
      />
      <div className="flex flex-col w-full gap-6 max-w-md rounded-lg bg-linear-to-r from-transparent via-blue-900 to-transparent bg-blue-950 shadow-lg p-6 text-white/90 relative ">
        <Link href="/" className="absolute top-4 left-4">
          <Button>
            <BackIcon />
          </Button>
        </Link>
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
                  ? incomeCategories.map((category) => ({
                      title: category.title,
                      value: category.value,
                    }))
                  : expenseCategories.map((category) => ({
                      title: category.title,
                      value: category.value,
                    }))
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
  )
}
export default CreateMovement
