
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Layout
import AdminLayout from "../components/layout/AdminLayout";

// import ProtectedRoute from "./ProtectedRoute";

// Lazy-loaded pages
const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const BannerPage = lazy(() => import("../pages/BannerPage"));
const BrandPage = lazy(() => import("../pages/BrandPage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const ColorPage = lazy(() => import("../pages/ColorPage"));
const CustomerPage = lazy(() => import("../pages/CustomerPage"));
const OrderPage = lazy(() => import("../pages/OrderPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const SizePage = lazy(() => import("../pages/SizePage"));
const UserRolePage = lazy(() => import("../pages/UserRolePage"));
const VariantPage = lazy(() => import("../pages/VariantPage"));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        {/* <Route element={<ProtectedRoute />}> */}
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />

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
    </Suspense>
  );
}