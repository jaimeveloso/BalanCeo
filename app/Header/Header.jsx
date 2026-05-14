import Link from "next/link"
import Button from "../../components/ui/Button/Button"
import Image from "next/image"
import { useContext, useState } from "react"
import { FinanceContext } from "@/context/FinanceContext"
import Switch from "@/components/ui/Switch/Switch"

function Header() {
  const { setOpenCreate } = useContext(FinanceContext)

  return (
    <header className="bg-blue-900 shadow-md shadow-blue-950 rounded-md dark:bg-zinc-900/80 dark:shadow-black ">
      <div className="max-w-6xl mx-auto flex justify-between px-3 py-5 items-center text-white">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/rounded-balanceo.png"
              alt="mini-logo"
              width={50}
              height={50}
              className="w-10 h-10 hover:cursor"
            />

            <span className="font-serif text-xl font-bold hover hover:cursor-pointer">
              BalanCeo
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-20">
          <Button
            onClick={() => setOpenCreate(true)}
            className="hover:cursor-pointer rounded-lg py-1 px-1 border text-white active:scale-105 hover:scale-102 transition-transform dark:text-white dark:border"
          >
            Nuevo 💸
          </Button>
          <Switch />
        </div>
      </div>
    </header>
  )
}
export default Header
