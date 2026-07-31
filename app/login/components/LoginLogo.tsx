import Image from "next/image";

export default function LoginLogo() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6">
        <Image
          src="/images/logo/logo.png"
          alt="Flor de Tamboril"
          width={130}
          height={130}
          priority
          className="mx-auto select-none"
        />
      </div>

      <span className="mb-3 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
        ERP Empresarial
      </span>

      <h1 className="text-3xl font-bold tracking-tight text-white">
        Flor de Tamboril
      </h1>

      <p className="mt-1 text-lg font-medium text-[#D4AF37]">
        Sistema Integral de Gestion
      </p>

      <p className="mt-3 max-w-xs text-sm leading-6 text-gray-400">
        Administra clientes, inventario, produccion, ventas y operaciones desde
        una sola plataforma.
      </p>
    </div>
  );
}
