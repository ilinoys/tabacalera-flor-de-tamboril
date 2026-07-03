interface DashboardCardProps {
  title: string;
  value: string;
}

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">

      <p className="text-neutral-400">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-yellow-500">
        {value}
      </h2>

    </div>
  );
}