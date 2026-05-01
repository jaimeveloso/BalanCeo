function Input({ text, type, onChange, value, placeholder }) {
  return (
    <>
      <label className="block font-medium">{text}</label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className="w-full border italic border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-white"
      />
    </>
  )
}
export default Input
