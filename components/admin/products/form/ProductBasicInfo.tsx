import TextInput from "@/components/ui/form/TextInput";
import TextArea from "@/components/ui/form/TextArea";
import Select from "@/components/ui/form/Select";

export default function ProductBasicInfo() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Información General
      </h2>

      <div className="grid gap-6">
        <TextInput
          label="Nombre del producto"
          placeholder="Ej. Flor de Tamboril Robusto"
        />

        <TextArea
          label="Descripción"
          placeholder="Describe el producto..."
        />

        <Select
          label="Categoría"
          options={[
            "Premium",
            "Clásica",
            "Edición Especial",
          ]}
        />
      </div>
    </>
  );
}