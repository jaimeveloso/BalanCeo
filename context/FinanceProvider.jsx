"use client"
import { useState } from "react"
import { FinanceContext } from "./FinanceContext"
import { SCREENS } from "@/app/screens/screens"

function FinanceProvider({ children }) {
  const [formData, setFormData] = useState([])
  const [detailMovement, setDetailMovement] = useState(null)
  const [selectedPage, setSelectedPage] = useState(SCREENS.LIST)
  const [movementId, setMovementId] = useState(1)

  const addMovement = (movement) => {
    setFormData((prev) => [...prev, movement])
    setMovementId(movementId + 1)
  }
  function selectDetailMovement(data) {
    setDetailMovement(data)
  }
  function changeScreenAtMovement(page) {
    setSelectedPage(page)
  }
  function deleteMovement(id) {
    const deletedMove = formData.filter((movement) => movement.id !== id)
    setFormData(deletedMove)
  }
  return (
    <FinanceContext.Provider
      value={{
        movementId,
        addMovement,
        deleteMovement,
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
