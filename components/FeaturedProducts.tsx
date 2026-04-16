// components/FeaturedProducts.tsx
import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function FeaturedProducts() {
  // Fetch the 4 most recent products
  const products = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { seller: true },
  });

  // Fallback data if no products yet (beautiful real artisan photos)
  const fallbackProducts = [
    {
      id: "1",
      name: "Handwoven Rattan Basket",
      price: 45,
      image: "https://picsum.photos/id/1015/800/800",
      seller: { storeName: "Willow & Weave" },
    },
    {
      id: "2",
      name: "Ceramic Glazed Mug",
      price: 28,
      image: "https://picsum.photos/id/201/800/800",
      seller: { storeName: "Earth & Fire" },
    },
    {
      id: "3",
      name: "Natural Dye Linen Scarf",
      price: 52,
      image: "https://picsum.photos/id/1005/800/800",
      seller: { storeName: "Meadow Textiles" },
    },
    {
      id: "4",
      name: "Handcrafted Wooden Board",
      price: 67,
      image: "https://picsum.photos/id/133/800/800",
      seller: { storeName: "Oak & Olive" },
    },
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-haven-dark">
            Featured Treasures
          </h2>
          <p className="text-haven-dark/70 mt-2 max-w-2xl mx-auto">
            Handpicked just for you – explore our latest artisan creations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product: any) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group block"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-haven-cream shadow-md group-hover:shadow-xl transition">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-haven-dark group-hover:text-haven-primary transition">
                  {product.name}
                </h3>
                <p className="text-sm text-haven-dark/70">
                  {product.seller?.storeName || product.seller?.name || "Artisan"}
                </p>
                <p className="text-haven-primary font-medium mt-1">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block border-2 border-haven-primary text-haven-primary px-8 py-3 rounded-2xl font-semibold hover:bg-haven-primary/10 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}