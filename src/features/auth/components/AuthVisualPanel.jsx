
import authShoe from "../../../assets/auth-shoe.png";
import BrandLogo from "../../../components/ui/BrandLogo";

export default function AuthVisualPanel({
  subtitle = "Enterprise Console",
  headline = "Step Into Your Style.",
  description = "Discover the latest sneakers and footwear made for every step. Engineered for performance, designed for life.",
  variant = "default",
}) {
  if (variant === "card") {
    return (
      <aside className="relative hidden min-h-[680px] overflow-hidden bg-[#FF9B65] p-8 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.34),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(249,115,22,0.22))]" />

        <div className="relative z-10 flex h-full min-h-[680px] flex-col justify-between">
          <div>
           
            <BrandLogo
              size="md"
              className="drop-shadow-sm"
              textClassName="font-michroma"
              shoesClassName="text-white"
            />

            <p className="mt-5 max-w-sm text-[10px] font-michroma uppercase tracking-[0.28em] text-white/70">
              {subtitle}
            </p>

            <h1 className="mt-4 max-w-sm text-3xl font-michroma font-bold leading-tight text-white">
              {headline}
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">
              {description}
            </p>
          </div>

          <div className="absolute bottom-5 left-6 right-6">
            <img
              src={authShoe}
              alt="Featured shoe"
              className="mx-auto w-full rounded-3xl object-contain drop-shadow-[0_30px_40px_rgba(15,23,42,0.3)]"
            />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="relative hidden min-h-screen overflow-hidden bg-[#D7DDE8] lg:block">
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-[#BFC8D8]/40 to-[#1E2B3F]" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between p-10">
        <div>
          <BrandLogo
            size="lg"
            className="drop-shadow-sm"
            shoesClassName="text-white"
          />
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/70">
            {subtitle}
          </p>
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

