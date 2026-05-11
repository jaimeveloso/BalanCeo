"use client"
import { useState } from "react"
import { FinanceContext } from "./FinanceContext"
import { SCREENS } from "@/app/constants/screens"
import {
  BACKEND_CALL_TIME,
  BANNER_VISIBLE_TIME,
} from "@/app/constants/callTimes"

const NEXT_ID_NUMBER = 1

function FinanceProvider({ children }) {
  const [formData, setFormData] = useState([])
  const [detailMovement, setDetailMovement] = useState(null)
  const [selectedPage, setSelectedPage] = useState(SCREENS.LIST)
  const [movementId, setMovementId] = useState(1)
  const [loading, setLoading] = useState(false)
  const [addedMovementBanner, setAddedMovementBanner] = useState(false)
  const [deletedMovementBanner, setDeletedMovementBanner] = useState(false)

  const addMovement = (movement) => {
    setFormData((prev) => [...prev, movement])
    setMovementId(movementId + NEXT_ID_NUMBER)
  }
  function selectDetailMovement(data) {
    setDetailMovement(data)
  }
  function changeScreenAtMovement(page) {
    setSelectedPage(page)
  }
  function deleteMovement(id) {
    setLoading(true)
    const deletedMove = formData.filter((movement) => movement.id !== id)
    setFormData(deletedMove)
    setTimeout(() => {
      setLoading(false)
      setDeletedMovementBanner(true)
      setTimeout(() => {
        setDeletedMovementBanner(false)
      }, BANNER_VISIBLE_TIME)
    }, BACKEND_CALL_TIME)
  }
  const isDetailSelected = (id) => {
    return detailMovement?.id === id
  }
  function handleDetailSelection(data) {
    if (isDetailSelected(data.id)) {
      setDetailMovement(null)
    } else {
      setDetailMovement(data)
    }
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
        loading,
        setLoading,
        addedMovementBanner,
        setAddedMovementBanner,
        deletedMovementBanner,
        setDeletedMovementBanner,
        isDetailSelected,
        handleDetailSelection,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}
export default FinanceProvider
