import {
  Building2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contacto"
      className="bg-neutral-950 py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-16">
          <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow-500 sm:px-4 sm:text-sm">
            Contacto
          </span>

          <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
            Hablemos de negocios
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-400 sm:mt-5 sm:text-lg">
            Estamos preparados para atender distribuidores,
            importadores y clientes de todo el mundo.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-5 sm:p-8">
            <h3 className="mb-6 text-xl font-bold text-yellow-500 sm:mb-8 sm:text-2xl">
              Información de contacto
            </h3>

            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <MapPin className="mt-1 h-5 w-5 text-yellow-500 sm:h-6 sm:w-6" />

                <div>
                  <h4 className="font-semibold">Dirección</h4>

                  <p className="text-sm text-neutral-400 sm:text-base">
                    Tamboril, Santiago
                    <br />
                    República Dominicana
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <Phone className="mt-1 h-5 w-5 text-yellow-500 sm:h-6 sm:w-6" />

                <div>
                  <h4 className="font-semibold">Teléfono</h4>

                  <p className="text-sm text-neutral-400 sm:text-base">
                    (809) 570-9860
                  </p>

                  <p className="text-sm text-neutral-400 sm:text-base">
                    (829) 898-6214
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <Mail className="mt-1 h-5 w-5 text-yellow-500 sm:h-6 sm:w-6" />

                <div>
                  <h4 className="font-semibold">Correo</h4>

                  <p className="text-sm text-neutral-400 sm:text-base">
                    info@flordetamboril.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <Clock3 className="mt-1 h-5 w-5 text-yellow-500 sm:h-6 sm:w-6" />

                <div>
                  <h4 className="font-semibold">Horario</h4>

                  <p className="text-sm text-neutral-400 sm:text-base">
                    Lunes - Viernes
                    <br />
                    8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <Building2 className="mt-1 h-5 w-5 text-yellow-500 sm:h-6 sm:w-6" />

                <div>
                  <h4 className="font-semibold">Exportaciones</h4>

                  <p className="text-sm text-neutral-400 sm:text-base">
                    Atendemos distribuidores e importadores
                    internacionales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-5 sm:p-8">
            <h3 className="mb-6 text-xl font-bold text-yellow-500 sm:mb-8 sm:text-2xl">
              Envíanos un mensaje
            </h3>

            <form className="space-y-4 sm:space-y-5">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />

              <input
                type="text"
                placeholder="Empresa"
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />

              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />

              <input
                type="text"
                placeholder="País"
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />

              <textarea
                rows={5}
                placeholder="Escribe tu mensaje..."
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500 sm:rows-6"
              />

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-yellow-500 py-3.5 font-semibold text-black transition hover:bg-yellow-400 sm:py-4"
              >
                <Send size={18} />
                Enviar consulta
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}