import { memo, useEffect, useRef } from "react";
import "./style.css";
import gsap from "gsap";
const imageData = [
  {
    id: 1,
    src: "/assets/images-hero/NewName_1.webp",
    alt: "",
    position: "center",
  },
  {
    id: 2,
    src: "/assets/images-hero/NewName_2.webp",
    alt: "",
    position: "center",
  },
  {
    id: 3,
    src: "/assets/images-hero/NewName_3.webp",
    alt: "",
    position: "center",
  },
  {
    id: 4,
    src: "/assets/images-hero/NewName_4.webp",
    alt: "",
    position: "center",
  },
  {
    id: 5,
    src: "/assets/images-hero/NewName_5.webp",
    alt: "",
    position: "center",
  },
  {
    id: 6,
    src: "/assets/images-hero/NewName_6.webp",
    alt: "",
    position: "right",
  },
  {
    id: 7,
    src: "/assets/images-hero/NewName_3.webp",
    alt: "",
    position: "center",
  },
  {
    id: 8,
    src: "/assets/images-hero/NewName_7.webp",
    alt: "",
    position: "center",
  },
  {
    id: 9,
    src: "/assets/images-hero/NewName_1.webp",
    alt: "",
    position: "center",
  },
  {
    id: 10,
    src: "/assets/images-hero/NewName_8.webp",
    alt: "",
    position: "center",
  },
  {
    id: 11,
    src: "/assets/images-hero/NewName_9.webp",
    alt: "",
    position: "center",
  },
  // {
  //   id: 12,
  //   src: "/assets/images-hero/NewName_6.webp",
  //   alt: "",
  //   position: "right",
  // },
  // {
  //   id: 13,
  //   src: "/assets/images-hero/NewName_8.webp",
  //   alt: "",
  //   position: "center",
  // },
];
export const HeroSection = memo(function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gsap.utils.toArray<HTMLDivElement>(".circle-item");

    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      const baseRadius = Math.min(
        window.innerHeight * 0.6,
        window.innerWidth * 0.6
      );

      items.forEach((item, idx) => {
        const angle = (idx / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * baseRadius;
        const y = Math.sin(angle) * baseRadius;
        gsap.set(item, { opacity: 0 });
        gsap.to(item, { x, y, opacity: 1, duration: 0.8, delay: idx * 0.1 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          STORIES OF
          <br /> <span className="primary-text">IMPACT</span>
        </h1>
        <p className="hero-description">
          Behind every milestone is a story. These are the changemakers driving
          Our VISION and the results speak for themselves.
        </p>
      </div>

      <div className="circles-container">
        {imageData.map((image) => (
          <img
            key={image.id}
            src={image.src}
            loading="lazy"
            style={{ objectPosition: image.position }}
            alt={image.alt}
            className="circle-item"
          />
        ))}
      </div>
    </section>
  );
});
