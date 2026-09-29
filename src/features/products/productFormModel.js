export const categoryOptions = ["Shoes", "Accessories", "Clothing"].map(value => ({ value, label: value }));
export const brandOptions = ["Nike", "Adidas", "Puma"].map(value => ({ value, label: value }));
export const colorOptions = [
  { value: "White", label: "White", colorCode: "#FFFFFF" },
  { value: "Black", label: "Black", colorCode: "#171717" },
  { value: "Red", label: "Red", colorCode: "#DC2626" },
  { value: "Midnight Navy", label: "Midnight Navy", colorCode: "#1E2B3F" },
  { value: "Pink", label: "Pink", colorCode: "#EC4899" },
];
export const sizeOptions = Array.from({ length: 11 }, (_, i) => ({ value: "US " + (i + 4), label: "US " + (i + 4) }));
export const newStock = () => ({ clientId: crypto.randomUUID(), size: "", stock: "", lowStock: "3" });
export const newVariant = (isDefault = false) => ({
  clientId: crypto.randomUUID(), code: "", color: "", cost: "", price: "",
  is_default: isDefault, images: [], stocks: [newStock()],
});

export function formValues(product) {
  if (!product) return { name: "", code: "", category: "", brand: "", description: "", status: "Active", variants: [newVariant(true)] };
  let variants = Array.isArray(product.variants) ? product.variants : [];
  // Preserve records from the previous local color/stock form without guessing prices.
  if (!variants.length && product.colorImages?.length) {
    variants = product.colorImages.map(group => {
      const stocks = (product.variantStock || []).filter(row => row.color === group.color);
      const prices = [...new Set(stocks.map(row => String(row.price)))];
      return {
        ...group, code: group.code || "", cost: group.cost ?? "",
        price: prices.length === 1 ? prices[0] : "", stocks,
        is_default: group.color === product.defaultDisplayColor,
      };
    });
  }
  return {
    ...product, code: product.code || product.sku || "", description: product.description || "",
    variants: variants.map(variant => ({
      ...variant, clientId: variant.clientId || crypto.randomUUID(),
      code: variant.code || "", cost: variant.cost ?? "", price: variant.price ?? "",
      images: (variant.images || []).map((image, index) => ({
        ...(typeof image === "string" ? { url: image } : image),
        is_primary: image.is_primary ?? index === 0,
      })),
      stocks: (variant.stocks || []).map(row => ({ ...row, clientId: row.clientId || crypto.randomUUID() })),
    })),
  };
}

export function listProduct(product) {
  if (!Array.isArray(product.variants)) return product;
  const prices = product.variants.map(v => Number(v.price));
  return {
    ...product,
    variants: product.variants.length,
    stock: product.variants.reduce((total, v) => total + v.stocks.reduce((sum, row) => sum + Number(row.stock), 0), 0),
    priceRange: prices.length ? "$" + Math.min(...prices).toFixed(2) + " - $" + Math.max(...prices).toFixed(2) : "$0.00",
  };
}
