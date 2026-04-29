export const dashboardData = (totalExpense, totalIncome) => ({
  labels: ["Ingresos  /  Gastos"],
  datasets: [
    {
      label: "Ingresos",
      data: [totalIncome],
      backgroundColor: ["rgba(134, 239, 172, 0.6)"],
      barPercentage: 0.6,
    },
    {
      label: "Gastos",
      data: [-totalExpense],
      backgroundColor: ["rgba(252, 165, 165, 0.6)"],
      barPercentage: 0.6,
    },
  ],
})
