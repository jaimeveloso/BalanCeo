import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { formatMoney } from "@/app/utils/formatMoney"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"

ChartJS.register(ArcElement, Tooltip, Legend)

function PieChart({ sumCategoriesMoney }) {
  const { isDark } = useContext(FinanceContext)
  const alpha = isDark ? 0.6 : 0.85
  const data = {
    labels: ["Ocio", "Transporte", "Alimentación", "Salud", "Vivienda"],

    datasets: [
      {
        data: [
          -sumCategoriesMoney.social,
          -sumCategoriesMoney.transport,
          -sumCategoriesMoney.food,
          -sumCategoriesMoney.health,
          -sumCategoriesMoney.house,
        ],
        backgroundColor: [
          `rgba(139, 92, 246, ${alpha})`,
          `rgba(37, 99, 235, ${alpha})`,
          `rgba(16, 185, 129, ${alpha})`,
          `rgba(244, 63, 94, ${alpha})`,
          `rgba(245, 158, 11, ${alpha})`,
        ],
        borderWidth: 2,
        borderColor: "transparent",
      },
    ],
  }

  const options = {
    responsive: true,
    color: isDark ? "#cbd5e1" : "#475569",

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gasto por categoría",
        color: isDark ? "#cbd5e1" : "#475569",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${formatMoney(context.parsed)}`,
        },
      },
    },
  }

  return (
    <div className="h-100 flex items-center justify-center w-full">
      <Pie data={data} options={options} />
    </div>
  )
}
export default PieChart
