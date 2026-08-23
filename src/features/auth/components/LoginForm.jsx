import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
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

      navigate("/dashboard");
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
      className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow"
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl text-info">Login</h1>

        <p className="mt-1 text-sm text-gray-500">Sign in to continue</p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleChange}
      />

      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={form.password}
        onChange={handleChange}
      />

      <Button type="submit" loading={loading} className="w-full">
        Login
      </Button>
    </form>
  );
}
