import { getSettings } from "@/app/_lib/data-service";

export async function GET() {
  try {
    const settings = await getSettings(); // this queries Supabase
    return Response.json(
      { message: "Keep-alive successful", settingsLoaded: !!settings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Keep-alive failed:", error.message || error);
    return Response.json(
      { message: "Keep-alive failed", error: error.message },
      { status: 500 }
    );
  }
}
