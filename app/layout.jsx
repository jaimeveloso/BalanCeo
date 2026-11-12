import { Geist, Geist_Mono, Sora } from "next/font/google"
import "./globals.css"
import FinanceProvider from "@/context/FinanceProvider"
import CreateMovementModal from "@/app/movements/CreateMovement/CreateMovementModal"
import BudgetModal from "@/app/budgets/BudgetModal"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

export const metadata = {
  title: "BalanCeo",
  description: "Controla. Evalúa. Optimiza.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon-16x16.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FinanceProvider>
          {children}
          <CreateMovementModal />
          <BudgetModal />
        </FinanceProvider>
      </body>
    </html>
  )
}
