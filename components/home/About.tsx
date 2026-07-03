import Image from "next/image";

export default function About() {
  return (
    <section
      id="historia"
      className="bg-neutral-950 py-24 text-white"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">

        {/* Imagen */}
        <div>
          <Image
            src="/images/about/fabrica.jpg"
            alt="Tabacalera Flor De Tamboril"
            width={700}
            height={500}
            className="rounded-2xl shadow-2xl object-cover"
          />
        </div>

        {/* Texto */}
        <div>

          <span className="text-yellow-500 uppercase tracking-[6px]">
            Nuestra Historia
          </span>

          <h2 className="mt-4 text-5xl font-bold">
            Tradición que se convierte en excelencia
          </h2>

          <p className="mt-8 text-lg leading-9 text-neutral-300">
            En Tabacalera Flor De Tamboril nos dedicamos a elaborar puros
            dominicanos utilizando hojas cuidadosamente seleccionadas y
            procesos artesanales que respetan la tradición tabacalera de
            Tamboril, reconocido mundialmente como la capital del cigarro
            premium.
          </p>

          <p className="mt-6 text-lg leading-9 text-neutral-300">
            Cada puro representa nuestra pasión por la calidad, ofreciendo una
            experiencia única para quienes disfrutan del auténtico tabaco
            dominicano.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-8">

            <div>
              <h3 className="text-4xl font-bold text-yellow-500">
                100%
              </h3>

              <p className="mt-2 text-neutral-400">
                Tabaco Dominicano
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-yellow-500">
                Premium
              </h3>

              <p className="mt-2 text-neutral-400">
                Calidad Garantizada
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-yellow-500">
                Artesanal
              </h3>

              <p className="mt-2 text-neutral-400">
                Elaboración Manual
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}