import { Check, ChevronDown } from "lucide-react";
import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Select = forwardRef(function Select({
  label,
  options = [],
  error,
  placeholder = "Select option",
  value,
  defaultValue = "",
  name,
  onChange,
  onBlur,
  disabled = false,
  className = "",
}, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const labelId = useId();
  const currentValue = value ?? internalValue;
  const selectedOption = options.find((option) => option.value === currentValue);
  const getOptionColor = (option) => option?.color || option?.colorCode;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const updateDropdownPosition = () => {
      const rect = containerRef.current?.getBoundingClientRect();

      if (!rect) return;

      const dropdownHeight = Math.min(240, (options.length + 1) * 38);
      const bottomSpace = window.innerHeight - rect.bottom;
      const top = bottomSpace < dropdownHeight && rect.top > dropdownHeight
        ? rect.top - dropdownHeight - 8
        : rect.bottom + 8;

      setDropdownPosition({
        top,
        left: rect.left,
        width: rect.width,
      });
    };

    updateDropdownPosition();
    window.addEventListener("resize", updateDropdownPosition);
    window.addEventListener("scroll", updateDropdownPosition, true);

    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition, true);
    };
  }, [isOpen, options.length]);

  const handleSelect = (optionValue) => {
    if (value === undefined) {
      setInternalValue(optionValue);
    }

    onChange?.({
      target: {
        name,
        value: optionValue,
      },
    });
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label
          id={labelId}
          className="mb-1 block text-sm font-medium text-[#334155]"
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        type="hidden"
        name={name}
        value={currentValue}
        readOnly
      />

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        onBlur={onBlur}
        disabled={disabled}
        aria-labelledby={label ? labelId : undefined}
        className={`flex h-9 w-full items-center justify-between rounded-lg border bg-white px-3 text-left text-sm outline-none transition disabled:cursor-not-allowed disabled:bg-[#F1F5F9] disabled:text-[#94A3B8] ${
          error
            ? "border-red-500"
            : "border-[#D7DFEA] focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10"
        } ${className}`}
      >
        <span
          className={`flex min-w-0 items-center gap-2 ${
            selectedOption ? "text-[#03152B]" : "text-[#8A98AA]"
          }`}
        >
          {getOptionColor(selectedOption) && (
            <span
              className="h-3.5 w-3.5 shrink-0 rounded-full border border-[#D7DFEA]"
              style={{ backgroundColor: getOptionColor(selectedOption) }}
            />
          )}
          <span className="truncate">{selectedOption?.label || placeholder}</span>
        </span>
        <ChevronDown
          size={16}
          className={`text-[#64748B] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen &&
        dropdownPosition &&
        createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-[9999] max-h-60 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-lg border border-[#D7DFEA] bg-white shadow-lg animate-[dropdownIn_160ms_cubic-bezier(0.16,1,0.3,1)]"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
          }}
        >
          <button
            type="button"
            onClick={() => handleSelect("")}
            className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-[#8A98AA] transition hover:bg-[#F7F9FC]"
          >
            {placeholder}
            {!currentValue && <Check size={15} className="text-[#F97316]" />}
          </button>

          {options.map((option) => {
            const isSelected = option.value === currentValue;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                  isSelected
                    ? "bg-[#FFF7ED] text-[#F97316]"
                    : "text-[#03152B] hover:bg-[#F7F9FC]"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  {getOptionColor(option) && (
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-[#D7DFEA]"
                      style={{ backgroundColor: getOptionColor(option) }}
                    />
                  )}
                  <span className="truncate">{option.label}</span>
                </span>
                {isSelected && <Check size={15} />}
              </button>
            );
          })}
        </div>,
        document.body,
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

export default Select;
