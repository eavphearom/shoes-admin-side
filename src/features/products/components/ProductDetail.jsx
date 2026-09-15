import { Boxes, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState } from "react";
import authShoe from "../../../assets/auth-shoe.png";
import Button from "../../../components/ui/Button";

const galleryImages = [
  { id: 1, src: authShoe, alt: "White sneaker side view" },
  { id: 2, src: authShoe, alt: "Black sneaker side view", tone: "dark" },
  { id: 3, src: authShoe, alt: "White sneaker sole view", tone: "muted" },
  { id: 4, src: authShoe, alt: "White sneaker angle view" },
  { id: 5, src: authShoe, alt: "White sneaker top view", tone: "muted" },
  { id: 6, src: authShoe, alt: "Black sneaker angle view", tone: "dark" },
];

const stockRows = [
  { id: 1, color: "White", size: "US 6", price: "$120.00", stock: 12, lowStock: 3 },
  { id: 2, color: "White", size: "US 7", price: "$120.00", stock: 18, lowStock: 3 },
  { id: 3, color: "White", size: "US 8", price: "$120.00", stock: 15, lowStock: 3 },
  { id: 4, color: "White", size: "US 9", price: "$120.00", stock: 14, lowStock: 3 },
  { id: 5, color: "White", size: "US 10", price: "$120.00", stock: 11, lowStock: 2 },
  { id: 6, color: "White", size: "US 11", price: "$120.00", stock: 8, lowStock: 2 },
];

export default function ProductDetail({ variant, onClose }) {
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const thumbnailRef = useRef(null);
  const totalStock = stockRows.reduce((total, row) => total + row.stock, 0);

  if (!variant) return null;

  return (
    <div className="-m-4 bg-white">
      <div className="grid gap-6 p-4 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div>
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-[#F7F9FC]">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className={`h-full w-full object-contain p-8 ${
                selectedImage.tone === "dark"
                  ? "grayscale brightness-50"
                  : selectedImage.tone === "muted"
                    ? "grayscale opacity-70"
                    : ""
              }`}
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                thumbnailRef.current?.scrollBy({
                  left: -96,
                  behavior: "smooth",
                })
              }
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#D7DFEA] bg-white text-[#64748B] transition hover:bg-[#F7F9FC] hover:text-[#F97316]"
              aria-label="Scroll thumbnails left"
            >
              <ChevronLeft size={18} />
            </button>

            <div
              ref={thumbnailRef}
              className="grid flex-1 auto-cols-[calc((100%-36px)/4)] grid-flow-col gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
            >
              {galleryImages.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-lg border bg-[#F8FAFD] transition ${
                    selectedImage.id === image.id
                      ? "border-[#F97316] ring-1 ring-[#F97316]"
                      : "border-[#D7DFEA] hover:border-[#F97316]"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`h-full w-full object-contain p-2 ${
                      image.tone === "dark"
                        ? "grayscale brightness-50"
                        : image.tone === "muted"
                          ? "grayscale opacity-70"
                          : ""
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
                type="button"
              onClick={() =>
                thumbnailRef.current?.scrollBy({
                  left: 96,
                  behavior: "smooth",
                })
              }
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#D7DFEA] bg-white text-[#64748B] transition hover:bg-[#F7F9FC] hover:text-[#F97316]"
              aria-label="Scroll thumbnails right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="pt-2">
          <h3 className="text-xl font-bold text-[#03152B]">
            {variant.product} - Standard ({variant.color})
          </h3>

          <dl className="mt-6 grid grid-cols-[130px_minmax(0,1fr)] gap-x-4 gap-y-4 text-sm">
            <DetailRow label="Variant SKU" value={variant.sku} />
            <DetailRow label="Product" value={variant.product} link />
            <DetailRow label="Category" value="Running Shoes" link />
            <DetailRow label="Brand" value={getBrandName(variant.product)} link />
            <DetailRow label="Base Price (USD)" value={`$${Number(variant.price).toFixed(2)}`} />
            {/* <DetailRow label="Created At" value="Aug 10, 2026 10:30 AM" />
            <DetailRow label="Updated At" value="Aug 24, 2026 04:15 PM" /> */}
          </dl>

          <div className="mt-8">
            <h4 className="text-base font-bold text-[#03152B]">Description</h4>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#475569]">
              {variant.description ||
                `Standard version in ${variant.color}. Lightweight and responsive cushioning for everyday comfort.`}
            </p>
          </div>
        </div>
      </div>

      <section className="mx-4 mt-2 overflow-hidden rounded-lg border border-[#D7DFEA] bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-[#E5EAF1] p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFF7ED] text-[#F97316]">
              <Boxes size={16} />
            </span>
            <h4 className="font-bold text-[#03152B]">Real Stock</h4>
          </div>
          <p className="text-sm font-semibold text-[#03152B]">
            Total Stock:{" "}
            <span className="text-[#15803D]">{totalStock} Pairs</span>
          </p>
        </div>

        <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-[#E5EAF1] bg-[#F8FAFD] text-left text-xs font-semibold text-[#64748B]">
                <th className="px-4 py-3">Color</th>
                <th className="px-4 py-3">Size (US)</th>
                <th className="px-4 py-3">Price (USD)</th>
                <th className="px-4 py-3">Stock Qty</th>
                <th className="px-4 py-3">Low Stock Alert</th>
                <th className="px-4 py-3">Stock Status</th>
              </tr>
            </thead>
            <tbody>
              {stockRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#EEF2F7] text-sm last:border-0 hover:bg-[#F8FAFD]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="h-4 w-4 rounded-full border border-[#CBD5E1] bg-white" />
                      <span className="font-medium text-[#03152B]">
                        {row.color}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#03152B]">
                    {row.size}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#03152B]">
                    {row.price}
                  </td>
                  <td className="px-4 py-3 text-[#03152B]">{row.stock}</td>
                  <td className="px-4 py-3 text-[#03152B]">{row.lowStock}</td>
                  <td className="px-4 py-3">
                    <StockBadge stock={row.stock} lowStock={row.lowStock} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex justify-end px-4 py-5">
        <Button type="button" variant="secondary" onClick={onClose} className="gap-2">
          <X size={15} />
          Close
        </Button>
      </div>
    </div>
  );
}

function DetailRow({ label, value, link = false }) {
  return (
    <>
      <dt className="font-semibold text-[#64748B]">{label}</dt>
      <dd
        className={`font-semibold ${
          link ? "text-[#F97316]" : "text-[#03152B]"
        }`}
      >
        {value}
      </dd>
    </>
  );
}

function StockBadge({ stock, lowStock }) {
  const isLow = stock <= lowStock * 4;

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${
        isLow
          ? "bg-orange-100 text-orange-600"
          : "bg-[#DCFCE7] text-[#15803D]"
      }`}
    >
      {isLow ? "Low Stock" : "In Stock"}
    </span>
  );
}

function getBrandName(productName) {
  if (typeof productName !== "string") return "Nike";

  if (productName.includes("s")) return "Adidas";
  if (productName.includes("RS-X")) return "Puma";

  return "Nike";
}
