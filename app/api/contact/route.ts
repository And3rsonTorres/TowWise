import  ConnectDB  from '@/app/lib/mongo/index';
import contact from "@/app/models/Contact";

export async function POST(request: Request) {
  await ConnectDB();
  const body = await request.json();
  const newContact = new contact({
    name: body.name,
    email: body.email,
    message: body.message,
  });
  const savedContact = await newContact.save();
  return Response.json(savedContact);
}

/*
export async function GET(request: Request){
    await ConnectDB();
    const message = await contact.find();
    
    return Response.json(message);
}
*/
export async function PUT(request: Request) {
    return Response.json({message: "405 Method Not Allowed"});
  }
