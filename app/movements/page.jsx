"use client"
import { useContext, useState } from "react"
import Card from "./Card/Card"
import List from "./List/List"
import { SCREENS } from "../screens/screens"
import Header from "../Header/Header"
import { FinanceContext } from "@/context/FinanceContext"

function Movements() {
  const { selectedPage } = useContext(FinanceContext)

  return (
    <>
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
    </>
  )
}
export default Movements
