export default function MultiSelect({
  label,
  options = [],
  error,
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
        multiple
        {...props}
        className={`w-full rounded-lg border px-3 py-2 outline-none ${
          error
            ? "border-red-500"
            : "border-gray-300"
        }`}
      >
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