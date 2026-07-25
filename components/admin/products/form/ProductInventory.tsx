import TextInput from "@/components/ui/form/TextInput";

export default function ProductInventory() {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-yellow-500">
        Inventario
      </h2>

      <div className="grid gap-6">

        <TextInput
          label="Stock"
          placeholder="250"
          type="number"
        />

        <TextInput
          label="SKU"
          placeholder="FDT-ROB-001"
        />

      </div>
    </>
  );
}