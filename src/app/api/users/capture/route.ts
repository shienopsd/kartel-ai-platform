import { NextRequest, NextResponse } from "next/server";
import { saveUserEmail } from "@/lib/db/users";

export async function POST(request: NextRequest) {
  try {
    const { email, productId, productTitle } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!productId || !productTitle) {
      return NextResponse.json(
        { error: "Product information is required" },
        { status: 400 }
      );
    }

    const result = await saveUserEmail({
      email: email.toLowerCase().trim(),
      productId,
      productTitle,
    });

    console.log(`Email captured: ${email} for product: ${productTitle} (${result.isNewUser ? 'new user' : 'returning user'})`);

    return NextResponse.json({
      success: true,
      isNewUser: result.isNewUser,
    });
  } catch (error) {
    console.error("Error capturing email:", error);
    return NextResponse.json(
      { error: "Failed to capture email" },
      { status: 500 }
    );
  }
}
