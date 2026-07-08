import { NextRequest, NextResponse } from "next/server";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "@/services/productService";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const product = await createProduct({
      name: data.name,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      image: data.image || "/images/products/robusto.jpg",
      category: data.category,
      strength: data.strength || "Medio",
      origin: data.origin || "República Dominicana",
      size: data.size || '5" x 50',
      featured: data.featured ?? false,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await deleteProduct(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error al eliminar producto" },
      { status: 500 }
    );
  }
}