import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import googleIcon from "../../assets/google.png";
import AuthVisualPanel from "../../features/auth/components/AuthVisualPanel";
import Button from "../../components/ui/Button";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    window.setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1fr_1fr]">
      <AuthVisualPanel
        brand="SOLE_PRECISION"
        subtitle="Performance Studio"
        headline="Engineered for Performance."
        description="Build your product catalog, track categories, and manage every step of your footwear business."
      />

      <main className="flex min-h-screen items-center justify-center px-6 py-10">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-[#03152B]">
              Create Your Account
            </h1>
            <p className="mt-2 text-sm text-[#64748B]">
              Join SOLE_PRECISION and start shopping your favorite styles.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#03152B]">
                Username
              </label>
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-[#D7DFEA] bg-[#F7F9FC] px-3 text-sm text-[#03152B] outline-none transition placeholder:text-[#8A98AA] focus:border-[#2E7AF0] focus:bg-white focus:ring-2 focus:ring-[#2E7AF0]/10"
              />
            </div>

          </div>

          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#03152B]">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-[#D7DFEA] bg-[#F7F9FC] pl-10 pr-3 text-sm text-[#03152B] outline-none transition placeholder:text-[#8A98AA] focus:border-[#2E7AF0] focus:bg-white focus:ring-2 focus:ring-[#2E7AF0]/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#03152B]">
                Password
              </label>
              <div className="relative">
                <LockKeyhole
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-[#D7DFEA] bg-[#F7F9FC] pl-10 pr-10 text-sm text-[#03152B] outline-none transition placeholder:text-[#8A98AA] focus:border-[#2E7AF0] focus:bg-white focus:ring-2 focus:ring-[#2E7AF0]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] transition hover:text-[#03152B]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="mt-1 text-[11px] font-semibold text-[#475569]">
                Use at least 8 characters.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#03152B]">
                Confirm Password
              </label>
              <div className="relative">
                <LockKeyhole
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border border-[#D7DFEA] bg-[#F7F9FC] pl-10 pr-10 text-sm text-[#03152B] outline-none transition placeholder:text-[#8A98AA] focus:border-[#2E7AF0] focus:bg-white focus:ring-2 focus:ring-[#2E7AF0]/10"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] transition hover:text-[#03152B]"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs leading-5 text-[#64748B]">
              <input
                name="acceptedTerms"
                type="checkbox"
                checked={form.acceptedTerms}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-[#CBD5E1] text-[#2E7AF0]"
              />
              <span>
                I agree to the{" "}
                <button type="button" className="font-semibold text-[#2E7AF0]">
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button type="button" className="font-semibold text-[#2E7AF0]">
                  Privacy Policy
                </button>
                .
              </span>
            </label>

            <Button
              type="submit"
              loading={loading}
              disabled={!form.acceptedTerms}
              className="h-11 w-full bg-[#03152B] hover:bg-[#10243C]"
            >
              Create Account
            </Button>
          </div>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E5EAF1]" />
            <span className="text-[11px] font-semibold uppercase text-[#64748B]">
              Or
            </span>
            <div className="h-px flex-1 bg-[#E5EAF1]" />
          </div>

          <button
            type="button"
            className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#D7DFEA] bg-white text-sm font-semibold text-[#03152B] transition hover:bg-[#F7F9FC]"
          >
            <img
              src={googleIcon}
              alt=""
              className="h-5 w-5 cursor-pointer object-contain"
            />
            Continue with Google
          </button>

          <p className="mt-7 text-center text-sm text-[#64748B]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#2E7AF0] hover:text-[#1F66D8]"
            >
              Sign in
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
