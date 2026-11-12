"use client"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import CreateMovement from "./CreateMovement"

function CreateMovementModal() {
  const { openCreate } = useContext(FinanceContext)
  return openCreate ? <CreateMovement /> : null
}
export default CreateMovementModal
