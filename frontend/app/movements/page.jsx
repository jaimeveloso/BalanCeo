"use client"
import { useContext, useState } from "react"
import Card from "./Card/Card"
import List from "./List/List"
import { SCREENS } from "../config/screens"
import Header from "../Header/Header"
import { FinanceContext } from "@/context/FinanceContext"

function Movements() {
  const { selectedPage } = useContext(FinanceContext)

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {selectedPage === SCREENS.LIST && (
        <div className="min-h-screen">
          <Header />
          <List />
        </div>
      )}
      {selectedPage === SCREENS.CARD && (
        <div className="min-h-screen">
          <Header />
          <Card />
        </div>
      )}
    </div>
  )
}
export default Movements
