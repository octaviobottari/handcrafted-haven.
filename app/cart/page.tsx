"use client";

import { useCart } from "@/components/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-heading">Your cart is empty</h2>
        <Link href="/shop" className="mt-8 inline-block bg-haven-primary text-white px-10 py-4 rounded-2xl">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-bold mb-10">Your Cart</h1>
      <div className="space-y-8">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-6 border-b pb-8">
            <Image src={item.image} alt={item.name} width={120} height={120} className="rounded-2xl object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold text-xl">{item.name}</h3>
              <p className="text-haven-primary text-2xl">${item.price}</p>
              <div className="flex items-center gap-4 mt-4">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 border rounded-lg">-</button>
                <span className="font-medium w-8 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 border rounded-lg">+</button>
                <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-right">
        <p className="text-3xl">Total: <span className="font-bold">${getTotal().toFixed(2)}</span></p>
        <button
          onClick={() => { clearCart(); alert("Thank you for your purchase! (demo)"); }}
          className="mt-6 bg-haven-primary text-white px-16 py-6 rounded-3xl text-2xl font-semibold"
        >
          Checkout (Demo)
        </button>
      </div>
    </div>
  );
}