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
    <div className="h-screen bg-gray-100">
      {selectedPage === SCREENS.LIST && (
        <>
          <Header />
          <List />
        </>
      )}
      {selectedPage === SCREENS.CARD && (
        <>
          <Header />
          <Card />
        </>
      )}
    </div>
  )
}
export default Movements
