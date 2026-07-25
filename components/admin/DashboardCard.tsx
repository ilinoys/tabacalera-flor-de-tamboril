import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
}

export default function DashboardCard({
  title,
  value,
  description,
  icon,
}: DashboardCardProps) {
  return (
    <div className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-all duration-300 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm uppercase tracking-wider text-neutral-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-yellow-500">
            {value}
          </h2>

          {description && (
            <p className="mt-3 text-sm text-neutral-500">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="rounded-xl bg-yellow-500/10 p-4 text-yellow-500 transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-black">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}