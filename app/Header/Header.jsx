import Link from "next/link"
import Button from "../../components/ui/Button/Button"

function Header({ goesToCreatePage }) {
  return (
    <header className="bg-blue-900 shadow-md shadow-blue-950 rounded-md">
      <div className="max-w-6xl mx-auto flex justify-between px-3 py-5 items-center text-white">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/rounded-balanceo.png"
              alt="mini-logo"
              className="w-10 h-10 hover:cursor"
            />

            <span className="font-serif text-xl font-bold hover hover:cursor-pointer">
              BalanCeo
            </span>
          </Link>
        </div>
        <div className="flex gap-7">
          <Link href="/movements/new">
            <Button>Crear Movimiento</Button>
          </Link>
          <Button>Light/Dark</Button>
        </div>
      </div>
    </header>
  )
}
export default Header
