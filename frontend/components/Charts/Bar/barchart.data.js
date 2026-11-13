export const dashboardData = (totalExpense, totalIncome, alpha = 0.8) => ({
  labels: ["Ingresos  /  Gastos"],
  datasets: [
    {
      label: "Ingresos",
      data: [totalIncome],
      backgroundColor: [`rgba(16, 185, 129, ${alpha})`],
      borderRadius: 8,
      barPercentage: 0.6,
    },
    {
      label: "Gastos",
      data: [-totalExpense],
      backgroundColor: [`rgba(244, 63, 94, ${alpha})`],
      borderRadius: 8,
      barPercentage: 0.6,
    },
  ],
})
