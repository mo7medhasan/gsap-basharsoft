import { memo } from "react";
import "./style.css";
import { FixedBackground, HeroSection } from "../";


export const PageContent = memo(function PageContent() {
  return (
    <div className="app-root">
      <FixedBackground />

      {/* Page Content */}
      <main className="app-content">
        <HeroSection />
      </main>
    </div>
  );
});
