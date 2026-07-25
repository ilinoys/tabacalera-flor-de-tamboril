import LoginLogo from "./LoginLogo";
import LoginForm from "./LoginForm";
import LoginFooter from "./LoginFooter";

export default function LoginCard() {
  return (
    <section
      className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-[#171717]/90
        backdrop-blur-md
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        px-8
        py-10
        transition-all
        duration-300
      "
    >
      <LoginLogo />

      <div className="mt-10">
        <LoginForm />
      </div>

      <div className="mt-10">
        <LoginFooter />
      </div>
    </section>
  );
}