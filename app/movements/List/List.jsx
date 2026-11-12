import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import DeleteIcon from "@/components/ui/icons/DeleteIcon"
import DetailIcon from "@/components/ui/icons/DetailIcon"
import CloseDetailIcon from "@/components/ui/icons/CloseDetailIcon"
import Image from "next/image"
import DetailMovement from "../DetailMovement/DetailMovement"
import Banners from "@/components/ui/Banners/Banners"
import ViewTabs from "@/components/ui/ViewTabs/ViewTabs"
import { formatMoney } from "@/app/utils/formatMoney"
import { categoryLabel } from "@/app/config/categories"
import EmptyMovements from "../EmptyMovements/EmptyMovements"
import { movementTone } from "@/app/utils/movementStyles"

function List() {
  const {
    formData,
    detailMovement,
    deleteMovement,
    isDetailSelected,
    handleDetailSelection,
  } = useContext(FinanceContext)

  return (
    <>
      <Banners />
      <div className="flex items-center flex-col w-full px-6 pt-6 pb-10">
        <Image
          src="/rounded-balanceo.png"
          alt="logo"
          fill
          className="absolute inset-0 w-full h-full object-contain opacity-[0.03] pointer-events-none z-0"
        />

        <div className="relative z-10 flex flex-col w-full max-w-xl gap-5 rounded-2xl bg-white border border-slate-200 shadow-sm p-6 dark:bg-slate-800 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button className="text-slate-400 hover:text-blue-700 hover:cursor-pointer transition-colors dark:text-slate-500 dark:hover:text-white">
                <BackIcon />
              </Button>
            </Link>
            <ViewTabs />
            <span className="w-6" />
          </div>
          <h1 className="text-center font-semibold tracking-tight text-2xl text-slate-900 dark:text-slate-100">
            Movimientos
          </h1>
          {formData.length === 0 && <EmptyMovements />}
          {formData.map((data) => (
            <div
              key={data.id}
              className={`flex justify-between items-center px-4 py-3 rounded-xl border ${movementTone(data.money)}`}
            >
              <div>
                <p className="font-semibold">{data.title}</p>
                <p className="text-sm opacity-70">{categoryLabel(data.category)}</p>
              </div>
              <div className="flex gap-4 items-center">
                <p className="font-semibold tabular-nums">
                  {formatMoney(data.money)}
                </p>
                <Button
                  onClick={() => {
                    handleDetailSelection(data)
                  }}
                  className="hover:cursor-pointer"
                >
                  {isDetailSelected(data.id) ? (
                    <CloseDetailIcon />
                  ) : (
                    <DetailIcon />
                  )}
                </Button>

                <Button
                  onClick={() => deleteMovement(data.id)}
                  className="hover:cursor-pointer"
                >
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          ))}
          {detailMovement && <DetailMovement />}
        </div>
      </div>
    </>
  )
}
export default List
