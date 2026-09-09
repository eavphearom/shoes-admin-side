import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import googleIcon from "../../../assets/google.png";
import Button from "../../../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(form);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#03152B]">Welcome Back</h1>

        <p className="mt-2 text-sm text-[#64748B]">
          Sign in to continue to GPT-Shoes
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#03152B]">
            Email Address
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
              className="h-11 w-full rounded-lg border border-[#D7DFEA] bg-white pl-10 pr-3 text-sm text-[#03152B] outline-none transition placeholder:text-[#8A98AA] focus:border-[#2E7AF0] focus:ring-2 focus:ring-[#2E7AF0]/10"
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-[#D7DFEA] bg-white pl-10 pr-10 text-sm text-[#03152B] outline-none transition placeholder:text-[#8A98AA] focus:border-[#2E7AF0] focus:ring-2 focus:ring-[#2E7AF0]/10"
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
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-[#64748B]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#CBD5E1] text-[#2E7AF0]"
            />
            Remember me
          </label>

          <button
            type="button"
            className="font-semibold text-[#2E7AF0] hover:text-[#1F66D8]"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          loading={loading}
          className="h-11 w-full bg-[#03152B] hover:bg-[#10243C]"
        >
          Sign In
        </Button>
      </div>

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#E5EAF1]" />
        <span className="text-[11px] font-semibold uppercase text-[#64748B]">
          Or continue with
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
        Google
      </button>

      <p className="mt-7 text-center text-sm text-[#64748B]">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-[#2E7AF0] hover:text-[#1F66D8]"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}
