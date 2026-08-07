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
      className="bg-neutral-950 py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[4px] text-yellow-500 sm:text-sm md:tracking-[6px]">
            Galería
          </span>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Conoce nuestra esencia
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base text-neutral-400 sm:mt-6 sm:text-lg">
            Descubre el proceso, la pasión y la calidad que hacen únicos nuestros puros dominicanos.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-2xl">
              <Image
                src={image}
                alt={`Galería ${index + 1}`}
                width={600}
                height={400}
                className="h-56 w-full object-cover transition duration-500 hover:scale-110 sm:h-64 lg:h-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}