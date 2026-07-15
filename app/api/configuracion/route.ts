import { NextRequest, NextResponse } from "next/server";

import {
  getSettings,
  saveSettings,
} from "@/services/settingsService";

export async function GET() {
  try {
    const settings = await getSettings();

    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo obtener la configuración.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const settings = await saveSettings(body);

    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "No se pudo guardar la configuración.",
      },
      {
        status: 500,
      }
    );
  }
}