export const expenseCategories = [
  { title: "Ocio", value: "social" },
  { title: "Alimentación", value: "food" },
  { title: "Transporte", value: "transport" },
  { title: "Vivienda", value: "house" },
  { title: "Salud", value: "health" },
]
export const incomeCategories = [
  { title: "Nómina", value: "payroll" },
  { title: "Extra", value: "extrapay" },
]

export function categoryLabel(value) {
  const found = [...expenseCategories, ...incomeCategories].find(
    (c) => c.value === value,
  )
  return found ? found.title : value
}
