// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";  // ← Importa desde lib
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, storeName, bio } = await req.json();

    // Validación básica
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
        role: role || "BUYER",
        storeName: role === "SELLER" ? storeName : null,
        bio: role === "SELLER" ? bio : null,
      },
    });
    
    return NextResponse.json({ message: "Account created successfully!" }, { status: 201 });
  } catch (e: any) {
    console.error("Registration error:", e);
    
    // Error de email duplicado
    if (e.code === 'P2002') {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}