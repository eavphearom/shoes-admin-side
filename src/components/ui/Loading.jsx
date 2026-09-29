import { cn } from "@/lib/utils";

export default function Loading({
  overlay = false,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center",
        overlay ? "bg-black/20" : "bg-[#F5F7FB]",
        className
      )}
    >
      <style>{`
        @keyframes loading-ui-classic-fade {
          0% { opacity: 1; }
          100% { opacity: 0.15; }
        }
      `}</style>

      <span
        role="status"
        className="box-border inline-block size-10 text-orange-500"
        {...props}
      >
        <span
          aria-hidden="true"
          className="relative top-1/2 left-1/2 block size-full"
        >
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              className="absolute top-[-3.9%] left-[-10%] block h-[8%] w-[24%] rounded-full bg-current"
              style={{
                transform: `rotate(${index * 30}deg) translate(146%)`,
                animation:
                  "loading-ui-classic-fade 1.2s linear infinite",
                animationDelay: `${(index - 12) * 0.1}s`,
              }}
            />
          ))}
        </span>

        <span className="sr-only">Loading</span>
      </span>
    </div>
  );
}