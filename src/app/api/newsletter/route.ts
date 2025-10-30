import { NextResponse } from "next/server";

// Email validation regex (more strict than HTML5 default)
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = formData.get("email")?.toString().trim();

    // Validate email exists
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // TODO: Here you would save the email to your database/newsletter service
    // For now, we'll just return success
    // Example: await saveEmailToNewsletter(email);

    // Redirect back to home with success message
    const url = new URL(req.url);
    const redirectUrl = new URL("/", url.origin);
    redirectUrl.searchParams.set("newsletter", "success");

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your subscription" },
      { status: 500 }
    );
  }
}

