import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Badge,
  LayoutDashboard,
  LogOut,
  Package,
  Palette,
  Ruler,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Tags,
  Users,
  X,
} from "lucide-react";
import BrandLogo from "../ui/BrandLogo";
import { useState } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
const menuItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Banner", to: "/banner", icon: Tags },
  { label: "Category", to: "/category", icon: Tags },
  { label: "Brand", to: "/brand", icon: Badge },
  { label: "Color", to: "/color", icon: Palette },
  { label: "Size", to: "/size", icon: Ruler },
  { label: "Products", to: "/products", icon: Package },
  { label: "Orders", to: "/orders", icon: ShoppingBag },
  { label: "Customers", to: "/customers", icon: Users },
  { label: "User & Role", to: "/user-role", icon: ShieldCheck },
  { label: "Reports", to: "/reports", icon: BarChart3 },
];

export default function Sidebar({
  isOpen = false,
  isCollapsed = false,
  onClose,
}) {
  const navigate = useNavigate();
  const [logOut, setLogOut] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    if (logOut) return;
    setLogOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      onClose?.();
      navigate("/login", { replace: true });
      setLogOut(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#03152B]/50 transition lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col bg-[#1E2B3F] text-white shadow-xl transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "lg:-translate-x-full" : "lg:translate-x-0"}`}
      >
        <div className="relative flex h-[76px] items-center justify-center px-5">
          <BrandLogo size="md" shoesClassName="text-white" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 rounded-lg p-2 text-[#8FA2BD] hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium transition ${
                    isActive
                      ? "bg-[#F97316] text-white shadow-sm"
                      : "text-[#8FA2BD] hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/5 p-3">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium transition ${
                isActive
                  ? "bg-[#F97316] text-white"
                  : "text-[#8FA2BD] hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Settings size={17} />
            Settings
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            disabled={logOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-md font-medium text-[#ffffff] transition cursor-pointer bg-[#fa7110] hover:bg-[#d75f09] "
          >
            <LogOut size={17} />
            {logOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}
