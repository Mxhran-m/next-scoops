"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main className="px-[6vw] py-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.25em]">
            About Us
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Panda Scoops is a modern ice cream brand inspired by classic flavors but
            made with better ingredients. We blend small-batch technique, honest
            dairy, and real fruit to deliver a clean, creamy scoop that feels
            both nostalgic and new.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {["Crafted Daily", "Local Fruit", "Better Ingredients"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-[var(--bg-soft)] p-6"
              >
                <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Panda Scoop
                </div>
                <h3 className="mt-3 text-xl uppercase tracking-[0.2em]">{item}</h3>
                <p className="mt-3 text-sm text-white/70">
                  Built on classic dessert memories with a cleaner, more modern
                  finish.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
