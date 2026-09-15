import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import googleIcon from "../../../assets/google.png";
import Button from "../../../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

function AuthInput({
  label,
  icon: Icon,
  type = "text",
  rightControl,
  className = "",
  ...props
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-[#07182E]">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
        />
        <input
          type={type}
          className={`h-12 w-full rounded-xl border border-[#D7DFEA] bg-[#FBFCFE] pl-11 pr-4 text-sm font-semibold text-[#07182E] outline-none transition placeholder:font-medium placeholder:text-[#94A3B8] focus:border-[#F97316] focus:bg-white focus:ring-4 focus:ring-[#F97316]/10 ${rightControl ? "pr-11" : ""} ${className}`}
          {...props}
        />
        {rightControl}
      </div>
    </div>
  );
}

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
    <div className="w-full max-w-md">

      <div className="mb-7 text-center">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#E96400]">
          Welcome Back
        </p>

        <h1 className="mt-4 text-3xl font-michroma font-bold text-[#07182E]">
          Sign in
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#64748B]">
          Continue to your Go Shoes account.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <button
        type="button"
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#D7DFEA] bg-white text-sm font-bold text-[#07182E] transition hover:border-[#F97316]/60 hover:bg-[#FFF7ED]"
      >
        <img
          src={googleIcon}
          alt=""
          className="h-5 w-5 cursor-pointer object-contain"
        />
        Continue with Google
      </button>

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#E5EAF1]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#94A3B8]">
          Or login with email
        </span>
        <div className="h-px flex-1 bg-[#E5EAF1]" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Email Address"
          icon={Mail}
          name="email"
          type="email"
          placeholder="hello@goshoes.com"
          value={form.email}
          onChange={handleChange}
        />

        <AuthInput
          label="Password"
          icon={LockKeyhole}
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          rightControl={
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#94A3B8] transition hover:text-[#07182E]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex cursor-pointer items-center gap-2 font-semibold text-[#64748B]">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded border-[#CBD5E1] text-[#F97316] focus:ring-[#F97316]"
            />
            Remember me
          </label>

          <button
            type="button"
            className="cursor-pointer font-bold text-[#E96400] transition hover:text-[#C95500]"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          loading={loading}
          className="h-12 w-full rounded-xl bg-[#E96400] text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(249,115,22,0.24)] hover:bg-[#C95500]"
        >
          Sign In
        </Button>
      </form>

     
    </div>
  );
}
