import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

function PieChart({ sumCategoriesMoney }) {
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
          "rgba(156, 39, 176, 0.6)",
          "rgba(33, 150, 243, 0.6)",
          "rgba(76, 175, 80, 0.6)",
          "rgba(244, 67, 54, 0.6)",
          "rgba(255, 152, 0, 0.6)",
        ],
        borderColor: [
          "rgba(156, 39, 176, 0.6)",
          "rgba(33, 150, 243, 0.6)",
          "rgba(76, 175, 80, 0.6)",
          "rgba(244, 67, 54, 0.6)",
          "rgba(255, 152, 0, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gasto por categoría",
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
