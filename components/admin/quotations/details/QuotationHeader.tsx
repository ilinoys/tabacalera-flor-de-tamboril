import Image from "next/image";

interface Props {
  quotationNumber: string;
  createdAt: string;
  status: string;
}

export default function QuotationHeader({
  quotationNumber,
  createdAt,
  status,
}: Props) {
  return (
    <div className="mb-10 rounded-2xl border border-neutral-800 bg-neutral-900 p-8">

      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

        <div className="flex items-center gap-6">

          <Image
            src="/images/logo/logo.png"
            alt="Flor de Tamboril"
            width={90}
            height={90}
            priority
          />

          <div>

            <h1 className="text-4xl font-bold text-yellow-500">
              FLOR DE TAMBORIL
            </h1>

            <p className="mt-2 text-neutral-400">
              Dominican Premium Cigars
            </p>

            <p className="mt-4 text-sm text-neutral-500">
              Premium Handmade Cigars
            </p>

          </div>

        </div>

        <div className="text-right">

          <p className="text-neutral-500">
            Número de Cotización
          </p>

          <h2 className="text-3xl font-bold text-white">
            {quotationNumber}
          </h2>

          <p className="mt-3 text-neutral-400">
            {new Date(createdAt).toLocaleDateString()}
          </p>

          <span className="mt-5 inline-block rounded-full bg-yellow-600 px-5 py-2 font-bold text-white">
            {status}
          </span>

        </div>

      </div>

    </div>
  );
}