function Input({ text, type, onChange, value, placeholder }) {
  return (
    <>
      <label className="block font-medium">{text}</label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className="w-full placeholder-zinc-300 border text-zinc-900 bg-gray-50  rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300/70 focus:outline-none focus:bg-white focus:border-transparent transition-colors"
      />
    </>
  )
}
export default Input
