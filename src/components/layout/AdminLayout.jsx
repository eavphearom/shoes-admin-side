import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-[#03152B]">
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div
        className={`flex min-w-0 flex-1 flex-col transition-all duration-200 ${
          isSidebarCollapsed ? "lg:pl-0" : "lg:pl-[240px]"
        }`}
      >
        <Navbar
          isSidebarCollapsed={isSidebarCollapsed}
          onMenuClick={() => setIsSidebarOpen(true)}
          onSidebarToggle={() =>
            setIsSidebarCollapsed((currentValue) => !currentValue)
          }
        />

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
