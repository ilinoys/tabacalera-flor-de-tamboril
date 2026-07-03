export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-10 py-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-neutral-400">
          Bienvenido al panel administrativo.
        </p>
      </div>

      <div className="rounded-full bg-yellow-500 px-5 py-2 font-bold text-black">
        Administrador
      </div>

    </header>
  );
}