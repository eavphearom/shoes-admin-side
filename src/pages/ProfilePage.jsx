import {
  CalendarDays,
  Camera,
  Eye,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();
  const displayName = user?.name || "Admin User";
  const email = user?.email || "admin@gptshoes.com";

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs text-[#64748B]">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-semibold text-[#03152B]">My Profile</span>
        </div>

        <h1 className="text-[28px] font-bold tracking-tight text-[#03152B]">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-[#64748B]">
          Manage your personal information and account security.
        </p>
      </div>

      <section className="rounded-lg border border-[#D7DFEA] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#FFF7ED] text-2xl font-bold text-[#F97316] ring-4 ring-[#F1F5F9]">
                {displayName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#D7DFEA] bg-white text-[#03152B] shadow-sm transition hover:bg-[#F7F9FC]"
                aria-label="Change profile photo"
              >
                <Camera size={15} />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#03152B]">
                {displayName}
              </h2>
              <p className="text-sm text-[#64748B]">{email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-md bg-[#FFF7ED] px-2 py-1 text-xs font-semibold text-[#F97316]">
                  Super Admin
                </span>
                <span className="rounded-md bg-[#DCFCE7] px-2 py-1 text-xs font-semibold text-[#15803D]">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
              Member Since
            </p>
            <p className="mt-1 text-sm font-semibold text-[#03152B]">
              Aug 2026
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <section className="rounded-lg border border-[#D7DFEA] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#F97316]" />
              <h2 className="text-lg font-bold text-[#03152B]">
                Account Information
              </h2>
            </div>

            <dl className="space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-[#EEF2F7] pb-3">
                <dt className="text-[#64748B]">Role</dt>
                <dd className="font-semibold text-[#03152B]">Super Admin</dd>
              </div>
              <div className="flex items-center justify-between border-b border-[#EEF2F7] pb-3">
                <dt className="text-[#64748B]">Status</dt>
                <dd className="font-semibold text-[#15803D]">Active</dd>
              </div>
              <div className="flex items-center justify-between border-b border-[#EEF2F7] pb-3">
                <dt className="text-[#64748B]">Created Date</dt>
                <dd className="font-semibold text-[#03152B]">Aug 12, 2026</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[#64748B]">Last Login</dt>
                <dd className="font-semibold text-[#03152B]">Aug 25, 2026</dd>
              </div>
            </dl>
          </section>

          {/* <section className="rounded-lg bg-[#1E2B3F] p-5 text-white shadow-sm">
            <p className="text-sm font-semibold">Security Score</p>
            <p className="mt-1 text-xs text-[#8FA2BD]">
              Your account has strong protection enabled.
            </p>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 w-[86%] rounded-full bg-[#F97316]" />
            </div>
          </section> */}
        </aside>

        <div className="space-y-5">
          <section className="rounded-lg border border-[#D7DFEA] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2 border-b border-[#EEF2F7] pb-4">
              <User size={18} className="text-[#F97316]" />
              <h2 className="text-lg font-bold text-[#03152B]">
                Personal Information
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First Name" value="Admin" />
              <Field label="Last Name" value="User" />
              <Field label="Username" value="admin_master" />
              <Field
                label="Phone Number"
                value="+1 (555) 123-4567"
                icon={Phone}
              />
              <Field
                label="Email Address"
                value={email}
                icon={Mail}
                className="sm:col-span-2"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-[#EEF2F7] pt-5">
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-[#03152B] transition hover:bg-[#F1F5F9]"
              >
                Cancel
              </button>
              <Button className="gap-2 bg-[#03152B] hover:bg-[#10243C]">
                <CalendarDays size={15} />
                Save Changes
              </Button>
            </div>
          </section>

          <section className="rounded-lg border border-[#D7DFEA] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2 border-b border-[#EEF2F7] pb-4">
              <LockKeyhole size={18} className="text-red-500" />
              <h2 className="text-lg font-bold text-[#03152B]">Security</h2>
            </div>

            <h3 className="mb-4 text-sm font-bold text-[#03152B]">
              Change Password
            </h3>

            <div className="space-y-4">
              <PasswordField label="Current Password" value="••••••••" />
              <div className="grid gap-4 sm:grid-cols-2">
                <PasswordField label="New Password" value="" />
                <PasswordField label="Confirm Password" value="" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, icon: Icon, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold text-[#03152B]">
        {label}
      </span>
      <span className="relative block">
        {Icon && (
          <Icon
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
        )}
        <input
          value={value}
          readOnly
          className={`h-10 w-full rounded-lg border border-[#D7DFEA] bg-[#F7F9FC] px-3 text-sm text-[#03152B] outline-none transition focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-[#F97316]/10 ${
            Icon ? "pl-9" : ""
          }`}
        />
      </span>
    </label>
  );
}

function PasswordField({ label, value }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-[#03152B]">
        {label}
      </span>
      <span className="relative block">
        <input
          type="password"
          value={value}
          readOnly
          placeholder="Enter password"
          className="h-10 w-full rounded-lg border border-[#D7DFEA] bg-[#F7F9FC] px-3 pr-9 text-sm text-[#03152B] outline-none transition placeholder:text-[#8A98AA] focus:border-[#F97316] focus:bg-white focus:ring-2 focus:ring-[#F97316]/10"
        />
        <Eye
          size={15}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
        />
      </span>
    </label>
  );
}
