interface Props {
  customerName: string;
  company?: string | null;
  email: string;
  phone: string;
  country: string;
  city: string;
}

export default function CustomerCard({
  customerName,
  company,
  email,
  phone,
  country,
  city,
}: Props) {
  return (
    <div className="mb-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <h3 className="mb-6 text-2xl font-bold text-yellow-500">
        Información del Cliente
      </h3>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <p className="text-sm text-neutral-500">
            Nombre
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {customerName}
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-500">
            Empresa
          </p>

          <p className="mt-1 text-lg text-white">
            {company || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-500">
            Correo
          </p>

          <p className="mt-1 text-lg text-white">
            {email}
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-500">
            WhatsApp
          </p>

          <p className="mt-1 text-lg text-white">
            {phone}
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-500">
            País
          </p>

          <p className="mt-1 text-lg text-white">
            {country}
          </p>
        </div>

        <div>
          <p className="text-sm text-neutral-500">
            Ciudad
          </p>

          <p className="mt-1 text-lg text-white">
            {city}
          </p>
        </div>

      </div>

    </div>
  );
}