interface Props {
  total: number;
  particulares: number;
  distribuidores: number;
  mayoristas: number;
}

export default function CustomerStats({
  total,
 particulares,
 distribuidores,
 mayoristas,
}: Props) {
  const cards = [
    {
      title: "Total Clientes",
      value: total,
    },
    {
      title: "Particulares",
      value: particulares,
    },
    {
      title: "Distribuidores",
      value: distribuidores,
    },
    {
      title: "Mayoristas",
      value: mayoristas,
    },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
        >
          <p className="text-sm text-neutral-400">
            {card.title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}