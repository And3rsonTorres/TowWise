import ConnectDB from "@/app/lib/mongo/index";
import contact from "@/app/models/Contact";
import { NextRequest, NextResponse } from "next/server";
import { ContactSchema } from "@/app/lib/utils/Validations";

/**
 * Handles the POST request for the contact form.
 *
 * This function connects to the database, creates a new contact document, and saves it to the database.
 * If the contact data is valid, it returns a success message. If the data is invalid, it returns an error message.
 *
 * @param req - The NextRequest object containing the contact form data.
 * @returns A NextResponse with the result of the contact form submission.
 */
export async function POST(req: NextRequest) {
  await ConnectDB();
  try {
    const form = await req.json();
    const newContact = new contact({
      Name: form.Name,
      Email: form.Email,
      Message: form.Message,
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
/**
 * Handles the PUT request for the contact form.
 *
 * This function returns a 405 Method Not Allowed response, as the PUT method is not supported for this route.
 *
 * @param request - The NextRequest object.
 * @returns A NextResponse with a 405 Method Not Allowed message.
 */ export async function PUT(request: NextRequest) {
  return NextResponse.json({ message: "405 Method Not Allowed" });
}
