import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

// Layout
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../features/auth/hooks/useAuth";
import Loading from "../components/ui/Loading";

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
const ProductCreatePage = lazy(() => import("../pages/ProductCreatePage"));
const ProductEditPage = lazy(() => import("../pages/ProductEditPage"));
const SizePage = lazy(() => import("../pages/SizePage"));
const UserRolePage = lazy(() => import("../pages/UserRolePage"));
const VariantPage = lazy(() => import("../pages/VariantPage"));
function PageSuspense() {
  return (
    <Suspense fallback={<Loading overlay />}>
      <Outlet />
    </Suspense>
  );
}
export default function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/login"
        element={
          user?.role === "ADMIN" ? <Navigate to="/" replace /> : <LoginPage />
        }
      />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route element={<PageSuspense />}>
            <Route index element={<DashboardPage />} />
            <Route path="/banner" element={<BannerPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/color" element={<ColorPage />} />
            <Route path="/size" element={<SizePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/create" element={<ProductCreatePage />} />
            <Route path="/products/:id/edit" element={<ProductEditPage />} />
            <Route path="/variants" element={<VariantPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/user-role" element={<UserRolePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Route>

      {/* Not Found */}
      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
