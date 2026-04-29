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
function BarChart({ formData }) {
  const totalIncome = formData.reduce((acc, total) => {
    if (total.money > 0) {
      return (acc += total.money)
    } else {
      return acc
    }
  }, 0)
  const totalExpense = formData.reduce((acc, total) => {
    if (total.money < 0) {
      return (acc += total.money)
    } else {
      return acc
    }
  }, 0)
  const data = dashboardData(totalExpense, totalIncome)

  return (
    <div className="h-100 mx-auto w-full">
      <Bar data={data} options={options} />
    </div>
  )
}
export default BarChart
