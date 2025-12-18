import { memo } from "react";
import "./style.css";
import {
  FinalCTASection,
  FixedBackground,
  GallerySection,
  HeroSection,
  ScrollProgressNarrator,
  StoriesSection,
} from "../";

export const PageContent = memo(function PageContent() {
  return (
    <div className="app-root">
      <FixedBackground />

      {/* Page Content */}
      <main className="app-content">
        <HeroSection />
        <ScrollProgressNarrator>
          <GallerySection />
          <StoriesSection />
          <FinalCTASection />
        </ScrollProgressNarrator>
      </main>
    </div>
  );
});
