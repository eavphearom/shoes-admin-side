import authShoe from "../../../assets/auth-shoe.png";

export default function AuthVisualPanel({
  brand = "GPT-STORE",
  subtitle = "Enterprise Console",
  headline = "Step Into Your Style.",
  description = "Discover the latest sneakers and footwear made for every step. Engineered for performance, designed for life.",
}) {
  return (
    <aside className="relative hidden min-h-screen overflow-hidden bg-[#D7DDE8] lg:block">
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-[#BFC8D8]/40 to-[#1E2B3F]" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between p-10">
        <div>
          <h1 className="text-3xl font-bold text-white drop-shadow-sm">
            {brand}
          </h1>
          {/* <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/70">
            {subtitle}
          </p> */}
        </div>

        <div className="absolute left-1/2 top-[42%] w-[88%] -translate-x-1/2 -translate-y-1/2">
          <img
            src={authShoe}
            alt=""
            className="w-full object-contain drop-shadow-2xl"
          />
        </div>

        <div className="relative max-w-md pb-8 text-white">
          <h2 className="text-2xl font-bold">{headline}</h2>
          <p className="mt-3 text-sm font-medium leading-6 text-white/85">
            {description}
          </p>
        </div>
      </div>
    </aside>
  );
}
