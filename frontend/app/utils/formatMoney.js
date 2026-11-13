const euroFormatter = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: "always",
})

export function formatMoney(value) {
  const amount = Number(value)
  return `${euroFormatter.format(Number.isFinite(amount) ? amount : 0)}€`
}
