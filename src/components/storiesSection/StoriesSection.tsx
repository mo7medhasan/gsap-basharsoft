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

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stories-card-content");
      const metricValue =
        sectionRef.current!.querySelectorAll(".metric-value")!;

      const depth = () => window.innerWidth * 0.6;

      // gsap.set(sectionRef.current, { perspective: 1400 });

      // cards.forEach((card, i) => {
      //   gsap.set(card,

      //   });
      // });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
          // pinSpacing: false,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        cards,
        {z:(i)=>-i,
          scale: (i) => 0.8 - i * 0.15 ,
          x: (i) =>
            i % 2 === 0
              ? i > 1
                ? -depth() / 4
                : -depth() / 2
              : i > 1
              ? depth() / 4
              : depth() / 2,
          // filter: `blur(2px)`,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          opacity: 0.8,
        },
        {
          scale: 2,
          x: (i) => (i % 2 === 0 ? -depth() / 0.55 : depth() / 0.55),
          stagger: 0.8,
          duration: 5,
          filter: "blur(0px)",
          ease: "power2.inOut",
          opacity: 1,
          background: "rgba(255, 255, 255, 1);",
          backdropFilter: "blur(0px)",
        }
      );

      metricValue.forEach((item, i) => {
        gsap.fromTo(
          item,
          { innerText: 0 },
          {
            innerText: `${
              i % 2 == 0 ? panelsData[i].value : panelsData[i].value.toFixed(1)
            }${i % 2 == 0 ? "%" : ""}`,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
            },
            snap: { innerText: 0.1 },
          }
        );
      });
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="stories-section" id="stories">
      <div className="stories-container">
        <div className="stories-cards">
          {panelsData.map((panels) => (
            <div key={panels.id} className="stories-card-content">
              <h1 className="metric-value"></h1>
              <h5 className="metric-title">{panels.title}</h5>
              <p className="metric-description">{panels.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
