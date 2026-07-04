import TextInput from "@/components/ui/form/TextInput";

export default function ProductPricing() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Precio
      </h2>

      <div className="grid gap-6">

        <TextInput
          label="Precio (USD)"
          placeholder="12.99"
          type="number"
        />

        <TextInput
          label="Precio Oferta"
          placeholder="10.99"
          type="number"
        />

      </div>
    </>
  );
}