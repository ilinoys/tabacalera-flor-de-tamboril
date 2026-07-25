interface Props {
  saving: boolean;
  onClick: () => void;
}

export default function SaveQuotationButton({
  saving,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="mt-6 w-full rounded-xl bg-yellow-600 py-4 font-bold text-white transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {saving ? "Guardando..." : "Guardar Cotización"}
    </button>
  );
}