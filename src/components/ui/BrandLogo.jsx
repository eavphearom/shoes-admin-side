import { ShoppingBag } from "lucide-react";

export default function BrandLogo({
  size = "md",
  className = "",
  textClassName = "",
  shoesClassName = "",
}) {
  const sizes = {
    sm: {
      text: "text-xl",
      iconBox: "h-7 w-7 rounded-lg",
      icon: 17,
    },
    md: {
      text: "text-2xl",
      iconBox: "h-8 w-8 rounded-lg",
      icon: 19,
    },
    lg: {
      text: "text-4xl",
      iconBox: "h-11 w-11 rounded-xl",
      icon: 26,
    },
  };
  const currentSize = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span
        className={`font-black tracking-tight text-[#F97316] ${currentSize.text} ${textClassName}`}
      >
        Go
      </span>
      <span
        className={`flex shrink-0 items-center justify-center border-[#F97316] text-[#F97316] ${currentSize.iconBox}`}
      >
        <ShoppingBag size={currentSize.icon} strokeWidth={2.4} />
      </span>
      <span
        className={`font-black tracking-tight text-[#03152B] ${currentSize.text} ${textClassName} ${shoesClassName}`}
      >
        shoes
      </span>
    </div>
  );
}
