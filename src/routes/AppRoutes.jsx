import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
// import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/Auth/LoginPage";
import AdminLayout from "../components/layout/AdminLayout";
import BannerPage from "../pages/BannerPage";
import BrandPage from "../pages/BrandPage";
import CategoryPage from "../pages/CategoryPage";
import ColorPage from "../pages/ColorPage";
import CustomerPage from "../pages/CustomerPage";
import OrderPage from "../pages/OrderPage";
import ProfilePage from "../pages/ProfilePage";
import ProductPage from "../pages/ProductPage";
import SizePage from "../pages/SizePage";
import UserRolePage from "../pages/UserRolePage";
import VariantPage from "../pages/VariantPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected */}
      {/* <Route element={<ProtectedRoute />}> */}
      <Route element={<AdminLayout />}>
        <Route index="/" element={<DashboardPage />} />
        <Route path="/banner" element={<BannerPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/color" element={<ColorPage />} />
        <Route path="/size" element={<SizePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/variants" element={<VariantPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/user-role" element={<UserRolePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      {/* </Route> */}

      {/* Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
