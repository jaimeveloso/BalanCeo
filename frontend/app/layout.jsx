import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import AuthProvider from "@/context/AuthProvider"
import AuthGuard from "@/app/AuthGuard/AuthGuard"
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <FinanceProvider>
            <AuthGuard>
              {children}
              <CreateMovementModal />
              <BudgetModal />
            </AuthGuard>
          </FinanceProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
