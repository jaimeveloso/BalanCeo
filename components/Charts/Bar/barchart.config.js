import { dashboardData } from "./barchart.data"
import { formatMoney } from "@/app/utils/formatMoney"
export const options = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Balance total",
    },
    tooltip: {
      callbacks: {
        label: (context) =>
          `${context.dataset.label}: ${formatMoney(context.parsed.y)}`,
      },
    },
  },
  scales: {
    y: {
      padding: 100,
      beginAtZero: true,
      ticks: {
        callback: (value) => formatMoney(value),
      },
    },
  },
  color: "rgba(100, 100, 100)",
  type: "bar",
  data: dashboardData,
}
