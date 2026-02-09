"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { ImageGallery } from "../components/image-gallery";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <div className="w-full min-h-[40vh] md:mt-12 flex flex-col items-center justify-center font-[family-name:var(--font-bebas)]">
          <h1 className="text-5xl md:text-7xl">Gallery</h1>
          <p className="text-lg">PICS OR IT DIDN'T HAPPEN</p>
      </div>
      <ImageGallery/>
      <Footer />
    </div>
  );
}
