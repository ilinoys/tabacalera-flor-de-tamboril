"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  fortaleza?: string;
  origen?: string;
  tamaño?: string;
  vitola?: string;
}

interface ProductTableProps {
  onEdit: (product: Product) => void;
  search?: string;
  reloadSignal?: number;
}

async function fetchProducts() {
  const response = await fetch("/api/productos");
  return response.json() as Promise<Product[]>;
}

export default function ProductTable({
  onEdit,
  search,
  reloadSignal,
}: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const searchLower = (search ?? "").trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!searchLower) return true;

      const name = (p.name || "").toLowerCase();
      const category = (p.category || "").toLowerCase();
      const description = (p.description || "").toLowerCase();
      const fortaleza = (p.fortaleza || "").toLowerCase();
      const origen = (p.origen || "").toLowerCase();
      const tamaño = (p.tamaño || "").toLowerCase();
      const vitola = (p.vitola || "").toLowerCase();

      return (
        name.includes(searchLower) ||
        category.includes(searchLower) ||
        description.includes(searchLower) ||
        fortaleza.includes(searchLower) ||
        origen.includes(searchLower) ||
        tamaño.includes(searchLower) ||
        vitola.includes(searchLower)
      );
    });
  }, [products, searchLower]);

  async function loadProducts() {
    try {
      const data = await fetchProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmar = confirm(
      "¿Seguro que deseas eliminar este producto?"
    );

    if (!confirmar) return;

    try {
      const response = await fetch("/api/productos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Error al eliminar");
      }

      await loadProducts();

      alert("✅ Producto eliminado");
    } catch (error) {
      console.error(error);
      alert("❌ No se pudo eliminar el producto");
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadInitialProducts() {
      try {
        const data = await fetchProducts();

        if (!cancelled) {
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInitialProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  // Reload when parent signals an import happened
  useEffect(() => {
    if (reloadSignal === undefined) return;

    let cancelled = false;

    async function reload() {
      setLoading(true);
      try {
        const data = await fetchProducts();
        if (!cancelled) setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void reload();

    return () => {
      cancelled = true;
    };
    // reloadSignal is intentionally the only dependency to trigger reloads from parent
  }, [reloadSignal]);

  if (loading) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center text-white">
      Cargando productos...
    </div>
  );
}

  return (
   <div className="rounded-2xl border border-neutral-800 bg-neutral-900">
     <div className="space-y-3 p-3 md:hidden">
       {filteredProducts.map((product) => (
         <div
           key={product.id}
           className="rounded-xl border border-neutral-800 bg-black p-3"
         >
           <div className="flex gap-3">
             <Image
               src={product.image}
               alt={product.name}
               width={72}
               height={72}
               className="h-16 w-16 rounded-lg bg-black object-contain"
             />

             <div className="min-w-0 flex-1">
               <div className="flex items-start justify-between gap-2">
                 <p className="font-semibold text-white">{product.name}</p>

                 <div className="flex gap-2">
                   <button
                     onClick={() => onEdit(product)}
                     className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-500"
                     aria-label={`Editar ${product.name}`}
                   >
                     <Pencil size={16} />
                   </button>

                   <button
                     onClick={() => handleDelete(product.id)}
                     className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-500"
                     aria-label={`Eliminar ${product.name}`}
                   >
                     <Trash2 size={16} />
                   </button>
                 </div>
               </div>

               <p className="mt-1 text-xs text-neutral-400">{product.category}</p>
               <p className="mt-2 text-sm text-yellow-500">RD$ {product.price}</p>
               <p className="mt-1 text-sm text-neutral-300">Stock: {product.stock}</p>
             </div>
           </div>
         </div>
       ))}

       {filteredProducts.length === 0 && (
         <div className="p-6 text-center text-sm text-neutral-400">
           No se encontraron productos.
         </div>
       )}
     </div>

     <div className="hidden overflow-x-auto md:block">
       <table className="min-w-[850px] w-full">
         <thead className="bg-neutral-900">
           <tr>
             <th className="p-4 text-left text-yellow-500">Imagen</th>
             <th className="p-4 text-left text-yellow-500">Producto</th>
             <th className="p-4 text-left text-yellow-500">Categoría</th>
             <th className="p-4 text-left text-yellow-500">Precio</th>
             <th className="p-4 text-left text-yellow-500">Stock</th>
             <th className="p-4 text-center text-yellow-500">Acciones</th>
           </tr>
         </thead>

         <tbody>
           {filteredProducts.map((product) => (
             <tr
               key={product.id}
               className="border-t border-neutral-800 hover:bg-neutral-800/40"
             >
               <td className="p-4">
                 <Image
                   src={product.image}
                   alt={product.name}
                   width={70}
                   height={70}
                   className="h-16 w-16 rounded-lg bg-black object-contain"
                 />
               </td>

               <td className="min-w-[220px] p-4 font-semibold text-white">
                 {product.name}
               </td>

               <td className="min-w-[160px] p-4 text-neutral-300">
                 {product.category}
               </td>

               <td className="p-4 text-yellow-500">
                 RD$ {product.price}
               </td>

               <td className="p-4 text-white">
                 {product.stock}
               </td>

               <td className="min-w-[140px] p-4">
                 <div className="flex justify-center gap-3">
                   <button
                     onClick={() => onEdit(product)}
                     className="rounded-lg bg-blue-600 p-2 hover:bg-blue-500"
                   >
                     <Pencil size={18} />
                   </button>

                   <button
                     onClick={() => handleDelete(product.id)}
                     className="rounded-lg bg-red-600 p-2 hover:bg-red-500"
                   >
                     <Trash2 size={18} />
                   </button>
                 </div>
               </td>
             </tr>
           ))}

           {filteredProducts.length === 0 && (
             <tr>
               <td
                 colSpan={6}
                 className="p-8 text-center text-neutral-400"
               >
                 No se encontraron productos.
               </td>
             </tr>
           )}
         </tbody>
       </table>
     </div>
   </div>
 );
}
