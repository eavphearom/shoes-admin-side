import LoginForm from "../features/auth/components/LoginForm";
import AuthVisualPanel from "../features/auth/components/AuthVisualPanel";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1fr_1fr]">
      <AuthVisualPanel />

      <main className="flex min-h-screen items-center justify-center px-6 py-10">
        <LoginForm />
      </main>
    </div>
  );
}
