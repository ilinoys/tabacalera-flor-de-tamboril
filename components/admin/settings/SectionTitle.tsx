interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-10">

      <h1 className="text-4xl font-bold text-white">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-3 max-w-3xl text-neutral-400">
          {subtitle}
        </p>
      )}

    </div>
  );
}