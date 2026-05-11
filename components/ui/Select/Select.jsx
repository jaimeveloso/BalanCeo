function Select({ labelTitle, value, onChange, optionHeader, options = [] }) {
  return (
    <>
      <label className="block font-medium">{labelTitle}</label>
      <select
        value={value}
        onChange={onChange}
        className="rounded-sm p-1 bg-white text-blue-950 hover:cursor-pointer"
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
