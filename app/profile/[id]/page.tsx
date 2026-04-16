#! app/profile/[id]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function SellerProfile({ params }: { params: { id: string } }) {
  const seller = await prisma.user.findUnique({
    where: { id: params.id },
    include: { products: true },
  });

  if (!seller || seller.role !== "SELLER") notFound();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-heading font-bold">{seller.storeName}</h1>
        <p className="mt-4 text-lg text-haven-dark/70">{seller.bio}</p>
      </div>

      <h2 className="text-3xl font-heading mt-16 mb-8 text-center">Products by {seller.storeName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {seller.products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="block">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <Image src={product.image} alt={product.name} width={400} height={400} className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 font-medium">{product.name}</p>
            <p className="text-haven-primary">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}