import { memo, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    img: "/assets/images/hero/NewName_6.webp",
    title: "From Purpose to Progress",
    desc: "Empowering Futures",
  },
  {
    img: "/assets/images/hero/NewName_3.webp",
    title: "Vision Turned Venture",
    desc: "Innovative Journeys",
  },
  {
    img: "/assets/images/hero/NewName_8.webp",
    title: "Building Tomorrow",
    desc: "Ideas into Impact",
  },
  {
    img: "/assets/images/hero/NewName_9.webp",
    title: "Stories That Matter",
    desc: "Driven by Change",
  },
];

export const GallerySection = memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cardsEl = gsap.utils.toArray<HTMLElement>(".zoom-card");
      const content = sectionRef.current!.querySelector(".gallery-content")!;
      const paragraph =
        sectionRef.current!.querySelector(".gallery-paragraph")!;
      const getRadius = () => window.innerWidth * 0.45;

      // ===============================
      // Initial State (DESIGN MATCH)
      // ===============================
      gsap.set(sectionRef.current, { perspective: 1200 });

      gsap.set(content, {
        z: -150,
        scale: 0.5,
        opacity: 0.8,
        filter: "blur(50px)",
      });

      cardsEl.forEach((card, i) => {
        gsap.set(card, {
          z: -i * 180,
          scale: 1 - i * 0.2,
          opacity: 1,
          filter: `grayscale(${20 * i}%)`,
          zIndex: 2,
          x:
            i % 2 === 0
              ? i > 1
                ? -getRadius() / 8
                : -getRadius() / 4
              : i > 1
              ? getRadius() / 8
              : getRadius() / 4,
        });
      });


      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          scrub: 1.5,
          end: "bottom top",
          pin: true,
          anticipatePin: 1,
          
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        cardsEl,
        {
          z: () => getRadius() / 0.5,
          scale: 2,
          opacity: 0.8,
          delay: 0.5,
          filter: "grayscale(0%)",
          duration: 8,
          zIndex: 5,
          x: (i) => ((i % 2 === 0 ? -1 : 1) * getRadius()) / 0.3,
          stagger: 0.5,
          ease: "power3.out",
        },
        0
      )
        .to(
          content,
          {
            z: 0,
            scale: 1,
            opacity: 1,
            duration: 3,
            delay: 1,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          0
        )
        .to(
          content,
          {
            z: 0,
            scale: 0,
            opacity: 1,
            duration: 2,
            delay: 10,
            filter: "blur(50px)",
            ease: "power3.out",
          },
          0
        )
        .to(
          paragraph,
          {
            z: 0,
            scale: 1,
            opacity: 1,
            duration: 2,
            delay: 11,
            filter: "blur(0.1px)",
            ease: "power3.out",
          },
          0
        ) .to(
          paragraph,
          {
            z: -300,
            scale: 0,
            opacity: 0,
            duration: 2,
            delay: 14,
            filter: "blur(15px)",
            ease: "power3.out",
          },
          0
        );
        ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="zoom-section">
      <div className="container-gallery">
        <div className="gallery-content">
          <h1 className="gallery-title">
            THEIR STORIES. OUR <br />
            <span className="primary-text">PROGRESS.</span>
          </h1>
          <p className="gallery-description">
            These are just some of the faces behind Our VISION. Together, we’re
            delivering real impact.
          </p>
        </div>

        <div className="zoom-gallery">
          {cards.map((c, i) => (
            <div key={i} className="zoom-card">
              <img src={c.img} alt={c.title} />
              <div className="card-content">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h5 className="gallery-paragraph">
          From pilgrimage tourism to business development, each number is a step
          toward a more empowered, prosperous Saudi Arabia.
        </h5>
      </div>
    </section>
  );
});
