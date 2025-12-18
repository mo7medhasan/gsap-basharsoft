import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);


const panelsData = [
  {
    id: 1,
    value: 65.4,
    title: "SAUDI HOME OWNERSHIP",
    description:
      "A specific set of machine-readable public information that is publicly available, free of charge, without any restriction. ",
  },
    {
    id: 2,
    value: 8,
    title: "NUMBER OF SAUDI SITES ON UNESCO WORLD HERITAGE LIST",
    description:
      "A specific set of machine-readable public information that is publicly available, free of charge, without any restriction. ",
  },
    {
    id: 3,
    value: 65.4,
    title: "SAUDI HOME OWNERSHIP",
    description:
      "A specific set of machine-readable public information that is publicly available, free of charge, without any restriction. ",
  },
    {
    id: 4,
    
    value: 8,
    title: "NUMBER OF SAUDI SITES ON UNESCO WORLD HERITAGE LIST",
    description:
      "A specific set of machine-readable public information that is publicly available, free of charge, without any restriction. ",
  },
];
export const StoriesSection = memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const sectionEl = sectionRef.current;
    const ctx = gsap.context(() => {
      const panelEls = gsap.utils.toArray<HTMLElement>(".stories-card-content");
      const metricValue = sectionEl!.querySelectorAll(".metric-value")!;

      const depth = () => window.innerWidth * 0.5;

      // =====================
      // Initial State
      // =====================
      gsap.set(sectionEl, { perspective: 1400 });

      panelEls.forEach((panel, i) => {
        gsap.set(panel, {
          z: -i * 200,
          scale: 1 - i * 0.15,
          x:
            i % 2 === 0
              ? i > 1
                ? -depth() / 4
                : -depth() / 2
              : i > 1
              ? depth() / 4
              : depth() / 2,
          filter: `blur(${2 * i}px)`,
          opacity: 0.8,
        });
      });

      // =====================
      // Timeline
      // =====================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "+=140%",
          scrub: 1.5,
          pinSpacing:false,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        panelEls,
        {
          z: depth() / 2,
          scale: 1.2,
          x: (i) => (i % 2 === 0 ? -depth() / 1.5 : depth() / 1.5),
          filter: "blur(0px)",

          stagger: 1.4,
          opacity: 1,
          ease: "power2.in",
        },
        0
      );
      tl.to(
        panelEls,
        {
          z: depth(),
          scale: 2,
          x: (i) => (i % 2 === 0 ? -depth() / 0.3 : depth() / 0.3),

          stagger: 1.4,
          opacity: 1,
          duration: (i) => i + 1,
          ease: "power2.in",
        },
        0
      );

      // =====================
      // Counter Animation
      // =====================
   metricValue.forEach((item,i)=>{
      gsap.fromTo(
       item,
        { innerText: 0 },
        {
          innerText:`${i%2==0?panelsData[i].value: panelsData[i].value.toFixed(1)}${i%2==0?"%":""}`,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
          },
          snap: { innerText: 0.1 },
        }
      );
   }) 
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="stories-section">
      <div className="stories-container">
        <div className="stories-cards">
          {panelsData.map((panels) => (
            <div key={panels.id} className="stories-card-content">
              <h1 className="metric-value"></h1>
              <h5 className="metric-title">{panels.title}</h5>
              <p className="metric-description">
               {panels.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
