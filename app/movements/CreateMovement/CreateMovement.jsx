"use client"
import { useContext, useEffect, useState } from "react"
import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import Input from "@/components/ui/Input/Input"
import Select from "@/components/ui/Select/Select"
import { FinanceContext } from "@/context/FinanceContext"
import { expenseCategories, incomeCategories } from "@/app/config/categories"
import {
  BACKEND_CALL_TIME,
  BANNER_VISIBLE_TIME,
} from "@/app/config/callTimes"

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
  const [errors, setErrors] = useState({})
  const clearError = (field) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: false } : prev))
  const handleSubmit = (event) => {
    event.preventDefault()
    const amount = Number(money.trim().replace(",", "."))
    const newErrors = {
      title: !title.trim(),
      category: !category,
      money: !money.trim() || !Number.isFinite(amount) || amount <= 0,
      date: !date,
    }
    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return
    const newData = {
      id: movementId,
      title: title,
      category: category,
      money: typeOfMovement === "expense" ? -amount : amount,
      date: date,
      description: description,
    }
    addMovement(newData)
    addedMovement()
    resetForm()
  }
  function changeTypeOfMovement(type) {
    setTypeOfMovement(type)
    setCategory("")
    clearError("category")
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
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenCreate(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [setOpenCreate])

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpenCreate(false)
      }}
      className="fixed inset-0 z-50 flex justify-center items-center flex-col h-screen px-4 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm"
    >
      <div className="flex flex-col w-full gap-4 max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl p-6 dark:bg-slate-800 dark:border-slate-700">
        <Button
          onClick={() => setOpenCreate(false)}
          className="self-start text-slate-400 hover:text-blue-700 hover:cursor-pointer transition-colors dark:text-slate-500 dark:hover:text-white"
        >
          <BackIcon />
        </Button>

        <h1 className="text-center text-slate-900 font-semibold tracking-tight text-2xl dark:text-slate-100">
          Crear un nuevo movimiento
        </h1>
        <div className="flex justify-center w-full gap-1">
          <Button
            onClick={() => {
              changeTypeOfMovement("income")
            }}
            className={
              typeOfMovement === "income"
                ? "rounded-lg bg-emerald-600 text-white font-medium flex-1 py-2 shadow-sm hover:cursor-pointer dark:bg-emerald-800 dark:text-slate-100"
                : "rounded-lg bg-slate-100 text-slate-600 font-medium flex-1 py-2 hover:bg-slate-200 hover:cursor-pointer dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors"
            }
          >
            Ingreso
          </Button>
          <Button
            onClick={() => {
              changeTypeOfMovement("expense")
            }}
            className={
              typeOfMovement === "income"
                ? "rounded-lg bg-slate-100 text-slate-600 font-medium flex-1 py-2 hover:bg-slate-200 hover:cursor-pointer dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors"
                : "rounded-lg bg-rose-600 text-white font-medium flex-1 py-2 shadow-sm hover:cursor-pointer dark:bg-rose-800 dark:text-slate-100"
            }
          >
            Gasto
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 dark:text-slate-100"
        >
          <div className="flex flex-col items-center mb-2">
            <Input
              text="Título"
              type="text"
              onChange={(event) => {
                setTitle(event.target.value)
                clearError("title")
              }}
              hasError={errors.title}
              value={title}
              placeholder="Ej. Entradas"
            />
          </div>
          <div className="flex flex-col items-center mb-2 ">
            <Select
              labelTitle="Categoría"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value)
                clearError("category")
              }}
              hasError={errors.category}
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
          <div className="flex gap-3 mb-2">
            <div className="flex flex-col flex-1">
              <Input
                text="Cantidad"
                type="text"
                onChange={(event) => {
                  setMoney(event.target.value)
                  clearError("money")
                }}
                hasError={errors.money}
                value={money}
                placeholder="0,00€"
              />
            </div>
            <div className="flex flex-col flex-1">
              <Input
                text="Fecha"
                type="date"
                onChange={(event) => {
                  setDate(event.target.value)
                  clearError("date")
                }}
                hasError={errors.date}
                value={date}
              />
            </div>
          </div>

          <Button
            loading={loading}
            className="w-full text-center rounded-lg bg-blue-700 text-white font-semibold shadow-sm hover:bg-blue-800 active:scale-95 transition p-3 hover:cursor-pointer dark:bg-blue-800 dark:hover:bg-blue-700"
          >
            Guardar
          </Button>
        </form>
      </div>
    </div>
  )
}
export default CreateMovement
