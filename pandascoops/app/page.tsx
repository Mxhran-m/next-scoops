"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Header";
import Footer from "./components/Footer";

const variants = [
  {
    name: "Panda",
    subtitle: "panda scoops",
    description:
      "A modern take on a classic ice cream with a perfect blend of sweet and tart, full of nostalgic flavor.",
    themeColor: "#2f6dff",
    sequence: {
      baseUrl:
        "https://jqdsruhyliemzfvdsuef.supabase.co/storage/v1/object/public/Images/panda/ezgif-frame-001.jpg",
      frameCount: 240,
    },
  },
  {
    name: "waffle-cone",
    subtitle: "cone",
    description:
      "A modern functional soda brand inspired by classic flavors but made with better ingredients.",
    themeColor: "#2f6dff",
    sequence: {
      baseUrl:
        "https://jqdsruhyliemzfvdsuef.supabase.co/storage/v1/object/public/Images/cone/ezgif-frame-001.jpg",
      frameCount: 240,
    },
  },
  {
    name: "sundae",
    subtitle: "sundae ice cream",
    description:
      "Bright and refreshing citrus soda with natural lemon spark and crisp bubbles.",
    themeColor: "#2f6dff",
    sequence: {
      baseUrl:
        "https://jqdsruhyliemzfvdsuef.supabase.co/storage/v1/object/public/Images/sundae/ezgif-frame-001.jpg",
      frameCount: 240,
    },
  },
  {
    name: "Shake",
    subtitle: "milk shake",
    description:
      "Bright and refreshing citrus soda with natural lemon spark and crisp bubbles.",
    themeColor: "#2f6dff",
    sequence: {
      baseUrl:
        "https://jqdsruhyliemzfvdsuef.supabase.co/storage/v1/object/public/Images/shake/ezgif-frame-001.jpg",
      frameCount: 240,
    },
  },
];


gsap.registerPlugin(ScrollTrigger);

function buildFrameUrl(baseUrl: string, index: number) {
  const match = baseUrl.match(/(\d+)(\.[a-zA-Z]+)$/);
  if (!match) return baseUrl;
  const digits = match[1].length;
  const padded = String(index).padStart(digits, "0");
  return baseUrl.replace(match[1], padded);
}

function preloadSequence(
  baseUrl: string,
  frameCount: number,
  onProgress: (percent: number) => void,
  limit?: number
) {
  const frames: HTMLImageElement[] = new Array(frameCount);
  let loaded = 0;
  const totalToLoad = limit ? Math.min(limit, frameCount) : frameCount;

  return new Promise<HTMLImageElement[]>((resolve) => {
    for (let i = 1; i <= totalToLoad; i += 1) {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded += 1;
        frames[i - 1] = img;
        onProgress(Math.round((loaded / totalToLoad) * 100));
        if (loaded === totalToLoad) {
          resolve(frames);
        }
      };
      img.src = buildFrameUrl(baseUrl, i);
    }
  });
}

function backgroundLoadSequence(
  baseUrl: string,
  frameCount: number,
  startIndex: number,
  frames: HTMLImageElement[],
  onFrame: () => void
) {
  for (let i = startIndex; i <= frameCount; i += 1) {
    if (frames[i - 1]) continue;
    const img = new Image();
    img.onload = img.onerror = () => {
      frames[i - 1] = img;
      onFrame();
    };
    img.src = buildFrameUrl(baseUrl, i);
  }
}

