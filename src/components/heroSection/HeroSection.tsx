"use client";

import { memo, useLayoutEffect, useRef } from "react";
import "./style.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imageData = [
  { id: 1, src: "/assets/images/hero/NewName_1.webp" },
  { id: 2, src: "/assets/images/hero/NewName_2.webp" },
  { id: 3, src: "/assets/images/hero/NewName_3.webp" },
  { id: 4, src: "/assets/images/hero/NewName_4.webp" },
  { id: 5, src: "/assets/images/hero/NewName_5.webp" },
  { id: 6, src: "/assets/images/hero/NewName_6.webp" },
  { id: 7, src: "/assets/images/hero/NewName_3.webp" },
  { id: 8, src: "/assets/images/hero/NewName_7.webp" },
  { id: 9, src: "/assets/images/hero/NewName_1.webp" },
  { id: 10, src: "/assets/images/hero/NewName_8.webp" },
  { id: 11, src: "/assets/images/hero/NewName_9.webp" },
];

export const HeroSection = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const lockScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      document.body.style.overflow = "";
    };

    lockScroll(); // 🔒 اقفل السكرول فورًا

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLImageElement>(".circle-item");
      const textLines = gsap.utils.toArray(".mask-line");
      const heroContent = ".hero-content";
      const heroFooter = ".hero-footer";

      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.6;
      const count = items.length;

      gsap.set(items, { x: 0, y: 0, scale: 0, opacity: 0 });
      gsap.set(textLines, { y: 200, rotation: -5 });
      gsap.set(".hero-description", {
        opacity: 0,
        y: 20,
        filter: "blur(6px)",
      });

      const createScrollTimeline = () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
              pin: true,
              pinSpacing: false,
              anticipatePin: 1,
            },
          })
          .to(items, {
            x: (i) => Math.cos((i / count) * Math.PI * 2) * radius,
            y: (i) => Math.sin((i / count) * Math.PI * 2) * radius,
            duration: 0,
            stagger: 0.005,
          })
          .to(items, { scale: 1, ease: "power3.inOut" })
          .to(items, {
            x: 0,
            y: 0,
            scale: 0,
            z: -300,
            duration: 3,
            stagger: 0.005,
            ease: "power3.inOut",
          })
          .to(textLines, {
            x: 500,
            stagger: 1,
            rotation: -20,
            duration: 2,
            delay: 3,
            ease: "power3.inOut",
          })
          .to(".hero-description", {
            opacity: 0,
            y: 20,
            filter: "blur(6px)",
            delay: 6,
            duration: 6,
          })
          .to(
            heroContent,
            {
              opacity: 0,
              scale: 0.85,
              delay: 7,
              duration: 7,
              filter: "blur(10px)",
            },
            0
          )
          .to(heroFooter, { opacity: 0, y: 40, delay: 8, duration: 8 }, 0);
      };
      const introTL = gsap.timeline({
        defaults: { ease: "expo.inOut" },
      });

      introTL
        .to(items, {
          x: (i) => Math.cos((i / count) * Math.PI * 2) * radius,
          y: (i) => Math.sin((i / count) * Math.PI * 2) * radius,
          duration: 2,
          stagger: 0.001,
          scale: 1,
          opacity: 1,
        })
        .to(textLines, {
          y: 0,
          rotation: 0,
          stagger: 0.08,
          duration: 0.8,
        })
        .to(
          ".hero-description",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
          },
          "-=0.4"
        )
        // .to(items, { scale: 1, opacity: 1, duration: 0.6 })
        // .add(() => {
        //   items.forEach((item, i) => {
        //     const angle = (i / count) * Math.PI * 2;
        //     gsap.to(item, {
        //       x: Math.cos(angle) * radius,
        //       y: Math.sin(angle) * radius,
        //       duration: 0.5,
        //       ease: "power3.out",
        //     });
        //   });
        // })
        .add(() => {
          unlockScroll(); // 🔓 افتح السكرول
          ScrollTrigger.refresh();
          createScrollTimeline(); // ⬇️
        });

      /* ===============================
         SCROLL ICON
      =============================== */
      gsap.to(".scroll-icon", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut",
      });
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title mask-text">
            <div className="mask-line">STORIES OF</div>
            <br />
            <div className="mask-line primary-text">IMPACT</div>
          </h1>

          <p className="hero-description">
            Behind every milestone is a story. These are the changemakers
            driving our vision.
          </p>
        </div>

        <div className="circles-container">
          {imageData.map((img) => (
            <img
              key={img.id}
              src={img.src}
              className="circle-item"
              alt="Story"
            />
          ))}
        </div>

        <div className="hero-footer">
          <img src="/assets/icons/scroll.svg" className="scroll-icon" />
          <span>Scroll Down</span>
        </div>
      </div>
    </section>
  );
});
