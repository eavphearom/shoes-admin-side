// The current backend has no product endpoints. Keep the existing local product
// workflow persistent across the create/edit routes without inventing an HTTP DTO.
const initialProducts = [
  { id: 1, name: "Air Max Pulse", category: "Shoes", brand: "Nike", variants: 8, priceRange: "$120 - $180", stock: 145, status: "Active", description: "Responsive daily running sneaker", images: [], createdAt: "Oct 24, 2023" },
  { id: 2, name: "Ultraboost Light", category: "Shoes", brand: "Adidas", variants: 12, priceRange: "$150 - $190", stock: 42, status: "Active", description: "Lightweight cushioned performance shoe", images: [], createdAt: "Oct 20, 2023" },
  { id: 3, name: "RS-X Toys", category: "Shoes", brand: "Puma", variants: 3, priceRange: "$110 - $110", stock: 0, status: "Draft", description: "Bold lifestyle sneaker", images: [], createdAt: "Oct 14, 2023" },
];
let database;
function openDatabase() {
  if (!database) database = new Promise((resolve, reject) => {
    const request = indexedDB.open("e-step-admin-products", 1);
    request.onupgradeneeded = () => {
      const store = request.result.createObjectStore("products", { keyPath: "id" });
      initialProducts.forEach(product => store.add(product));
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => { database = undefined; reject(request.error); };
  });
  return database;
}
async function transaction(mode, action) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("products", mode);
    const request = action(tx.objectStore("products"));
    tx.oncomplete = () => resolve(request.result);
    tx.onabort = () => reject(tx.error || new Error("Could not save local product data."));
    tx.onerror = () => reject(tx.error || new Error("Could not access local product data."));
  });
}
const productService = {
  list: () => transaction("readonly", store => store.getAll()),
  async get(id) {
    const products = await this.list();
    const product = products.find(item => String(item.id) === String(id));
    if (!product) throw new Error("Product not found.");
    return product;
  },
  async create(values) {
    const products = await this.list();
    if (products.some(p => p.code?.toLowerCase() === values.code.toLowerCase())) throw new Error("This product code is already in use.");
    const product = { ...values, id: crypto.randomUUID(), createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) };
    await transaction("readwrite", store => store.add(product));
    return product;
  },
  async update(id, values) {
    const current = await this.get(id);
    const products = await this.list();
    if (products.some(p => p.id !== current.id && p.code?.toLowerCase() === values.code.toLowerCase())) throw new Error("This product code is already in use.");
    const product = { ...current, ...values, id: current.id };
    await transaction("readwrite", store => store.put(product));
    return product;
  },
  async remove(id) {
    const current = await this.get(id);
    await transaction("readwrite", store => store.delete(current.id));
  },
};
export default productService;
