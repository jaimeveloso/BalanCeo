"use client"
import { useContext, useEffect, useState } from "react"
import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import Input from "@/components/ui/Input/Input"
import Select from "@/components/ui/Select/Select"
import { FinanceContext } from "@/context/FinanceContext"
import { expenseCategories } from "@/app/config/categories"

function BudgetModal() {
  const { openBudget } = useContext(FinanceContext)
  return openBudget ? <BudgetForm /> : null
}

function BudgetForm() {
  const { budgets, setBudget, setOpenBudget } = useContext(FinanceContext)
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    const value = Number(amount.trim().replace(",", "."))
    if (!category) {
      setError("Elige una categoría")
      return
    }
    if (!amount.trim() || !Number.isFinite(value) || value <= 0) {
      setError("Introduce un importe válido mayor que 0 (ej. 150,00)")
      return
    }
    setBudget(category, value)
    setOpenBudget(false)
  }

  const handleCategory = (event) => {
    const selected = event.target.value
    setCategory(selected)
    setError("")
    if (budgets[selected] !== undefined) {
      setAmount(String(budgets[selected]).replace(".", ","))
    }
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenBudget(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [setOpenBudget])

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpenBudget(false)
      }}
      className="fixed inset-0 z-50 flex justify-center items-center flex-col h-screen px-4 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm"
    >
      <div className="flex flex-col w-full gap-4 max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl p-6 dark:bg-slate-800 dark:border-slate-700">
        <Button
          onClick={() => setOpenBudget(false)}
          className="self-start text-slate-400 hover:text-blue-700 hover:cursor-pointer transition-colors dark:text-slate-500 dark:hover:text-white"
        >
          <BackIcon />
        </Button>
        <h1 className="text-center text-slate-900 font-semibold tracking-tight text-2xl dark:text-slate-100">
          Calcular presupuesto
        </h1>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Elige una categoría y cuánto quieres gastar como máximo.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 dark:text-slate-100"
        >
          <div className="flex flex-col items-center mb-2">
            <Select
              labelTitle="Categoría"
              value={category}
              onChange={handleCategory}
              optionHeader="Seleccione una categoría"
              options={expenseCategories.map((c) => ({
                title: c.title,
                value: c.value,
              }))}
            />
          </div>
          <div className="flex flex-col items-center mb-2">
            <Input
              text="Presupuesto"
              type="text"
              onChange={(event) => setAmount(event.target.value)}
              value={amount}
              placeholder="0,00€"
            />
          </div>
          {error && (
            <p className="text-center text-sm text-rose-600 dark:text-rose-400">
              {error}
            </p>
          )}
          <Button className="w-full text-center rounded-lg bg-blue-700 text-white font-semibold shadow-sm hover:bg-blue-800 active:scale-95 transition p-3 hover:cursor-pointer dark:bg-blue-800 dark:hover:bg-blue-700">
            Guardar presupuesto
          </Button>
        </form>
      </div>
    </div>
  )
}
export default BudgetModal
