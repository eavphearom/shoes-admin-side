import { Bell, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function Navbar({
  isSidebarCollapsed = false,
  onMenuClick,
  onSidebarToggle,
}) {
  const { user } = useAuth();
  const displayName = user?.name || "Admin User";
  const [currentTime, setCurrentTime] = useState(new Date());

  const initials = useMemo(() => {
    return displayName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [displayName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white px-4 sm:px-6">
      <div className="flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg border border-[#D7DFEA] p-2 text-[#64748B] lg:hidden"
            aria-label="Open sidebar"
          >
            <PanelLeftOpen size={20} />
          </button>

          <button
            type="button"
            onClick={onSidebarToggle}
            className="hidden rounded-lg border border-[#D7DFEA] p-2 text-[#64748B] transition hover:bg-[#F1F5F9] hover:text-[#03152B] lg:inline-flex"
            aria-label={isSidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
            title={isSidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>

          {/* <label className="relative hidden w-72 sm:block lg:w-96">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A98AA]"
            />
            <input
              type="search"
              placeholder="Search"
              className="h-9 w-full rounded-lg border border-[#D7DFEA] bg-[#F7F9FC] pl-9 pr-3 text-sm text-[#03152B] outline-none transition placeholder:text-[#8A98AA] focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-[#F97316]/10"
            />
          </label> */}
        </div>

        <div className="flex items-center cursor-pointer gap-4">
          <div className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-[#03152B] sm:block">
            {formattedTime}
          </div>

          <button
            type="button"
            className="relative rounded-lg p-2 text-[#475569] transition cursor-pointer hover:bg-[#F1F5F9]"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D92525]" />
          </button>

          <Link
            to="/profile"
            className="flex items-center gap-3 rounded-lg p-1 transition hover:bg-[#F1F5F9]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF7ED] text-xs font-bold text-[#F97316] ring-1 ring-[#FED7AA]">
              {initials}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-[#03152B]">
                {displayName}
              </p>
              <p className="text-[11px] text-[#64748B]">Superadmin</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
