import ConnectDB from "@/app/lib/mongo/index";
import contact from "@/app/models/Contact";
import { NextRequest, NextResponse } from "next/server";
import { ContactSchema } from "@/app/lib/utils/Validations";
export async function POST(req: NextRequest) {
  await ConnectDB();
  try {
    const form = await req.json();
    const newContact = new contact({
      name: form.name,
      email: form.email,
      message: form.message,
    });
    let parsed = ContactSchema.safeParse(newContact);
    if (parsed.success) {
      await newContact.save();
      return NextResponse.json("Contact Saved Successfully");
    } else {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }
  } catch (error) {
    // Handle any other errors
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ message: "405 Method Not Allowed" });
}
