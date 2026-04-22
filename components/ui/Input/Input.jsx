function Input({
  labelClassName,
  inputClassName,
  divClassName,
  text,
  type,
  onChange,
  value,
  placeholder,
}) {
  return (
    <div className={divClassName}>
      <label className={labelClassName}>{text}</label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  )
}
export default Input
