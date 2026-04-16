import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    include: { seller: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold text-center mb-12">All Treasures</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-haven-dark/70">{product.seller.storeName || product.seller.name}</p>
              <p className="text-haven-primary font-medium">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}