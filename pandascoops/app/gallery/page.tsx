"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

const galleryImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1GRwMhJg1IHZcLBNeZQMoxfe1SvsmspcWWlxh79k6&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr9hOu7_U7qKQpVPuYTG27KEO6cWukQolCJeaqnmHM&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2IYbYJguH1A6r2bIGYUSJeQUISCS2tpyfooBRh9U8&s",
  "https://placehold.co/800x800/0b0b0f/ffffff?text=Panda+Scoops",
  "https://placehold.co/800x800/111827/ffffff?text=Sundae",
  "https://placehold.co/800x800/0f172a/ffffff?text=Shake",
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main className="px-[6vw] py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.25em]">
              Gallery
            </h1>
            <p className="max-w-lg text-white/60">
              A visual taste of Panda Scoops: fresh scoops, creamy textures, and
              our signature desserts captured with cinematic lighting.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((src, index) => (
              <div
                key={src}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg-soft)]"
              >
                <img
                  src={src}
                  alt={`Panda Scoops gallery ${index + 1}`}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
