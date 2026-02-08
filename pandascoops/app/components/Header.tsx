"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [visible, setVisible] = useState(true);
  const lastScroll = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY || 0;
        if (current <= 10) {
          setVisible(true);
        } else if (current < lastScroll.current) {
          setVisible(true);
        } else if (current > lastScroll.current) {
          setVisible(false);
        }
        lastScroll.current = current;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-[80] rounded-full flex flex-wrap items-center justify-between gap-4 px-[6vw] py-4 backdrop-blur-xl bg-white/10 border border-white/20 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-100"
      }`}
    >
      <a
        href="/"
        className="font-[family-name:var(--font-bebas)] tracking-[0.3em] text-lg"
      >
        PANDA SCOOPS
      </a>
      <nav className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.28em]">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors text-white/70 hover:text-[var(--accent)]"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
