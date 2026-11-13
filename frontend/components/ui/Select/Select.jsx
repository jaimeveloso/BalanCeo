function Select({
  labelTitle,
  value,
  onChange,
  optionHeader,
  options = [],
  hasError = false,
}) {
  return (
    <>
      <label
        className={`block self-start text-sm font-medium mb-1 ${hasError ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-slate-300"}`}
      >
        {labelTitle}
      </label>
      <select
        value={value}
        onChange={onChange}
        aria-invalid={hasError}
        className={`w-full rounded-lg px-3 py-2 bg-white border text-slate-900 hover:cursor-pointer focus:ring-2 focus:outline-none transition-colors dark:bg-slate-700/50 dark:text-slate-100 ${
          hasError
            ? "border-rose-500 focus:ring-rose-500/30 focus:border-rose-500 dark:border-rose-400"
            : "border-slate-300 focus:ring-blue-500/40 focus:border-blue-500 dark:border-slate-600"
        }`}
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
