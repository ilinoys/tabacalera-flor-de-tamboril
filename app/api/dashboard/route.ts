import { NextResponse } from "next/server";
import { getDashboardStats } from "@/services/dashboardService";

export async function GET() {
  try {
    const stats = await getDashboardStats();

    return NextResponse.json(stats);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error al obtener estadísticas del dashboard",
      },
      {
        status: 500,
      }
    );
  }
}