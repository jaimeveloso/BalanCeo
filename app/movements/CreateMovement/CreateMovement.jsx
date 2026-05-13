"use client"
import { useContext, useState } from "react"
import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import Input from "@/components/ui/Input/Input"
import Select from "@/components/ui/Select/Select"
import { FinanceContext } from "@/context/FinanceContext"
import { expenseCategories, incomeCategories } from "@/app/constants/categories"
import {
  BACKEND_CALL_TIME,
  BANNER_VISIBLE_TIME,
} from "@/app/constants/callTimes"

function CreateMovement() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [money, setMoney] = useState("")
  const [date, setDate] = useState("")
  const [typeOfMovement, setTypeOfMovement] = useState("expense")
  const {
    addMovement,
    movementId,
    setAddedMovementBanner,
    loading,
    setLoading,
    setOpenCreate,
  } = useContext(FinanceContext)
  const handleSubmit = (event) => {
    event.preventDefault()
    const newData = {
      id: movementId,
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
    setOpenCreate(false)
  }
  const addedMovement = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setAddedMovementBanner(true)
      setTimeout(() => {
        setAddedMovementBanner(false)
      }, BANNER_VISIBLE_TIME)
    }, BACKEND_CALL_TIME)
  }
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center flex-col h-screen bg-white/30 dark:bg-black/30 backdrop-blur-sm dark:tracking-wide">
      <div className="flex flex-col w-full gap-4 max-w-md rounded-lg bg-white border border-zinc-200 shadow-lg p-6 dark:bg-taupe-800 dark:border-zinc-700">
        <Button
          onClick={() => setOpenCreate(false)}
          className="hover:cursor-pointer dark:text-white dark:hover:text-zinc-200"
        >
          <BackIcon />
        </Button>

        <h1 className="text-center text-zinc-900 font-bold text-2xl dark:text-white">
          Crear un nuevo movimiento
        </h1>
        <div className="flex justify-center w-full gap-1">
          <Button
            onClick={() => {
              setTypeOfMovement("income")
            }}
            className={
              typeOfMovement === "income"
                ? "border rounded-lg bg-green-200 text-gray-800 flex-1 py-1 hover:bg-green-300 hover:cursor-pointer dark:bg-green-800/80 dark:text-white dark:hover:bg-green-900/90"
                : "border rounded-lg bg-gray-50 text-gray-800 flex-1 py-1 hover:bg-gray-100 hover:cursor-pointer dark:bg-gray-500 dark:text-white dark:hover:bg-gray-600 active:scale-102 transition-transform"
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
                ? "border rounded-lg bg-gray-50 flex-1 py-1 hover:bg-gray-100 hover:cursor-pointer dark:bg-gray-500 dark:text-white dark:hover:bg-gray-600 active:scale-102 transition-transform"
                : "border rounded-lg bg-red-200 flex-1 py-1 hover:bg-red-300 hover:cursor-pointer dark:bg-red-800/80 dark:text-white dark:hover:bg-red-900/90"
            }
          >
            Gasto
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 dark:text-white"
        >
          <div className="flex flex-col items-center mb-2">
            <Input
              text="Título"
              type="text"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              placeholder="Ej. Entradas"
            />
          </div>
          <div className="flex flex-col items-center mb-2 ">
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
          <div className="flex gap-2 items-center mb-2">
            <Input
              text="Cantidad"
              type="text"
              onChange={(event) => setMoney(event.target.value)}
              value={money}
              placeholder="0,00€"
            />

            <Input
              text="Fecha"
              type="date"
              onChange={(event) => setDate(event.target.value)}
              value={date}
            />
          </div>

          <Button
            onClick={addedMovement}
            loading={loading}
            className="w-full text-center rounded-lg border active:scale-95 transition-transform active:bg-gray-200 hover:bg-gray-200 p-3 hover:cursor-pointer dark:hover:bg-taupe-900"
          >
            Guardar
          </Button>
        </form>
      </div>
    </div>
  )
}
export default CreateMovement
