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

function DashboardChart({ formData }) {
  const totalIncome = formData.reduce(
    (acc, total) => (total.money > 0 ? acc + total.money : acc),
    0,
  )
  const totalExpense = formData.reduce(
    (acc, total) => (total.money < 0 ? acc + total.money : acc),
    0,
  )
  const data = {
    labels: ["Balance de Movimientos"],
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
  }
  const options = {
    scales: {
      y: {
        padding: 100,
        beginAtZero: true,
      },
    },
    color: "rgba(100, 100, 100)",
    type: "bar",
    data: data,
  }
  return (
    <div className="h-120 w-full">
      <Bar data={data} options={options} />
    </div>
  )
}
export default DashboardChart
