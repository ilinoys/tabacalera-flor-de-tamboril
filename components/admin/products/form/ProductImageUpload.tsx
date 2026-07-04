export default function ProductImageUpload() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Imágenes
      </h2>

      <div className="flex h-64 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-neutral-700 bg-black transition hover:border-yellow-500">

        <div className="text-center">

          <p className="text-lg font-semibold text-white">
            Arrastra las imágenes aquí
          </p>

          <p className="mt-2 text-neutral-400">
            o haz clic para seleccionarlas
          </p>

        </div>

      </div>
    </>
  );
}