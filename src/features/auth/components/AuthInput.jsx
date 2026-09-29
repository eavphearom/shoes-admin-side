export default function AuthInput({
  label,
  icon: Icon,
  type = "text",
  rightControl,
  className = "",
  error,
  ...props
}) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-[#07182E]"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
        />

        <input
          id={props.name}
          type={type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${props.name}-error` : undefined}
          className={`
            h-12 w-full rounded-xl border bg-[#FBFCFE] pl-11 pr-4
            text-sm font-medium text-[#3b3c3d] outline-none transition
            placeholder:font-medium placeholder:text-[#94A3B8]
            ${rightControl ? "pr-11" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-[#D7DFEA] focus:border-[#F97316] focus:bg-white focus:ring-4 focus:ring-[#F97316]/10"
            }
            ${className}
          `}
          {...props}
        />

        {rightControl}
      </div>

      {error && (
        <p
          id={`${props.name}-error`}
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}
