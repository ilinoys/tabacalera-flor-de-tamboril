interface SectionTitleProps {
  subtitle: string;
  title: string;
  description?: string;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      <span className="text-sm font-semibold uppercase tracking-[8px] text-yellow-500">
        {subtitle}
      </span>

      <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-neutral-400">
          {description}
        </p>
      )}
    </div>
  );
}