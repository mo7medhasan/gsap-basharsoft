import { memo, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
};

export const ScrollProgressNarrator = memo(({ children }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !progressRef.current || !barRef.current) return;

    const sections = Array.from(wrapperRef.current.children) as HTMLElement[];

    if (sections.length === 0) return;

    const firstSection = sections[0];
    const lastSection = sections[sections.length - 1];

    const ctx = gsap.context(() => {
      // =========================
      // 1️⃣ Show / Hide Narrator
      // =========================
     
      gsap.set(progressRef.current, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: firstSection,
        start: "top top",
        endTrigger: lastSection,
        end: "bottom top",
        onEnter: () =>
          gsap.to(progressRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          }),
        onLeaveBack: () =>
          gsap.to(progressRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.3,
          }),
      });

      // =========================
      // 2️⃣ Progress Animation
      // =========================
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: firstSection,
          start: "top top",
          endTrigger: lastSection,
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="wrapper">
      {/* Sections Wrapper */}
      <div ref={wrapperRef} id="wrapper">{children}</div>

      {/* Fixed Progress */}
      <div ref={progressRef} className="ScrollProgressNarrator">
        <div className="progress-track">
          <div ref={barRef} className="progress-bar" />
        </div>
      </div>
    </div>
  );
});
