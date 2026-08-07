"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CustomerSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-6 sm:mb-8">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar cliente por nombre, empresa, correo o país..."
        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3 text-sm text-white placeholder:text-neutral-500 focus:border-yellow-500 focus:outline-none sm:p-4 sm:text-base"
      />
    </div>
  );
}