import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

export const FixedBackground = memo(() => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(bgRef.current, { scale: 1 });
//  const idleTL = gsap.timeline({ repeat: -1 });
//         idleTL.to(
//           bgRef.current,
//           {
//             rotation: 360,
//             duration: 50,
//             ease: "none",
//             transformOrigin: "center center",
//           },
//           0
//         );
      gsap.to(bgRef.current, {
        scale: 2,
        ease: "none",
        scrollTrigger: {
          trigger: "#wrapper",          // نفس wrapper
          start: "top top",              // نفس بداية progress
          end: "bottom bottom",          // نفس نهايته
          scrub: true,
        },
      });
      ScrollTrigger.refresh();
    }, bgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed-background">
      <div  className="app-bg">
        <div className="app-bg-top-left" />
        <div className="app-bg-bottom-right" />
        <div ref={bgRef} className="app-bg-center" />
      </div>
    </div>
  );
});
