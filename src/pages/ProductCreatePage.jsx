import { useNavigate } from "react-router-dom";
import ProductForm from "../features/products/components/ProductForm";
import productService from "../features/products/services/productService";

export default function ProductCreatePage() {
  const navigate = useNavigate();
  async function create(values) {
    await productService.create(values);
    navigate("/products", { state: { notice: "Product saved in this browser. Server publishing is not connected yet." } });
  }
  return <ProductForm onSubmit={create} onCancel={() => navigate("/products")} />;
}
