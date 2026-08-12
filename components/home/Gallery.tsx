import { readdir, stat } from "node:fs/promises";
import path from "node:path";

import Image from "next/image";
import { connection } from "next/server";

const galleryDirectory = path.join(
  process.cwd(),
  "public",
  "images",
  "gallery"
);
const supportedExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
]);

interface GalleryImage {
  src: string;
  version: number;
}

async function getGalleryImages() {
  const files = await readdir(galleryDirectory);
  const imageFiles = files
    .filter((file) =>
      supportedExtensions.has(path.extname(file).toLowerCase())
    )
    .sort((first, second) =>
      first.localeCompare(second, "es", {
        numeric: true,
        sensitivity: "base",
      })
    );

  return Promise.all(
    imageFiles.map(async (file) => {
      const fileStats = await stat(
        path.join(galleryDirectory, file)
      );

      return {
        src: `/images/gallery/${file}`,
        version: Math.trunc(fileStats.mtimeMs),
      };
    })
  );
}

function getImageSrc(image: GalleryImage) {
  return `${image.src}?v=${image.version}`;
}

export default async function Gallery() {
  await connection();

  const images = await getGalleryImages();

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
            <div key={image.src} className="overflow-hidden rounded-2xl bg-black">
              <Image
                src={getImageSrc(image)}
                alt={`Galería ${index + 1}`}
                width={600}
                height={400}
                className="h-56 w-full object-contain transition duration-500 sm:h-64 lg:h-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
