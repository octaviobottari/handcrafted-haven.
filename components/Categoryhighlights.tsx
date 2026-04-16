import Link from "next/link";

const categories = [
  { name: "Ceramics", emoji: "🏺", color: "bg-haven-primary/10 hover:bg-haven-primary/20" },
  { name: "Textiles", emoji: "🧶", color: "bg-haven-secondary/10 hover:bg-haven-secondary/20" },
  { name: "Jewelry",  emoji: "💎", color: "bg-haven-accent/10 hover:bg-haven-accent/20" },
  { name: "Woodwork", emoji: "🪵", color: "bg-haven-primary/10 hover:bg-haven-primary/20" },
  { name: "Painting", emoji: "🎨", color: "bg-haven-secondary/10 hover:bg-haven-secondary/20" },
  { name: "Leather",  emoji: "👜", color: "bg-haven-accent/10 hover:bg-haven-accent/20" },
];

export default function CategoryHighlights() {
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-heading font-bold text-haven-dark mb-8">
          Shop by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/shop?category=${cat.name}`}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition ${cat.color} text-haven-dark`}
            >
              <span className="text-xl">{cat.emoji}</span>
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}