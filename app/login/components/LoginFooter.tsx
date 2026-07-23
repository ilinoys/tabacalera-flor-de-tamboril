export default function LoginFooter() {
  return (
    <footer className="mt-2 border-t border-white/10 pt-6 text-center">
      <p className="text-sm font-medium text-gray-300">
        Hand Made Cigars - Dominican Republic
      </p>

      <p className="mt-2 text-xs text-gray-500">
        Sistema ERP desarrollado para la gestion integral de la empresa.
      </p>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
        <span>{new Date().getFullYear()}</span>
        <span>-</span>
        <span>Tabacalera Flor de Tamboril</span>
      </div>

      <p className="mt-2 text-[11px] uppercase tracking-wider text-gray-700">
        Version 1.0.0
      </p>
    </footer>
  );
}
