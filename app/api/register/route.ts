#! app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, email, password, role, storeName, bio } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "BUYER",
        storeName: role === "SELLER" ? storeName : null,
        bio: role === "SELLER" ? bio : null,
      },
    });
    return NextResponse.json({ message: "Account created successfully!" }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }
}