import { Ban, Box, Boxes, ChevronRight, Database, Palette, TriangleAlert, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import authShoe from "../../../assets/auth-shoe.png";
import Button from "../../../components/ui/Button";
import { stockPreview, summarizeStock } from "../data/stockPreview";
import { StockImage, StockStat, StockTable, StatusBadge } from "./StockDetails";
import "./ProductDetail.css";

const emptyVariants = [];

export default function ProductDetail({ product, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const timerRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const [closing, setClosing] = useState(false);
  // Preview fixtures stay separate from the product list until API integration.
  const variants = product?.variants === 0 ? emptyVariants : stockPreview;
  const [selectedId, setSelectedId] = useState(() => (variants.find((item) => item.is_default) || variants[0])?.id);
  const selected = variants.find((item) => item.id === selectedId) || variants[0];
  const totals = useMemo(() => summarizeStock(variants.flatMap((item) => item.stocks)), [variants]);
  const current = useMemo(() => summarizeStock(selected?.stocks || []), [selected]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      clearTimeout(timerRef.current);
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  function requestClose() {
    if (closing) return;
    setClosing(true);
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300;
    timerRef.current = window.setTimeout(onClose, duration);
  }

  function handleKeyDown(event) {
    if (event.key !== "Tab") return;
    const controls = Array.from(dialogRef.current.querySelectorAll('button, [tabindex="0"]'));
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  const image = product?.images?.[0]?.url || (typeof product?.images?.[0] === "string" ? product.images[0] : authShoe);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-modal="true"
      onKeyDown={handleKeyDown}
      className={"product-stock-panel " + (closing ? "is-closing" : "")}
      onCancel={(event) => { event.preventDefault(); requestClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) requestClose(); }}
    >
      <div className="flex h-full min-h-0 flex-col bg-white text-[#03152B]">
        <header className="flex shrink-0 items-start justify-between gap-4 px-4 pb-4 pt-5 sm:px-6 sm:pt-6">
          <div>
            <h2 id={titleId} className="text-xl font-semibold sm:text-2xl">Product Stock Details</h2>
            <p id={descriptionId} className="mt-1 text-sm leading-6 text-[#64748B]">View stock information by variant color and size.</p>
          </div>
          <button ref={closeRef} type="button" onClick={requestClose} aria-label="Close stock details" className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#E5EAF1] bg-[#F8FAFC] text-[#64748B] transition hover:bg-[#FFF7ED] hover:text-[#EA6500] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]">
            <X size={21} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-5 sm:px-6">
          <section aria-label="Product stock overview" className="grid items-center gap-5 py-3 xl:grid-cols-[minmax(280px,0.8fr)_minmax(0,2fr)]">
            <div className="flex min-w-0 items-center gap-4">
              <StockImage src={image} alt={product?.name || "Product"} className="h-24 w-24 sm:h-28 sm:w-28" />
              <div className="min-w-0">
                <h3 className="break-words text-lg font-semibold">{product?.name || "Product"}</h3>
                <p className="mt-2 break-words text-sm text-[#64748B]">SKU: {product?.sku || "PRD-" + String(product?.id || 1).padStart(4, "0")}</p>
                <p className="mt-1 text-sm text-[#64748B]">Category: {product?.category || "Uncategorized"}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#64748B]">Status: <StatusBadge status={product?.status || "Draft"} /></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 2xl:grid-cols-5">
              <StockStat icon={Boxes} label="Total Stock" value={totals.total} unit="pairs" tone="green" />
              <StockStat icon={Palette} label="Total Variants" value={variants.length} unit="colors" tone="blue" />
              <StockStat icon={Box} label="Total Sizes" value={totals.sizes} unit="sizes" tone="orange" />
              <StockStat icon={TriangleAlert} label="Low Stock" value={totals.low} unit="sizes" tone="orange" />
              <StockStat icon={Ban} label="Out of Stock" value={totals.out} unit="sizes" tone="red" />
            </div>
          </section>

          <div className="mt-4 grid min-w-0 overflow-hidden rounded-lg border border-[#E5EAF1] lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[290px_minmax(0,1fr)]">
            <aside aria-label="Product variants" className="min-w-0 border-b border-[#E5EAF1] bg-[#FAFBFD] p-4 lg:border-b-0 lg:border-r">
              <h3 className="mb-3 text-base font-semibold">Variants ({variants.length})</h3>
              <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                {variants.map((item) => {
                  const summary = summarizeStock(item.stocks);
                  const active = selected?.id === item.id;
                  return (
                    <button key={item.id} type="button" aria-pressed={active} onClick={() => setSelectedId(item.id)} className={"flex w-56 shrink-0 cursor-pointer items-center gap-3 rounded-lg border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] lg:w-full " + (active ? "border-[#F9B985] bg-[#FFF5EB]" : "border-[#EAEFF5] bg-white hover:border-[#CBD5E1]")}>
                      <StockImage src={item.id === "black" ? image : undefined} alt={item.color + " variant"} className="h-16 w-16" />
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 text-sm font-semibold"><span className="h-3 w-3 shrink-0 rounded-full border border-black/10" style={{ backgroundColor: item.colorCode }} />{item.color}</p>
                        <p className="mt-1 text-xs leading-5 text-[#64748B]"><span className="font-medium">{summary.total}</span> pairs / {summary.sizes} sizes</p>
                      </div>
                      <ChevronRight size={17} aria-hidden="true" className={active ? "text-[#EA6500]" : "text-[#94A3B8]"} />
                    </button>
                  );
                })}
              </div>
              {!variants.length && <p className="text-sm text-[#64748B]">No variants added yet.</p>}
            </aside>

            <section aria-label="Selected variant stock" className="min-w-0 p-4 sm:p-5">
              {selected ? <>
                <div className="flex items-center gap-4">
                  <StockImage key={selected.id} src={selected.id === "black" ? image : undefined} alt={selected.color + " variant"} className="h-20 w-24" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold">{selected.color}</h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#64748B]"><span className="h-5 w-5 rounded-full border border-[#D7DFEA]" style={{ backgroundColor: selected.colorCode }} />{selected.colorCode}</p>
                  </div>
                  <StatusBadge status={selected.status} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
                  <StockStat icon={Box} label="Total Stock" value={current.total} unit="pairs" tone="green" />
                  <StockStat icon={Database} label="Available Sizes" value={current.available} unit="sizes" tone="blue" />
                  <StockStat icon={TriangleAlert} label="Low Stock Sizes" value={current.low} unit="sizes" tone="orange" />
                  <StockStat icon={Ban} label="Out of Stock Sizes" value={current.out} unit="sizes" tone="red" />
                </div>
                <h4 className="mb-3 mt-5 text-base font-semibold">Stock by Size</h4>
                <StockTable variant={selected} />
              </> : <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center text-[#64748B]"><Boxes size={32} /><p>No stock information available.</p></div>}
            </section>
          </div>
        </div>
        <footer className="flex shrink-0 justify-end border-t border-[#EEF2F7] bg-white px-4 py-3 sm:px-6">
          <Button type="button" variant="secondary" onClick={requestClose} className="gap-2"><X size={16} />Close</Button>
        </footer>
      </div>
    </dialog>, document.body,
  );
}
