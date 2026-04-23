function Select({
  labelClassName,
  divClassName,
  labelTitle,
  value,
  onChange,
  selectClassName,
  optionHeader,
  options = [],
}) {
  return (
    <div className={divClassName}>
      <label className={labelClassName}>{labelTitle}</label>
      <select value={value} onChange={onChange} className={selectClassName}>
        <option value="">{optionHeader}</option>
        {options.map((choice, index) => (
          <option key={index} value={choice.value}>
            {choice.title}
          </option>
        ))}
      </select>
    </div>
  )
}
export default Select
