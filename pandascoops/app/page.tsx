"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "@/app/components/product-list";
import Testimonials from "./components/Testimonials";

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

const productList = [
  {
    image:
      "https://images.pexels.com/photos/5061254/pexels-photo-5061254.jpeg",
    imgAlt: "Vanilla Choco",
    name: "Vanilla Choco",
    price: 140,
    badges: ["Nachos"],
  },
  {
    image:
      "https://images.pexels.com/photos/28525198/pexels-photo-28525198.jpeg",
    imgAlt: "Vanilla Milkshake",
    name: "Vanilla Milkshake",
    price: 100,
    // salePrice: 90,
    badges: ["Milkshake"],
  },
  {
    image:
      "https://images.pexels.com/photos/2708337/pexels-photo-2708337.jpeg",
    imgAlt: "Classic Waffle Cone",
    name: "Classic Waffle Cone",
    price: 10,
    badges: ["Waffle Cones"],
  },
  {
    image:
      "https://images.pexels.com/photos/33245825/pexels-photo-33245825.jpeg",
    imgAlt: "Oreo",
    name: "Oreo",
    price: 60,
    badges: ["Oreo"],
  },
  {
    image:
      "https://cookilicious.com/wp-content/uploads/2024/01/Chikoo_Milkshake-1-1200x1800.jpg",
    imgAlt: "Chikku",
    name: "Chikku",
    price: 60,
    badges: ["Chikku"],
  },
  {
    image:
      "https://images.pexels.com/photos/16560463/pexels-photo-16560463.jpeg",
    imgAlt: "Mocha Punch",
    name: "Mocha Punch",
    price: 160,
    badges: ["Sundae"],
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
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

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
      {isOrderModalOpen ? (
        <div
          className="fixed inset-0 z-[220] flex items-center justify-center bg-black/70 px-6 py-10"
          onClick={() => setIsOrderModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-white/15 bg-[#0b0b10] p-6 text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-white/60">
                  Order Online
                </div>
                <div className="mt-2 font-[family-name:var(--font-bebas)] text-3xl tracking-[0.2em]">
                  Choose Your Platform
                </div>
              </div>
              <button
                className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70 cursor-pointer"
                onClick={() => setIsOrderModalOpen(false)}
                aria-label="Close order modal"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm text-white/70">
              Get your favorite scoop delivered fast. Pick the delivery partner you prefer
              to continue your order.
            </p>
            <div className="mt-6 grid gap-3">
              <a
                href="https://www.swiggy.com/city/bangalore/panda-scoop-and-bite-basaveshwaranagar-rest1227704"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm uppercase tracking-[0.25em] hover:border-[var(--accent)]"
              >
                Swiggy
                <span className="text-[10px] text-white/60">Open</span>
              </a>
              <a
                href="https://www.zomato.com/bangalore/restaurants/dish-scoop-ice-cream"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm uppercase tracking-[0.25em] hover:border-[var(--accent)]"
              >
                Zomato
                <span className="text-[10px] text-white/60">Open</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}

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
                <button
                  className="rounded-full border border-white/40 px-6 py-3 text-[11px] uppercase tracking-[0.3em] cursor-pointer"
                  onClick={() => setIsOrderModalOpen(true)}
                >
                  Order Now
                </button>
                <button className="rounded-full border border-white/30 px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-white/80 cursor-pointer">
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
                <button onClick={() => switchVariant("prev")} className="flex items-center text-lg cursor-pointer">
                  <span className="text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>
                  </span>
                   <span>Prev</span>
                </button>
                <div className="h-20 w-px bg-[var(--accent)] max-sm:h-px max-sm:w-16" />
                <button onClick={() => switchVariant("next")} className="flex items-center text-lg cursor-pointer">
                  <span>Next</span>
                  <span className="text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
                  </span>
                </button>
                {/* <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                  {loading ? "Loading..." : "Ready"}
                </div> */}
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-5 text-xs uppercase tracking-[0.35em] text-white/50">
              <a href="https://instagram.com/panda_scoops" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
              </a>
              <a href="https://facebook.com/panda scoops" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
              </a>
                <a href="https://youtube.com/panda_scoops" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-youtube"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" /><path d="M10 9l5 3l-5 3l0 -6" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProductList products={productList} />
      <Testimonials/>
      

      <Footer />
    </div>
  );
}
