import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "../features/products/components/ProductForm";
import productService from "../features/products/services/productService";

export default function ProductEditPage() {
  const { id } = useParams();
  return <ProductEditor key={id} id={id} />;
}
function ProductEditor({ id }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    productService.get(id).then(data => { if (!cancelled) setProduct(data); })
      .catch(error => { if (!cancelled) setError(error.message); });
    return () => { cancelled = true; };
  }, [id]);
  async function update(values) {
    await productService.update(id, values);
    navigate("/products", { state: { notice: "Product updated in this browser. Server publishing is not connected yet." } });
  }
  if (error) return <div role="alert" className="space-y-3 rounded-lg border border-red-200 bg-white p-6 text-sm"><p>{error}</p><Link to="/products" className="text-[#267BFA]">Back to Products</Link></div>;
  if (!product) return <p role="status" className="p-6 text-sm text-[#64748B]">Loading product...</p>;
  return <ProductForm product={product} onSubmit={update} onCancel={() => navigate("/products")} />;
}
