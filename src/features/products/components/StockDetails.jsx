import { ImageOff } from "lucide-react";
import { useState } from "react";
import { stockStatus } from "../data/stockPreview";

const tones = {
  green: "bg-[#F0FAF5] text-[#008A44]",
  blue: "bg-[#F1F5FF] text-[#245AE8]",
  orange: "bg-[#FFF7ED] text-[#EA6500]",
  red: "bg-[#FFF0F2] text-[#E42336]",
};

export function StockStat({ icon: Icon, label, value, unit, tone }) {
  return (
    <div className={"flex min-w-0 items-center gap-3 rounded-lg p-3 sm:p-4 " + tones[tone]}>
      <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/60 sm:flex" aria-hidden="true">
        <Icon size={25} strokeWidth={1.7} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium leading-5">{label}</p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-[#03152B]">
          <span className="text-2xl font-semibold">{value}</span>
          <span className="text-xs font-normal text-[#64748B]">{unit}</span>
        </p>
      </div>
    </div>
  );
}

export function StockImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={"flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F4F5F7] " + className}>
      {src && !failed ? (
        <img src={src} alt={alt} onError={() => setFailed(true)} className="h-full w-full object-contain p-2" />
      ) : (
        <span role="img" aria-label={alt + ": image unavailable"} className="text-[#94A3B8]"><ImageOff size={28} /></span>
      )}
    </div>
  );
}

export function StatusBadge({ status }) {
  const tone = status === "Active" || status === "In Stock" ? "bg-[#DEF6E9] text-[#00853E]"
    : status === "Out of Stock" ? "bg-[#FFE5EA] text-[#D9233D]"
    : status === "Low Stock" ? "bg-[#FFF0DE] text-[#D95800]" : "bg-[#F1F5F9] text-[#64748B]";
  return <span className={"inline-flex whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium " + tone}>{status}</span>;
}

export function StockTable({ variant }) {
  const maxStock = Math.max(1, ...variant.stocks.map((row) => Number(row.stock)));
  return (
    <div className="overflow-x-auto rounded-lg border border-[#EAEFF5]" tabIndex={0} role="region" aria-label="Stock by size table">
      <table className="w-full min-w-[580px] text-left text-sm">
        <caption className="sr-only">{variant.color} stock by US size</caption>
        <thead className="bg-[#F3F6FA] text-xs text-[#536680]"><tr>
          <th scope="col" className="px-4 py-3 font-medium">Size (US)</th>
          <th scope="col" className="w-[40%] px-4 py-3 font-medium">Stock Qty</th>
          <th scope="col" className="px-4 py-3 font-medium">Low Stock Alert</th>
          <th scope="col" className="px-4 py-3 font-medium">Stock Status</th>
        </tr></thead>
        <tbody>{variant.stocks.map((row) => {
          const status = stockStatus(row);
          return <tr key={row.size} className="border-t border-[#EEF2F7]">
            <th scope="row" className="whitespace-nowrap px-4 py-3 font-medium">{row.size}</th>
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="w-6 shrink-0 tabular-nums">{row.stock}</span>
                <span aria-hidden="true" className="h-2 flex-1 overflow-hidden rounded-full bg-[#EAEFF4]">
                  <span className={"block h-full rounded-full " + (status === "Low Stock" ? "bg-[#FFB65B]" : status === "Out of Stock" ? "bg-[#EF4444]" : "bg-[#20B474]")} style={{ width: (Number(row.stock) / maxStock) * 100 + "%" }} />
                </span>
              </div>
            </td>
            <td className="px-4 py-3 tabular-nums text-[#536680]">{row.lowStock}</td>
            <td className="px-4 py-2"><StatusBadge status={status} /></td>
          </tr>;
        })}</tbody>
      </table>
      {!variant.stocks.length && <p className="p-6 text-sm text-[#64748B]">No size stock added for this variant.</p>}
    </div>
  );
}
