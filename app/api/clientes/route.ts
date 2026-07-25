import { NextRequest, NextResponse } from "next/server";

import {
  getCustomers,
  searchCustomers,
  createCustomer,
} from "@/services/customerService";

export async function GET(request: NextRequest) {
  try {
    const search =
      request.nextUrl.searchParams.get("search");

    if (search && search.trim() !== "") {
      const customers = await searchCustomers(search);

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

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const customer = await createCustomer(data);

    return NextResponse.json(customer, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo crear el cliente.",
      },
      {
        status: 500,
      }
    );
  }
}