import { memo, useEffect, useRef } from "react";
import "./style.css";
import gsap from "gsap";

// ==========================================
// 📊 DATA
// ==========================================
const imageData = [
  {
    id: 1,
    src: "/assets/images/hero/NewName_1.webp",
    
  },
  {
    id: 2,
    src: "/assets/images/hero/NewName_2.webp",
    
  },
  {
    id: 3,
    src: "/assets/images/hero/NewName_3.webp",
    
  },
  {
    id: 4,
    src: "/assets/images/hero/NewName_4.webp",
    
  },
  {
    id: 5,
    src: "/assets/images/hero/NewName_5.webp",
    
  },
  {
    id: 6,
    src: "/assets/images/hero/NewName_6.webp",
  
  },
  {
    id: 7,
    src: "/assets/images/hero/NewName_3.webp",
    
  },
  {
    id: 8,
    src: "/assets/images/hero/NewName_7.webp",
    
  },
  {
    id: 9,
    src: "/assets/images/hero/NewName_1.webp",
    
  },
  {
    id: 10,
    src: "/assets/images/hero/NewName_8.webp",
    
  },
  {
    id: 11,
    src: "/assets/images/hero/NewName_9.webp",
    
  },
];

// ==========================================
// 🎨 ANIMATION CONSTANTS
// ==========================================
const ANIMATION_CONFIG = {
  rotationDuration: 40,
  scrollScrub: 1.2,
  itemStagger: 0.03,
  radiusMultiplier: 0.6,
  scrollIconDuration: 0.5,
  scrollIconDistance: 10,
};

// ==========================================
// 🎯 COMPONENT
// ==========================================
export const HeroSection = memo(function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerEl = containerRef.current;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLImageElement>(".circle-item");
      const content_hero = containerEl.querySelectorAll(".hero-content");
      const hero_footer = containerEl.querySelectorAll(".hero-footer");
      if (items.length === 0) return;

      const count = items.length;
      const baseRadius =
        Math.min(window.innerWidth, window.innerHeight) *
        ANIMATION_CONFIG.radiusMultiplier;
      let currentRadius = baseRadius;

      // ==========================================
      // 1️⃣ INITIAL POSITIONING
      // ==========================================
      const setInitialPositions = () => {
        gsap.set(content_hero, {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        });

        gsap.set(hero_footer, {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        });
        items.forEach((item, i) => {
          const angle = (i / count) * Math.PI * 2;
          gsap.set(item, {
            x: Math.cos(angle) * baseRadius,
            y: Math.sin(angle) * baseRadius,
            opacity: 1,
          });
        });
      };

      setInitialPositions();

      // ==========================================
      // 2️⃣ IDLE CIRCULAR ROTATION ANIMATION
      // ==========================================
      const createIdleAnimation = () => {
        // Rotation animation for images
        const idleTL = gsap.timeline({ repeat: -1 });
        idleTL.to(
          items,
          {
            rotation: 360,
            duration: ANIMATION_CONFIG.rotationDuration,
            ease: "none",
            transformOrigin: "center center",
          },
          0
        );

        // Orbital movement
        const proxy = { angle: 0 };
        gsap.to(proxy, {
          angle: Math.PI * 2,
          duration: ANIMATION_CONFIG.rotationDuration,
          repeat: -1,
          ease: "none",
          onUpdate: () => {
            items.forEach((item, i) => {
              const angle = proxy.angle + (i / count) * Math.PI * 2;
              gsap.set(item, {
                x: Math.cos(angle) * currentRadius,
                y: Math.sin(angle) * currentRadius,
              });
            });
          },
        });

        return idleTL;
      };

      const idleTimeline = createIdleAnimation();

      // ==========================================
      // 3️⃣ SCROLL-TRIGGERED ANIMATION
      // ==========================================
      const createScrollAnimation = (idleTL: gsap.core.Timeline) => {
        const scrollTL = gsap.timeline({
          scrollTrigger: {
            trigger: containerEl,
            start: "top top",
            scrub: ANIMATION_CONFIG.scrollScrub,
            end: () => `+=${window.innerHeight}`,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,

            onEnter: () => idleTL.pause(),
            onLeaveBack: () => idleTL.play(),

            // تثبيت الحالة النهائية
            onLeave: () => {
              gsap.set(containerEl, { clearProps: "transform" });
            },
          },
        });

        // 🔵 Images
        scrollTL.to(
          items,
          {
            stagger: ANIMATION_CONFIG.itemStagger,
            opacity: 0,
            ease: "power3.out",
            onUpdate() {
              const progress = scrollTL.progress();
              const radius =
                baseRadius +
                progress * Math.max(window.innerWidth, window.innerHeight);

              currentRadius = radius;

              items.forEach((item, i) => {
                const angle =
                  progress * Math.PI * 2 + (i / count) * Math.PI * 2;
                gsap.set(item, {
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                  scale: 1 + progress * 2,
                });
              });
            },
          },
          0
        );

        // 🔵 Hero content
        scrollTL.to(
          content_hero,
          {
            y: 20,
            scale: 0,
            opacity: 0,
            filter: "blur(10px)",
            ease: "power3.out",
          },
          0
        );

        // 🔵 Footer
        scrollTL.to(
          hero_footer,
          {
            y: 200,
            scale: 0,
            opacity: 0,
            filter: "blur(10px)",
            ease: "power2.inOut",
          },
          0.15
        );
      };

      createScrollAnimation(idleTimeline);

      // ==========================================
      // 4️⃣ SCROLL ICON ANIMATION
      // ==========================================
      const createScrollIconAnimation = () => {
        gsap
          .timeline({
            repeat: -1,
            yoyo: true,
            defaults: { ease: "sine.inOut" },
          })
          .to(
            ".scroll-icon",
            {
              y: ANIMATION_CONFIG.scrollIconDistance,
              duration: ANIMATION_CONFIG.scrollIconDuration,
            },
            0
          );
      };

      createScrollIconAnimation();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ==========================================
  // 🎬 RENDER
  // ==========================================
  return (
    <section ref={containerRef} className="hero-section">
      <div className="hero-container">
        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            STORIES OF
            <br />
            <span className="primary-text">IMPACT</span>
          </h1>
          <p className="hero-description">
            Behind every milestone is a story. These are the changemakers
            driving Our VISION and the results speak for themselves.
          </p>
        </div>

        {/* Circular Image Gallery */}
        <div className="circles-container">
          {imageData.map((image) => (
            <img
              key={image.id}
              src={image.src}
              loading="lazy"
              style={{ objectPosition: "center"}}
              alt={image.src.slice(-10)}
              className="circle-item"
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="hero-footer">
          <img
            src="/assets/icons/scroll.svg"
            alt="Scroll Down"
            className="scroll-icon"
          />
          <span className="scroll-text">Scroll Down</span>
        </div>
      </div>
    </section>
  );
});
