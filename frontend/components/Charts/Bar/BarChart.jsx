import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
import { options } from "./barchart.config"
import { dashboardData } from "./barchart.data"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
function BarChart() {
  const { formData, isDark } = useContext(FinanceContext)
  const textColor = isDark ? "#cbd5e1" : "#475569"
  const themedOptions = {
    ...options,
    color: textColor,
    plugins: {
      ...options.plugins,
      title: { ...options.plugins.title, color: textColor },
    },
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        ticks: { ...options.scales.y.ticks, color: textColor },
        grid: { color: isDark ? "rgba(148, 163, 184, 0.15)" : "#e2e8f0" },
      },
      x: {
        ticks: { color: textColor },
        grid: { display: false },
      },
    },
  }
  const totalIncome = formData.reduce((acc, total) => {
    if (total.money > 0) {
      return (acc += total.money)
    }
    return acc
  }, 0)
  const totalExpense = formData.reduce((acc, total) => {
    if (total.money < 0) {
      return (acc += total.money)
    }
    return acc
  }, 0)
  const data = dashboardData(totalExpense, totalIncome, isDark ? 0.55 : 0.8)

  return (
    <div className="h-100 mx-auto w-full ">
      <Bar data={data} options={themedOptions} />
    </div>
  )
}
export default BarChart
