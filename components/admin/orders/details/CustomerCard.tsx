interface Props {
  customerName: string;
  company?: string | null;
  email: string;
  phone: string;
  country: string;
  city: string;
  customerType: string;
}

export default function CustomerCard({
  customerName,
  company,
  email,
  phone,
  country,
  city,
  customerType,
}: Props) {
  return (
    <div className="mb-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Información del Cliente
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="space-y-3">

          <p className="text-white">
            <strong>Cliente:</strong> {customerName}
          </p>

          <p className="text-white">
            <strong>Empresa:</strong> {company || "-"}
          </p>

          <p className="text-white">
            <strong>Correo:</strong> {email}
          </p>

          <p className="text-white">
            <strong>Teléfono:</strong> {phone}
          </p>

        </div>

        <div className="space-y-3">

          <p className="text-white">
            <strong>País:</strong> {country}
          </p>

          <p className="text-white">
            <strong>Ciudad:</strong> {city}
          </p>

          <p className="text-white">
            <strong>Tipo:</strong> {customerType}
          </p>

        </div>

      </div>

    </div>
  );
}