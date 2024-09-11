// app/api/user/[userId]/route.ts

import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`);
    if (!response.ok) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = await response.json();
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
