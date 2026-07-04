interface TextAreaProps {
  label: string;
  placeholder?: string;
}

export default function TextArea({
  label,
  placeholder,
}: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-neutral-300">
        {label}
      </label>

      <textarea
        rows={6}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-700 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-500"
      />
    </div>
  );
}