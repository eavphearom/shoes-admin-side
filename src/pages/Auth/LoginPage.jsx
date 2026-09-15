import LoginForm from "../../features/auth/components/LoginForm";
import AuthVisualPanel from "../../features/auth/components/AuthVisualPanel";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F4EF] px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#FFE0C8]" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-[#E96400]/10" />

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
        <AuthVisualPanel
          variant="card"
          subtitle="Go Shoes"
          headline="Step back into your style."
          description="Sign in to save favorites, track orders, and keep checkout quick for your next pair."
        />

        <div className="flex min-h-[620px] items-center justify-center p-6 sm:p-8 lg:p-10">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
