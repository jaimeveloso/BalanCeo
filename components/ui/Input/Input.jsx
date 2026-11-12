function Input({ text, type, onChange, value, placeholder, hasError = false }) {
  return (
    <>
      <label
        className={`block self-start text-sm font-medium mb-1 ${hasError ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-slate-300"}`}
      >
        {text}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        aria-invalid={hasError}
        className={`w-full placeholder-slate-400 border text-slate-900 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:outline-none transition-colors dark:bg-slate-700/50 dark:text-slate-100 dark:placeholder-slate-500 dark:[color-scheme:dark] ${
          hasError
            ? "border-rose-500 focus:ring-rose-500/30 focus:border-rose-500 dark:border-rose-400"
            : "border-slate-300 focus:ring-blue-500/40 focus:border-blue-500 dark:border-slate-600"
        }`}
      />
    </>
  )
}
export default Input
