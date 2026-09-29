import { RefreshCw } from "lucide-react";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  className = "",
}) {
  const variants = {
    primary: "bg-[#F97316] text-white hover:bg-[#EA580C]",
    secondary:
      "border border-[#D7DFEA] bg-white text-[#03152B] hover:bg-[#F7F9FC]",
    warning: "bg-amber-50 text-amber-700 hover:bg-amber-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`
    inline-flex items-center justify-center gap-2
    rounded-lg px-4 py-2 text-sm font-semibold
    transition-all duration-200
    disabled:cursor-not-allowed,
    cursor-pointer
    ${variants[variant]}
    ${loading ? "!bg-[#FB923C] !shadow-none" : ""}
    ${className}
  `}
    >
      {children}

      {loading && (
        <RefreshCw size={18} className="animate-spin" aria-hidden="true" />
      )}
    </button>
  );
}
