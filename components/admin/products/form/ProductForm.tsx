"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Upload } from "lucide-react";
import { uploadProductImage } from "@/services/uploadService";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
}

interface ProductFormProps {
  product?: Product | null;
  onSuccess?: () => void;
}

const emptyProduct = {
  id: "",
  name: "",
  description: "",
  category: "Premium",
  price: "",
  stock: "",
  image: "",
};

function getInitialProduct(product?: Product | null) {
  if (!product) return emptyProduct;

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price.toString(),
    stock: product.stock.toString(),
    image: product.image,
  };
}

export default function ProductForm({
  product: editingProduct,
  onSuccess,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(editingProduct?.image ?? "");
  const [product, setProduct] = useState(() => getInitialProduct(editingProduct));
  const imagePreviewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreviewUrlRef.current) {
        URL.revokeObjectURL(imagePreviewUrlRef.current);
      }
    };
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Selecciona un archivo de imagen válido");
      e.target.value = "";
      return;
    }

    if (imagePreviewUrlRef.current) {
      URL.revokeObjectURL(imagePreviewUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    imagePreviewUrlRef.current = objectUrl;

    setSelectedImageFile(file);
    setImagePreview(objectUrl);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = product.image;

      if (selectedImageFile) {
        imageUrl = await uploadProductImage(selectedImageFile);
      }

      const response = await fetch("/api/productos", {
        method: editingProduct ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar");
      }

      alert(
        editingProduct
          ? "Producto actualizado correctamente"
          : "Producto guardado correctamente"
      );

      setProduct(emptyProduct);
      setSelectedImageFile(null);
      setImagePreview("");

      if (imagePreviewUrlRef.current) {
        URL.revokeObjectURL(imagePreviewUrlRef.current);
        imagePreviewUrlRef.current = null;
      }

      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert("Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-8">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          className="mb-4 w-full rounded-xl border border-neutral-700 bg-black p-3 text-sm text-white placeholder:text-neutral-500 sm:p-4 sm:text-base"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Descripción"
          rows={5}
          className="mb-4 w-full rounded-xl border border-neutral-700 bg-black p-3 text-sm text-white placeholder:text-neutral-500 sm:p-4 sm:text-base"
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="mb-4 w-full rounded-xl border border-neutral-700 bg-black p-3 text-sm text-white placeholder:text-neutral-500 sm:p-4 sm:text-base"
        >
          <option>Premium</option>
          <option>Clásica</option>
          <option>Edición Especial</option>
        </select>

        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Precio"
          className="mb-4 w-full rounded-xl border border-neutral-700 bg-black p-3 text-sm text-white placeholder:text-neutral-500 sm:p-4 sm:text-base"
        />

        <input
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full rounded-xl border border-neutral-700 bg-black p-3 text-sm text-white placeholder:text-neutral-500 sm:p-4 sm:text-base"
        />
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-8">
        <h2 className="mb-6 text-xl font-bold text-yellow-500 sm:text-2xl">
          Imagen del producto
        </h2>

        <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-700 bg-black p-4 text-center transition hover:border-yellow-500 sm:min-h-64 sm:p-6">
          {imagePreview ? (
            <div
              className="h-56 w-full rounded-xl bg-cover bg-center sm:h-64"
              style={{
                backgroundImage: `url(${imagePreview})`,
              }}
              aria-label="Vista previa de la imagen del producto"
            />
          ) : (
            <div>
              <ImagePlus className="mx-auto text-yellow-500" size={42} />

              <p className="mt-4 text-base font-semibold text-white sm:text-lg">
                Selecciona una imagen
              </p>

              <p className="mt-2 text-sm text-neutral-400 sm:text-base">
                Se subirá a Supabase Storage al guardar
              </p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
            className="sr-only"
          />
        </label>

        {selectedImageFile && (
          <p className="mt-3 flex items-center gap-2 text-sm text-neutral-300">
            <Upload size={16} />
            {selectedImageFile.name}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
        <button
          type="button"
          onClick={onSuccess}
          className="w-full rounded-xl border border-neutral-700 px-6 py-3 text-white sm:w-auto"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-yellow-600 px-6 py-3 font-bold text-white hover:bg-yellow-500 disabled:opacity-50 sm:w-auto"
        >
          {loading
            ? selectedImageFile
              ? "Subiendo imagen..."
              : "Guardando..."
            : editingProduct
              ? "Actualizar Producto"
              : "Guardar Producto"}
        </button>
      </div>
    </form>
  );
}
