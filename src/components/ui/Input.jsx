export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  name,
  disabled = false,
}) {
  return (
    <div className="space-y-1 text-start">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full rounded-lg border px-3 py-2 outline-none
          focus:ring-2 focus:ring-blue-500
          ${error ? "border-red-500" : "border-gray-300"}
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