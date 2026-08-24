export default function Select({
  label,
  options = [],
  error,
  placeholder = "Select option",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block font-medium">
          {label}
        </label>
      )}

      <select
        {...props}
        className={`w-full rounded-lg border px-3 py-2 outline-none ${
          error
            ? "border-red-500"
            : "border-gray-300"
        }`}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}