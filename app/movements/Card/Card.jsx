import Button from "@/components/ui/Button/Button"
import BackIcon from "@/components/ui/icons/BackIcon"
import { useContext } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import DetailIcon from "@/components/ui/icons/DetailIcon"
import DeleteIcon from "@/components/ui/icons/DeleteIcon"
import CloseDetailIcon from "@/components/ui/icons/CloseDetailIcon"
import Image from "next/image"
import DetailMovement from "../DetailMovement/DetailMovement"
import Banners from "@/components/ui/Banners/Banners"
import ViewTabs from "@/components/ui/ViewTabs/ViewTabs"
import { formatMoney } from "@/app/utils/formatMoney"
import { categoryLabel } from "@/app/config/categories"
import EmptyMovements from "../EmptyMovements/EmptyMovements"
import { movementTone } from "@/app/utils/movementStyles"

function Card() {
  const {
    formData,
    detailMovement,
    isDetailSelected,
    handleDetailSelection,
    deleteMovement,
  } = useContext(FinanceContext)

  return (
    <>
      <Banners />
      <div className="flex items-center flex-col px-6 pt-6 pb-10">
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
          <div className="grid w-full grid-cols-3 gap-3">
            {formData.map((data) => (
              <div
                key={data.id}
                className={`flex flex-col items-center px-2 py-3 rounded-xl border ${movementTone(data.money)}`}
              >
                <div className="flex flex-col items-center gap-1 py-2 text-center">
                  <p className="font-semibold">{data.title}</p>
                  <p className="text-sm opacity-70">{categoryLabel(data.category)}</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <p className="font-semibold tabular-nums">
                    {formatMoney(data.money)}
                  </p>
                  <div className="flex gap-3 items-center">
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
              </div>
            ))}
          </div>
          {detailMovement && <DetailMovement />}
        </div>
      </div>
    </>
  )
}
export default Card
