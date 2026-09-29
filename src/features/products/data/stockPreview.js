// Local preview data only; the stock panel does not call an API.
export const stockPreview = [
  {
    id: "black", color: "Black", colorCode: "#171717", is_default: true, status: "Active",
    stocks: [
      { size: "US 6", stock: 3, lowStock: 3 },
      { size: "US 7", stock: 24, lowStock: 3 },
      { size: "US 8", stock: 21, lowStock: 3 },
      { size: "US 9", stock: 17, lowStock: 3 },
      { size: "US 10", stock: 11, lowStock: 2 },
      { size: "US 11", stock: 2, lowStock: 2 },
    ],
  },
  {
    id: "white", color: "White", colorCode: "#FFFFFF", status: "Active",
    stocks: [
      { size: "US 6", stock: 0, lowStock: 3 },
      { size: "US 7", stock: 18, lowStock: 3 },
      { size: "US 8", stock: 16, lowStock: 3 },
      { size: "US 9", stock: 14, lowStock: 3 },
      { size: "US 10", stock: 8, lowStock: 2 },
      { size: "US 11", stock: 6, lowStock: 2 },
    ],
  },
  {
    id: "red", color: "Red", colorCode: "#DC2626", status: "Active",
    stocks: [
      { size: "US 7", stock: 12, lowStock: 3 },
      { size: "US 8", stock: 11, lowStock: 3 },
      { size: "US 9", stock: 10, lowStock: 3 },
      { size: "US 10", stock: 8, lowStock: 2 },
      { size: "US 11", stock: 4, lowStock: 2 },
    ],
  },
];

export function stockStatus(row) {
  if (Number(row.stock) === 0) return "Out of Stock";
  return Number(row.stock) <= Number(row.lowStock) ? "Low Stock" : "In Stock";
}

export function summarizeStock(rows) {
  return rows.reduce((summary, row) => {
    summary.total += Number(row.stock);
    summary.sizes += 1;
    summary.available += Number(row.stock) > 0 ? 1 : 0;
    summary.low += stockStatus(row) === "Low Stock" ? 1 : 0;
    summary.out += stockStatus(row) === "Out of Stock" ? 1 : 0;
    return summary;
  }, { total: 0, sizes: 0, available: 0, low: 0, out: 0 });
}
