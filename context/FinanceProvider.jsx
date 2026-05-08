"use client"
import { useState } from "react"
import { FinanceContext } from "./FinanceContext"
import { SCREENS } from "@/app/screens/screens"

function FinanceProvider({ children }) {
  const [formData, setFormData] = useState([])
  const [detailMovement, setDetailMovement] = useState(null)
  const [selectedPage, setSelectedPage] = useState(SCREENS.LIST)

  const addMovement = (movement) => {
    setFormData((prev) => [...prev, movement])
  }
  function selectDetailMovement(data) {
    setDetailMovement(data)
  }
  function changeScreenAtMovement(page) {
    setSelectedPage(page)
  }
  return (
    <FinanceContext.Provider
      value={{
        addMovement,
        formData,
        detailMovement,
        setDetailMovement,
        selectDetailMovement,
        changeScreenAtMovement,
        selectedPage,
        setSelectedPage,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}
export default FinanceProvider
