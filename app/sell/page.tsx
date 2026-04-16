// app/sell/page.tsx
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

async function uploadProduct(formData: FormData) {
  "use server"; // ← this is required for the action

  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "SELLER") {
    redirect("/login");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const file = formData.get("image") as File;

  if (!file) throw new Error("No image selected");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const filepath = path.join(process.cwd(), "public", "uploads", filename);

  await writeFile(filepath, buffer);

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      image: `/uploads/${filename}`,
      category: category || "Other",
      sellerId: session.user.id as string,
    },
  });

  revalidatePath("/shop");
  revalidatePath(`/profile/${session.user.id}`);
}

export default async function SellPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "SELLER") {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-heading font-bold">Only sellers can upload products</h1>
        <a href="/login" className="mt-6 inline-block text-haven-primary underline">
          Login as a seller →
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-heading font-bold text-center mb-10">Upload New Product</h1>

      <form action={uploadProduct} className="space-y-8">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          required
          className="w-full p-4 border border-haven-dark/30 rounded-3xl focus:outline-none focus:border-haven-primary"
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          className="w-full p-4 border border-haven-dark/30 rounded-3xl h-40 focus:outline-none focus:border-haven-primary"
        />
        <input
          type="number"
          name="price"
          placeholder="Price in USD"
          step="0.01"
          required
          className="w-full p-4 border border-haven-dark/30 rounded-3xl focus:outline-none focus:border-haven-primary"
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Ceramics, Textiles)"
          className="w-full p-4 border border-haven-dark/30 rounded-3xl focus:outline-none focus:border-haven-primary"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="w-full border border-haven-dark/30 rounded-3xl p-4"
        />
        <button
          type="submit"
          className="w-full bg-haven-primary text-white py-5 rounded-3xl text-xl font-semibold hover:bg-haven-primary/90 transition"
        >
          Publish to Marketplace
        </button>
      </form>
    </div>
  );
}