import { memo } from "react";
import "./style.css";
import { FixedBackground, GallerySection, HeroSection, StoriesSection } from "../";


export const PageContent = memo(function PageContent() {
  return (
    <div className="app-root">
      <FixedBackground />

      {/* Page Content */}
      <main className="app-content">
        <HeroSection />
        <GallerySection/>
        <StoriesSection />
      </main>
    </div>
  );
});
