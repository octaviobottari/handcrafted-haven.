import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-haven-dark text-haven-cream py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold">
              Handcrafted<span className="text-haven-primary">Haven</span>
            </h3>
            <p className="mt-2 text-haven-cream/60 text-sm leading-relaxed">
              Where Creativity Meets Community.
              <br />
              Supporting independent artisans worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-haven-cream">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-haven-cream/70">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-haven-primary transition"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/artisans"
                  className="hover:text-haven-primary transition"
                >
                  Artisans
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-haven-primary transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-haven-primary transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-haven-primary transition"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-haven-primary transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social + copyright */}
          <div>
            <h4 className="font-semibold mb-4 text-haven-cream">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4 mb-6">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-haven-primary transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-haven-primary transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-haven-primary transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-haven-cream/40 text-xs">
              © {new Date().getFullYear()} Handcrafted Haven.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}