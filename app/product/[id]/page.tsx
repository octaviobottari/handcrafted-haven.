// app/product/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import AddToCartButton from "./AddToCartButton";

const prisma = new PrismaClient();

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;   // ← This is the fix

  const product = await prisma.product.findUnique({
    where: { id },
    include: { seller: true },
  });

  if (!product) notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-5xl font-heading font-bold text-haven-dark">{product.name}</h1>
          <p className="text-4xl text-haven-primary font-medium mt-3">${product.price}</p>
          <p className="mt-8 text-haven-dark/80 leading-relaxed">{product.description}</p>
          <p className="mt-8 text-sm">
            Sold by <span className="font-semibold">{product.seller.storeName || product.seller.name}</span>
          </p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}