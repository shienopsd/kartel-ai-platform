import { NextRequest, NextResponse } from "next/server";
import { trackDownload } from "@/lib/db/downloads";

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Extract user agent and IP for analytics
    const userAgent = request.headers.get("user-agent") || undefined;
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      undefined;

    // Track download in Supabase database
    await trackDownload({
      productId,
      userAgent,
      ipAddress,
    });

    console.log(`Download tracked for product: ${productId}`);

    // Return success response
    return NextResponse.json({
      success: true,
      productId,
    });
  } catch (error) {
    console.error("Error tracking download:", error);
    return NextResponse.json(
      { error: "Failed to track download" },
      { status: 500 }
    );
  }
}
