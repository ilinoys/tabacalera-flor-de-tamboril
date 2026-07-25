import {
  Award,
  Leaf,
  ShieldCheck,
  Truck,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

const features = [
  {
    icon: Leaf,
    title: "Tabaco Dominicano",
    description:
      "Utilizamos hojas seleccionadas cultivadas en República Dominicana.",
  },
  {
    icon: Award,
    title: "Calidad Premium",
    description:
      "Cada puro pasa por un riguroso control de calidad.",
  },
  {
    icon: Truck,
    title: "Envíos Seguros",
    description:
      "Realizamos envíos nacionales e internacionales.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía",
    description:
      "Respaldamos cada producto con nuestro compromiso de calidad.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">

        <SectionTitle
          subtitle="¿Por qué elegirnos?"
          title="Comprometidos con la excelencia"
          description="La experiencia, la tradición y la calidad nos distinguen."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500"
              >
                <Icon
                  size={48}
                  className="text-yellow-500"
                />

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-neutral-400">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}