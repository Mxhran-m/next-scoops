export default function Footer() {
  return (
    <footer className="bg-black px-[6vw] py-10 text-white/80">
      <div className="mx-auto grid max-w-5xl gap-4">
        <div className="font-[family-name:var(--font-bebas)] text-2xl tracking-[0.3em]">
          PANDA SCOOPS
        </div>
        <div className="flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.25em]">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>
        <div className="text-xs text-white/40">? 2026 Panda Scoops. All rights reserved.</div>
      </div>
    </footer>
  );
}
