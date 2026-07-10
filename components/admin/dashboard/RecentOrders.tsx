interface RecentOrder {
  id: string;
  customerName: string;
  status: string;
  createdAt: string;
}

interface Props {
  loading: boolean;
  orders: RecentOrder[];
}

function getStatusColor(status: string) {
  switch (status) {
    case "PENDIENTE":
      return "bg-yellow-600";
    case "EN_REVISION":
      return "bg-blue-600";
    case "COTIZADO":
      return "bg-purple-600";
    case "CONFIRMADO":
      return "bg-green-600";
    case "ENVIADO":
      return "bg-cyan-600";
    case "ENTREGADO":
      return "bg-emerald-600";
    case "CANCELADO":
      return "bg-red-600";
    default:
      return "bg-neutral-600";
  }
}

export default function RecentOrders({
  loading,
  orders,
}: Props) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Últimos Pedidos
      </h2>

      {loading ? (
        <p className="text-neutral-400">
          Cargando pedidos...
        </p>
      ) : orders.length === 0 ? (
        <p className="text-neutral-400">
          No hay pedidos registrados.
        </p>
      ) : (
        <div className="space-y-4">

          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-xl border border-neutral-800 bg-black p-4 transition hover:border-yellow-600"
            >
              <div>

                <p className="font-semibold text-white">
                  {order.customerName}
                </p>

                <p className="text-sm text-neutral-400">
                  {new Date(order.createdAt).toLocaleString()}
                </p>

              </div>

              <span
                className={`rounded-full px-4 py-1 text-sm font-bold text-white ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status.replaceAll("_", " ")}
              </span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}