import Image from "next/image";

const images = [
  "/images/gallery/galeria1.jpg",
  "/images/gallery/galeria2.jpg",
  "/images/gallery/galeria3.jpg",
  "/images/gallery/galeria4.jpg",
  "/images/gallery/galeria5.jpg",
  "/images/gallery/galeria6.jpg",
];

export default function Gallery() {
  return (
    <section
      id="galeria"
      className="bg-neutral-950 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="text-yellow-500 uppercase tracking-[6px]">
            Galería
          </span>

          <h2 className="mt-4 text-5xl font-bold">
            Conoce nuestra esencia
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-neutral-400 text-lg">
            Descubre el proceso, la pasión y la calidad que hacen únicos nuestros puros dominicanos.
          </p>

        </div>

        <div className="mt-16 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl"
            >
              <Image
                src={image}
                alt={`Galería ${index + 1}`}
                width={600}
                height={400}
                className="h-80 w-full object-cover transition duration-500 hover:scale-110"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}