"use client"

import Header from "@/app/Header/Header"
import BalanceSection from "./BalanceSection/BalanceSection"
import MovementsSection from "./MovementsSection/MovementsSection"
import BudgetsSection from "./budgets/BudgetsSection"
import Image from "next/image"
import Banners from "@/components/ui/Banners/Banners"

export default function Home() {
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col dark:bg-slate-900">
      <Header />
      <Banners />
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pt-6 pb-10 relative">
        <Image
          src="/balanceodesign.png"
          alt="logo"
          fill
          className="absolute inset-0 w-full h-full object-contain opacity-[0.04] pointer-events-none z-0 dark:opacity-[0.02]"
        />
        <section className="w-full z-10">
          <BalanceSection />
        </section>
        <section className="w-full z-10 flex flex-col gap-6 self-start">
          <MovementsSection />
          <BudgetsSection />
        </section>
      </main>
    </div>
  )
}
