import Button from "@/components/ui/Button/Button"
import { FinanceContext } from "@/context/FinanceContext"
import Link from "next/link"
import { useContext } from "react"

function MovementsSection() {
  const { formData } = useContext(FinanceContext)
  return (
    <div className="h-full items-center flex justify-around flex-col py-4 px-10">
      <div className=" rounded-lg">
        <Link href="/movements">
          <Button className="text-4xl text-gray-600 px-3 py-3 my-1 font-serif hover:text-black transition-all duration-400 hover:scale-110">
            Movimientos
          </Button>
        </Link>
      </div>

      <div className="w-full bg-gray-200 rounded-lg  shadow-sm shadow-gray-400 flex flex-col justify-around h-full px-3 py-10">
        {formData.length === 0 ? (
          <p className="text-blue-950 text-center text-2xl">
            No hay movimientos
          </p>
        ) : (
          <>
            {formData.slice(-3).map((data, index) => (
              <div
                key={index}
                className={`flex justify-around py-10 rounded-lg ${Number(data.money) < 0 ? "bg-red-300/50" : "bg-green-300/50"}`}
              >
                <p>{data.title}</p>
                <p>{data.money}€</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
export default MovementsSection
