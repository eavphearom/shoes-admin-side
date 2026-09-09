export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={props.name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={props.name}
        {...props}
        className={`
          w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#03152B] outline-none
          placeholder:text-[#8A98AA] focus:border-[#2E7AF0] focus:ring-2 focus:ring-[#2E7AF0]/10
          ${error ? "border-red-500" : "border-[#D7DFEA]"}
          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
