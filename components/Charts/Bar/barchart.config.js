import { dashboardData } from "./barchart.data"
export const options = {
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Balance total",
    },
  },
  scales: {
    y: {
      padding: 100,
      beginAtZero: true,
    },
  },
  color: "rgba(100, 100, 100)",
  type: "bar",
  data: dashboardData,
}
