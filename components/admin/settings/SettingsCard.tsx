interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsCard({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-8">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl font-bold text-yellow-500 sm:text-2xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-neutral-400 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}