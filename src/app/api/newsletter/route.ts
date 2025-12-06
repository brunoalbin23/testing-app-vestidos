import { NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = formData.get("email")?.toString().trim();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const url = new URL(req.url);
    const redirectUrl = new URL("/", url.origin);
    redirectUrl.searchParams.set("newsletter", "success");

    return NextResponse.redirect(redirectUrl, { status: 303 });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your subscription" },
      { status: 500 }
    );
  }
}