export default function Home() {
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const activeVariant = variants[activeIndex];
  const displayVariant = variants[displayIndex];

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      // smoothTouch: false,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", activeVariant.themeColor);
    document.documentElement.style.setProperty(
      "--accent-soft",
      `${activeVariant.themeColor}33`
    );
  }, [activeVariant]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadingPercent(0);

    preloadSequence(
      activeVariant.sequence.baseUrl,
      activeVariant.sequence.frameCount,
      (percent) => !cancelled && setLoadingPercent(percent)
    ).then((frames) => {
      if (cancelled) return;
      framesRef.current = frames;
      if (heroImageRef.current && frames[0]) {
        heroImageRef.current.src = frames[0].src;
      }

      triggerRef.current?.kill();
      if (heroScrollRef.current) {
        triggerRef.current = ScrollTrigger.create({
          trigger: heroScrollRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const frameIndex = Math.round(
              self.progress * (activeVariant.sequence.frameCount - 1)
            );
            const frame = framesRef.current[frameIndex];
            if (frame && heroImageRef.current) {
              heroImageRef.current.src = frame.src;
            }
          },
        });
      }

      setLoading(false);
      setIsFading(false);
      setDisplayIndex(activeIndex);
    });

    return () => {
      cancelled = true;
      triggerRef.current?.kill();
    };
  }, [activeIndex, activeVariant.sequence.baseUrl, activeVariant.sequence.frameCount]);

  const switchVariant = (direction: "next" | "prev") => {
    const nextIndex =
      direction === "next"
        ? (activeIndex + 1) % variants.length
        : (activeIndex - 1 + variants.length) % variants.length;
    if (nextIndex === activeIndex) return;
    setIsFading(true);
    setLoading(true);
    setActiveIndex(nextIndex);
  };

  return (
    <div className="bg-[var(--bg)] text-[var(--text)]">
      <div
        className={`fixed inset-0 z-[200] grid place-items-center bg-black/95 transition-opacity duration-500 ${
          loading ? "opacity-100" : "loader-hidden"
        }`}
      >
        <div className="text-center w-[min(420px,80vw)]">
          <div className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.3em]">
            PANDA SCOOPS
          </div>
          <div className="mt-5 h-1 w-full rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-200"
              style={{ width: `${loadingPercent}%` }}
            />
          </div>
          <div className="mt-3 text-xs uppercase tracking-[0.4em] text-white/60">
            Loading {loadingPercent}%
          </div>
        </div>
      </div>

      <Header />

      <section ref={heroScrollRef} className="relative h-[300vh]" id="heroScroll">
        <div className="sticky top-0 h-screen overflow-hidden">
          <img
            ref={heroImageRef}
            alt="Panda Scoops cinematic background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="hero-overlay relative z-10 grid h-full grid-cols-[minmax(240px,1fr)_minmax(120px,0.6fr)_minmax(200px,0.6fr)] px-[6vw] py-[8vh] max-lg:grid-cols-1 max-lg:gap-10 max-lg:py-[12vh]">
            <div className="flex flex-col gap-5">
              <div className="text-xs tracking-[0.4em] uppercase text-white/60">Panda Scoops</div>
              <div
                className={`max-w-[420px] transition-all duration-500 ${
                  isFading ? "fade-text" : "opacity-100"
                }`}
              >
                <div className="font-[family-name:var(--font-bebas)] text-[clamp(46px,9vw,120px)] tracking-[0.08em]">
                  {displayVariant.name.toUpperCase()}
                </div>
                <div className="text-sm uppercase tracking-[0.35em] text-white/60">
                  {displayVariant.subtitle.toUpperCase()}
                </div>
                <p className="mt-3 text-base text-white/90">
                  {displayVariant.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full border border-white/40 px-6 py-3 text-[11px] uppercase tracking-[0.3em]">
                  Order Now
                </button>
                <button className="rounded-full border border-white/30 px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-white/80">
                  View Menu
                </button>
              </div>
            </div>

            <div />

            <div className="flex items-center justify-end gap-6 max-lg:justify-start">
              <div className="font-[family-name:var(--font-bebas)] text-[clamp(48px,8vw,120px)] tracking-[0.12em] text-white/80">
                {String(displayIndex + 1).padStart(2, "0")}
              </div>
              <div className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] max-sm:flex-row max-sm:items-center max-sm:gap-6">
                <button onClick={() => switchVariant("prev")} className="flex items-center gap-2">
                  <span>Prev</span>
                  <span className="text-lg">?</span>
                </button>
                <div className="h-20 w-px bg-[var(--accent)] max-sm:h-px max-sm:w-16" />
                <button onClick={() => switchVariant("next")} className="flex items-center gap-2">
                  <span>Next</span>
                  <span className="text-lg">?</span>
                </button>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                  {loading ? "Loading..." : "Ready"}
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-5 text-xs uppercase tracking-[0.35em] text-white/50">
              <a href="#">X</a>
              <a href="#">IG</a>
              <a href="#">FB</a>
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="px-[6vw] py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.2em]">
            Product
          </h2>
          <p className="mt-4 text-lg text-white/60">
            A modern ice cream brand inspired by classic flavors but made with better ingredients.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-white/80">
                Panda Scoops pairs bold nostalgia with cleaner recipes: real fruit, honest dairy, and a texture that melts
                slow and clean. Every scoop is balanced for sweetness, creaminess, and a fresh finish.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {"Handcrafted Small-batch Better Ingredients".split(" ").map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg-soft)]">
              <div className="h-64 w-full bg-[radial-gradient(circle_at_top,#8f3bd9,#3b1b5f)]" />
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-[0.18em]">
                  Signature Scoop
                </h3>
                <p className="mt-2 text-white/70">
                  Clean, bold, and cinematic. Designed to pop in dark mode with a crisp studio glow.
                </p>
                <button className="mt-5 rounded-full bg-[var(--accent)] px-6 py-2 text-xs uppercase tracking-[0.3em]">
                  Order the Scoop
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ingredients" className="px-[6vw] py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.2em]">
            Ingredients & Benefits
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <ul className="space-y-3 text-white/70">
              <li>Real fruit purees and whole milk cream.</li>
              <li>Low additive, high flavor recipes.</li>
              <li>Seasonal rotations inspired by classic desserts.</li>
            </ul>
            <div className="grid gap-4">
              {[
                { title: "Clean Finish", text: "Balanced sweetness that lets flavors linger without heaviness." },
                { title: "Crafted Daily", text: "Small-batch production keeps texture creamy and fresh." },
                { title: "Modern Classics", text: "Beloved flavors, elevated with better sourcing." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--bg-soft)] p-5">
                  <h4 className="text-lg uppercase tracking-[0.2em] text-white/90">{item.title}</h4>
                  <p className="mt-2 text-sm text-white/60">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="nutrition" className="px-[6vw] py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.2em]">
            Nutrition Facts
          </h2>
          <div className="mt-8 max-w-md border-2 border-white bg-[var(--bg-soft)] p-6">
            <div className="text-lg font-bold">Nutrition Facts</div>
            {[
              ["Serving Size", "1 Scoop (120g)"],
              ["Calories", "210"],
              ["Total Fat", "9g"],
              ["Total Carbs", "28g"],
              ["Protein", "4g"],
            ].map((row) => (
              <div key={row[0]} className="flex justify-between border-t border-white/15 py-2 text-sm">
                <span>{row[0]}</span>
                <span>{row[1]}</span>
              </div>
            ))}
            <div className="mt-3 text-xs text-white/60">*Values are estimates for display.</div>
          </div>
        </div>
      </section>

      <section id="reviews" className="px-[6vw] py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.2em]">
            Reviews
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                score: "4.8",
                text: "Great place for a quick ice cream treat. The location is very convenient.",
                source: "Justdial",
              },
              {
                score: "4.8",
                text: "Ordered mango, jackfruit and chocolate all tasted soo good at reasonable price.",
                source: "Google Maps",
              },
              {
                score: "5.0",
                text: "Our viral sundae isn?t just a trend; it?s a masterpiece.",
                source: "Instagram",
              },
            ].map((review) => (
              <div key={review.text} className="rounded-2xl border border-white/10 bg-[var(--bg-soft)] p-6">
                <div className="text-3xl font-semibold text-[var(--accent)]">{review.score}</div>
                <p className="mt-3 text-sm text-white/70">"{review.text}"</p>
                <div className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50">
                  {review.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-[6vw] py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.2em]">
            FAQ
          </h2>
          <div className="mt-8 grid gap-4">
            {[
              {
                q: "What are your hours?",
                a: "Monday - Sunday: 12 PM ? 1 AM",
              },
              {
                q: "Where are you located?",
                a: "01, Sajjan Rao Cir, opp. V. B. Bakery, Vishweshwarapura, Basavanagudi, Bengaluru.",
              },
              {
                q: "Do you have seasonal flavors?",
                a: "Yes. We rotate limited batches inspired by classic desserts and local fruit.",
              },
            ].map((item) => (
              <details key={item.q} className="rounded-2xl border border-white/10 bg-[var(--bg-soft)] p-5">
                <summary className="cursor-pointer text-base uppercase tracking-[0.15em]">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm text-white/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-[6vw] py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-[var(--bg-soft)] p-10 text-center">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[0.2em]">
            Make Tonight a Scoops Night
          </h2>
          <p className="mt-4 text-white/70">
            Drop by VV Puram Food Street or order ahead. Bright flavors, bold texture, and a perfect scoop every time.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button className="rounded-full bg-[var(--accent)] px-6 py-2 text-xs uppercase tracking-[0.3em]">
              Order Now
            </button>
            <button className="rounded-full border border-white/30 px-6 py-2 text-xs uppercase tracking-[0.3em]">
              Call +91 96207 92807
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
