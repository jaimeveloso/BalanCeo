"use client"
import { useContext, useState } from "react"
import Card from "./Card/Card"
import List from "./List/List"
import { SCREENS } from "../constants/screens"
import Header from "../Header/Header"
import { FinanceContext } from "@/context/FinanceContext"

function Movements() {
  const { selectedPage } = useContext(FinanceContext)

  return (
    <div className="min-h-screen bg-gray-100">
      {selectedPage === SCREENS.LIST && (
        <div className="min-h-screen dark:bg-taupe-700/90">
          <Header />
          <List />
        </div>
      )}
      {selectedPage === SCREENS.CARD && (
        <div className="min-h-screen dark:bg-taupe-700/90">
          <Header />
          <Card />
        </div>
      )}
    </div>
  )
}
export default Movements
