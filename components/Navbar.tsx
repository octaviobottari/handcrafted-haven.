"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, User, LogOut, Store } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "./CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-haven-cream/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-heading font-bold text-haven-dark"
          >
            Handcrafted<span className="text-haven-primary">Haven</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8 text-haven-dark/80">
            <Link href="/shop" className="hover:text-haven-primary transition">
              Shop
            </Link>
            <Link
              href="/artisans"
              className="hover:text-haven-primary transition"
            >
              Artisans
            </Link>
            <Link href="/about" className="hover:text-haven-primary transition">
              About
            </Link>
            {session?.user?.role === "SELLER" && (
              <Link
                href="/sell"
                className="text-haven-primary font-semibold hover:text-haven-primary/80 transition"
              >
                Sell
              </Link>
            )}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:text-haven-primary transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-haven-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            {session ? (
              <div className="flex items-center gap-2">
                <Link
                  href={`/profile/${session.user.id}`}
                  className="flex items-center gap-2 hover:text-haven-primary transition"
                >
                  <div className="w-8 h-8 rounded-full bg-haven-primary/20 flex items-center justify-center text-haven-primary font-bold text-sm">
                    {(session.user.name || "U")[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden lg:block">
                    {session.user.name?.split(" ")[0]}
                  </span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 hover:text-red-400 transition"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-haven-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-haven-primary/90 transition"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-5 border-t border-haven-primary/10">
            <nav className="flex flex-col space-y-4 text-lg">
              <Link
                href="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-haven-primary transition"
              >
                Shop
              </Link>
              <Link
                href="/artisans"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-haven-primary transition"
              >
                Artisans
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-haven-primary transition"
              >
                About
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:text-haven-primary transition"
              >
                <ShoppingBag className="w-5 h-5" />
                Cart
                {cartCount > 0 && (
                  <span className="bg-haven-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {session?.user?.role === "SELLER" && (
                <Link
                  href="/sell"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-haven-primary font-semibold"
                >
                  <Store className="w-5 h-5 inline mr-2" />
                  Sell
                </Link>
              )}
              {session ? (
                <>
                  <Link
                    href={`/profile/${session.user.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-haven-primary transition"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-red-400 hover:text-red-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-haven-primary font-semibold"
                >
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}