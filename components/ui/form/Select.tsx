interface SelectProps {
  label: string;
  options: string[];
}

export default function Select({
  label,
  options,
}: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-neutral-300">
        {label}
      </label>

      <select className="w-full rounded-xl border border-neutral-700 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-500">
        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}