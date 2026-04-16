import Image from "next/image";
import Link from "next/link";

export default function ArtisanSpotlight() {
  return (
    <section className="py-16 bg-haven-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <Image
              src="https://picsum.photos/id/1009/800/800" // beautiful ceramic artist
              alt="Elena’s Ceramic Studio"
              width={600}
              height={600}
              className="rounded-3xl shadow-xl w-full"
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <span className="text-haven-primary font-semibold tracking-widest text-sm">ARTISAN SPOTLIGHT</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-haven-dark mt-3 mb-6">
              Elena’s Ceramic Studio
            </h2>
            <p className="text-haven-dark/80 text-lg leading-relaxed mb-8">
              “I’ve been throwing clay for over 20 years. Each piece is a conversation between my hands and the earth. I’m honored to share these creations with you.”
            </p>
            <Link
              href="/about"
              className="inline-block bg-haven-primary text-white px-8 py-3 rounded-2xl font-semibold hover:bg-haven-primary/90 transition"
            >
              Meet Elena
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}