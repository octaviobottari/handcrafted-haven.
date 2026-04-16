// app/product/[id]/AddToCartButton.tsx
"use client";

import { useCart } from "@/components/CartContext";

export default function AddToCartButton({ product }: any) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        });
        alert("✅ Added to cart!");
      }}
      className="mt-12 w-full bg-haven-primary text-white py-6 rounded-3xl text-2xl font-semibold hover:bg-haven-primary/90 transition"
    >
      Add to Cart
    </button>
  );
}