"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main className="px-[6vw] py-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-[0.25em]">
            Contact Us
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Reach out for catering, collaborations, or to order ahead. We are open
            daily from 12 PM to 1 AM.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[var(--bg-soft)] p-6">
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/60">Visit Us</h3>
              <p className="mt-4 text-white/80">
                01, Sajjan Rao Cir, opp. V. B. Bakery, Vishweshwarapura,
                Basavanagudi, Bengaluru, Karnataka 560004, India
              </p>
              <div className="mt-6 text-sm text-white/60">Monday - Sunday: 12 PM ? 1 AM</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[var(--bg-soft)] p-6">
              <h3 className="text-sm uppercase tracking-[0.3em] text-white/60">Call Us</h3>
              <p className="mt-4 text-white/80">+91 96207 92807</p>
              <p className="text-white/60">07947117884</p>
              <button className="mt-6 rounded-full bg-[var(--accent)] px-6 py-2 text-xs uppercase tracking-[0.3em]">
                Call Now
              </button>
            </div>
          </div>

          <form className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-[var(--bg-soft)] p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/80"
                placeholder="Your name"
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/80"
                placeholder="Email address"
              />
            </div>
            <textarea
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/80"
              rows={4}
              placeholder="Tell us about your request"
            />
            <button
              type="button"
              className="w-fit rounded-full bg-[var(--accent)] px-6 py-2 text-xs uppercase tracking-[0.3em]"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
