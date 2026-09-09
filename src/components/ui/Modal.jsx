import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  if (!isOpen) return null;
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-7xl",
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03152B]/50 p-4">
      <div
        className={`flex max-h-[90vh] w-full ${sizes[size]} flex-col overflow-hidden rounded-lg border border-[#D7DFEA] bg-white shadow-xl`}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-[#E5EAF1] p-4">
          <h2 className="text-lg font-semibold text-[#03152B]">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 cursor-pointer text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#03152B]"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal content */}
        <div className="overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden">{children}</div>
      </div>
    </div>
  );
}
