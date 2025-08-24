import { NextResponse } from "next/server";

export async function POST() {
  // Borra la cookie del token
  return NextResponse.json(
    { message: "Logout successful" },
    {
      status: 200,
      headers: {
        "Set-Cookie": "token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
      },
    }
  );
}