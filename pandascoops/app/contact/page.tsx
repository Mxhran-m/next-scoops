"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Contact } from "../components/Contact";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <Contact/>
      <Footer />
    </div>
  );
}
