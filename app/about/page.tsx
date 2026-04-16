export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-5xl font-heading font-bold text-center mb-8">About Handcrafted Haven</h1>
      <div className="prose text-lg text-haven-dark/80">
        <p className="text-2xl text-center">Where Creativity Meets Community</p>
        <p className="mt-8">
          Handcrafted Haven is a marketplace built for artisans and makers. 
          We connect talented creators with people who value unique, handmade goods.
        </p>
        <p>
          Every product tells a story. Every purchase supports an independent artist.
        </p>
      </div>
    </div>
  );
}