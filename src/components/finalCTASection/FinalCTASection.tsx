import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import "./style.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
export const FinalCTASection = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const contentEl =
        containerRef.current!.querySelector(".FinalCTA-content");

      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          // pinSpacing: false,
          anticipatePin: 1,
        },
      });

      t1.fromTo(
        contentEl,
        {
          scale: 0.5,
          z: -300,
          opacity: 0.1,
          // y: 100,
          filter: "blur(50px)",
        },
        {
          opacity: 1,
          scale: 1,
          z: 0,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
          },
        }
      );
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);
  const handleScrollToStories = (target : string) => {
    ScrollTrigger.getAll().forEach(st => {
      if (st.pin) st.disable(false);
    });
  
    gsap.to(window, {
      scrollTo: { y: target },
      duration: 1.5,
      ease: "power3.inOut",
      onComplete: () => {
        ScrollTrigger.getAll().forEach(st => st.enable());
        ScrollTrigger.refresh();
      },
    });
  };
  

  return (
    <section ref={containerRef} className="FinalCTA-section">
      <div className="FinalCTA-container">
        <div className="FinalCTA-content">
          <h1 className="FinalCTA-title">
            JOIN THE VISION. <br />
            <span className="primary-text">SHAPE THE FUTURE.</span>
          </h1>

          <p className="FinalCTA-description">
            These are just some of the faces behind Our VISION. Together, we’re
            delivering real impact reflected in the numbers.
          </p>

          <div className="btn-container">
            <button className="btn"  onClick={() => handleScrollToStories("#wrapper")}>ANNUAL REPORT</button>
            <button className="btn btn-primary" onClick={() => handleScrollToStories(".zoom-section")}>
              OUR VISION KPIS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
