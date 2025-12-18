import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

export const FinalCTASection = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const contentEl =
        containerRef.current!.querySelector(".FinalCTA-content");

      if (!contentEl) return;

      // enable 3D
      gsap.set(containerRef.current, { perspective: 1200 });

      gsap.fromTo(
        contentEl,
        {
          scale: 3,
          z: 300,
          y: 120,
          filter: "blur(12px)",
          opacity: 0,
        },
        {
          scale: 1,
          z: 0,
          y: 0,
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end:"bottom top",
            // pinSpacing: false,
            pin: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
            <button className="btn">ANNUAL REPORT</button>
            <button className="btn btn-primary">OUR VISION KPIS</button>
          </div>
        </div>
      </div>
    </section>
  );
});
