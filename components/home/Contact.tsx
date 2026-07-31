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
      className="bg-neutral-950 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
            Contacto
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Hablemos de negocios
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-400">
            Estamos preparados para atender distribuidores,
            importadores y clientes de todo el mundo.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Información */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">
            <h3 className="mb-8 text-2xl font-bold text-yellow-500">
              Información de contacto
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-yellow-500" />

                <div>
                  <h4 className="font-semibold">
                    Dirección
                  </h4>

                  <p className="text-neutral-400">
                    Tamboril, Santiago
                    <br />
                    República Dominicana
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-1 text-yellow-500" />

                <div>
                  <h4 className="font-semibold">
                    Teléfono
                  </h4>

                  <p className="text-neutral-400">
                    (809) 570-9860
                  </p>

                  <p className="text-neutral-400">
                    (829) 898-6214
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="mt-1 text-yellow-500" />

                <div>
                  <h4 className="font-semibold">
                    Correo
                  </h4>

                  <p className="text-neutral-400">
                    info@flordetamboril.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock3 className="mt-1 text-yellow-500" />

                <div>
                  <h4 className="font-semibold">
                    Horario
                  </h4>

                  <p className="text-neutral-400">
                    Lunes - Viernes
                    <br />
                    8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Building2 className="mt-1 text-yellow-500" />

                <div>
                  <h4 className="font-semibold">
                    Exportaciones
                  </h4>

                  <p className="text-neutral-400">
                    Atendemos distribuidores e importadores
                    internacionales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">
            <h3 className="mb-8 text-2xl font-bold text-yellow-500">
              Envíanos un mensaje
            </h3>

            <form className="space-y-5">
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
                rows={6}
                placeholder="Escribe tu mensaje..."
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
              />

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-yellow-500 py-4 font-semibold text-black transition hover:bg-yellow-400"
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