import { NextRequest, NextResponse } from "next/server";

import {
  getCustomers,
  searchCustomers,
} from "@/services/customerService";

export async function GET(request: NextRequest) {
  try {
    const search =
      request.nextUrl.searchParams.get("search");

    if (search && search.trim() !== "") {
      const customers =
        await searchCustomers(search);

      return NextResponse.json(customers);
    }

    const customers = await getCustomers();

    return NextResponse.json(customers);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudieron obtener los clientes.",
      },
      {
        status: 500,
      }
    );
  }
}