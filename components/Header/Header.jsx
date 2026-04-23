import Button from "../ui/Button/Button"

function Header({ changePageToCreate }) {
  return (
    <header className="bg-blue-900 shadow-md shadow-blue-950 rounded-md">
      <div className="max-w-6xl mx-auto flex justify-between px-3 py-5 items-center text-white">
        <div className="flex items-center gap-2">
          <img
            src="/Balanceo-redondo.png"
            alt="mini-logo"
            className="w-10 h-10"
          />
          <span className="font-serif text-xl font-bold">BalanCeo</span>
        </div>
        <div className="flex gap-7">
          <Button onClick={changePageToCreate}>Crear Movimiento</Button>
          <Button>Light/Dark</Button>
        </div>
      </div>
    </header>
  )
}
export default Header
