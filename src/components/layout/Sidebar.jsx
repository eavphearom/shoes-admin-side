import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r p-4">
      <h1 className="mb-6 text-xl font-bold">
        Admin
      </h1>

      <nav>
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 rounded-lg px-3 py-2"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
      </nav>
    </aside>
  );
}