interface StatusSummaryItem {
  status: string;
  _count: number;
}

interface Props {
  loading: boolean;
  data: StatusSummaryItem[];
}

function getStatusColor(status: string) {
  switch (status) {
    case "PENDIENTE":
      return "bg-yellow-500";

    case "EN_REVISION":
      return "bg-blue-500";

    case "COTIZADO":
      return "bg-purple-500";

    case "CONFIRMADO":
      return "bg-green-500";

    case "ENVIADO":
      return "bg-cyan-500";

    case "ENTREGADO":
      return "bg-emerald-500";

    case "CANCELADO":
      return "bg-red-500";

    default:
      return "bg-neutral-500";
  }
}

export default function StatusSummary({
  loading,
  data,
}: Props) {
  const max =
    data.length > 0
      ? Math.max(...data.map((item) => item._count))
      : 1;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-8 text-2xl font-bold text-white">
        Estado de los Pedidos
      </h2>

      {loading ? (
        <p className="text-neutral-400">
          Cargando estadísticas...
        </p>
      ) : data.length === 0 ? (
        <p className="text-neutral-400">
          No hay información disponible.
        </p>
      ) : (
        <div className="space-y-6">

          {data.map((item) => (
            <div key={item.status}>

              <div className="mb-2 flex justify-between">

                <span className="font-medium text-white">
                  {item.status.replaceAll("_", " ")}
                </span>

                <span className="font-bold text-yellow-500">
                  {item._count}
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-neutral-800">

                <div
                  className={`${getStatusColor(
                    item.status
                  )} h-full rounded-full transition-all duration-500`}
                  style={{
                    width: `${(item._count / max) * 100}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}