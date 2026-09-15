import { Check, ChevronDown, X } from "lucide-react";
import { forwardRef, useEffect, useId, useRef, useState } from "react";

const MultiSelect = forwardRef(function MultiSelect({
  label,
  options = [],
  error,
  placeholder = "Select options",
  value,
  defaultValue = [],
  name,
  onChange,
  onBlur,
  disabled = false,
  className = "",
}, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const containerRef = useRef(null);
  const labelId = useId();
  const currentValue = value ?? internalValue;
  const selectedValues = Array.isArray(currentValue) ? currentValue : [];
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value),
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateValue = (nextValue) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.({
      target: {
        name,
        value: nextValue,
      },
    });
  };

  const toggleOption = (optionValue) => {
    const nextValue = selectedValues.includes(optionValue)
      ? selectedValues.filter((item) => item !== optionValue)
      : [...selectedValues, optionValue];

    updateValue(nextValue);
  };

  const removeOption = (optionValue) => {
    updateValue(selectedValues.filter((item) => item !== optionValue));
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
        value={selectedValues.join(",")}
        readOnly
      />

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        onBlur={onBlur}
        disabled={disabled}
        aria-labelledby={label ? labelId : undefined}
        className={`flex min-h-9 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 py-1.5 text-left text-sm outline-none transition disabled:cursor-not-allowed disabled:bg-[#F1F5F9] ${
          error
            ? "border-red-500"
            : "border-[#D7DFEA] focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/10"
        } ${className}`}
      >
        <span className="flex min-w-0 flex-1 flex-wrap gap-1.5">
          {selectedOptions.length === 0 ? (
            <span className="text-[#8A98AA]">{placeholder}</span>
          ) : (
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className="inline-flex items-center gap-1 rounded-md bg-[#FFF7ED] px-2 py-1 text-xs font-semibold text-[#F97316]"
              >
                {option.label}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeOption(option.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      removeOption(option.value);
                    }
                  }}
                  className="rounded-full hover:bg-[#FED7AA]"
                  aria-label={`Remove ${option.label}`}
                >
                  <X size={12} />
                </span>
              </span>
            ))
          )}
        </span>

        <ChevronDown
          size={16}
          className={`shrink-0 text-[#64748B] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-56 overflow-y-auto rounded-lg border border-[#D7DFEA] bg-white shadow-lg animate-[dropdownIn_160ms_cubic-bezier(0.16,1,0.3,1)]">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                  isSelected
                    ? "bg-[#FFF7ED] text-[#F97316]"
                    : "text-[#03152B] hover:bg-[#F7F9FC]"
                }`}
              >
                {option.label}
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border ${
                    isSelected
                      ? "border-[#F97316] bg-[#F97316] text-white"
                      : "border-[#CBD5E1]"
                  }`}
                >
                  {isSelected && <Check size={12} />}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

export default MultiSelect;
