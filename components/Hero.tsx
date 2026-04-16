import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-haven-cream py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-haven-primary/10 text-haven-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            100% Handmade · Independent Artisans
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-haven-dark mb-6 leading-tight">
            Where Creativity
            <br />
            <span className="text-haven-primary">Meets Community</span>
          </h1>
          <p className="text-lg md:text-xl text-haven-dark/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Discover unique, handcrafted treasures from artisans around the
            world. Every purchase supports an independent maker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-haven-primary text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-haven-primary/90 transition shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              href="/artisans"
              className="border-2 border-haven-primary text-haven-primary px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-haven-primary/10 transition"
            >
              Meet the Artisans
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-haven-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-haven-accent/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}