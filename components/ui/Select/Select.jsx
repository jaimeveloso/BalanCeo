function Select({ labelTitle, value, onChange, optionHeader, options = [] }) {
  return (
    <>
      <label className="block font-medium">{labelTitle}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full text-center rounded-lg px-3 py-2 bg-white border text-blue-950 hover:cursor-pointer focus:ring-2 focus:ring-blue-300 focus:outline-none focus:bg-white focus:border-transparent transition-colors"
      >
        <option value="">{optionHeader}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </>
  )
}
export default Select
