import Image from "next/image";

export default function About() {
  return (
    <section
      id="historia"
      className="bg-neutral-950 py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <Image
            src="/images/about/fabrica.jpg"
            alt="Tabacalera Flor De Tamboril"
            width={700}
            height={500}
            className="h-64 w-full rounded-2xl object-cover shadow-2xl sm:h-[420px]"
          />
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-xs uppercase tracking-[4px] text-yellow-500 sm:text-sm md:tracking-[6px]">
            Nuestra Historia
          </span>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Tradición que se convierte en excelencia
          </h2>

          <p className="mt-6 text-base leading-7 text-neutral-300 sm:mt-8 sm:text-lg sm:leading-8 lg:leading-9">
            En Tabacalera Flor De Tamboril nos dedicamos a elaborar puros
            dominicanos utilizando hojas cuidadosamente seleccionadas y
            procesos artesanales que respetan la tradición tabacalera de
            Tamboril, reconocido mundialmente como la capital del cigarro
            premium.
          </p>

          <p className="mt-5 text-base leading-7 text-neutral-300 sm:text-lg sm:leading-8 lg:leading-9">
            Cada puro representa nuestra pasión por la calidad, ofreciendo una
            experiencia única para quienes disfrutan del auténtico tabaco
            dominicano.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4 lg:mt-10 lg:gap-8">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-yellow-500 sm:text-2xl lg:text-3xl">
                100%
              </h3>

              <p className="mt-2 break-words text-[10px] text-neutral-400 sm:text-xs lg:text-sm">
                Tabaco Dominicano
              </p>
            </div>

            <div className="min-w-0">
              <h3 className="text-xl font-bold text-yellow-500 sm:text-2xl lg:text-3xl">
                Premium
              </h3>

              <p className="mt-2 break-words text-[10px] text-neutral-400 sm:text-xs lg:text-sm">
                Calidad Garantizada
              </p>
            </div>

            <div className="min-w-0">
              <h3 className="text-xl font-bold text-yellow-500 sm:text-2xl lg:text-3xl">
                Artesanal
              </h3>

              <p className="mt-2 break-words text-[10px] text-neutral-400 sm:text-xs lg:text-sm">
                Elaboración Manual
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}