import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TwoPanelSplitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const leftLabelRef = useRef<HTMLDivElement>(null);
  const rightLabelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Left card from left
      scrollTl.fromTo(
        leftCardRef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right card from right
      scrollTl.fromTo(
        rightCardRef.current,
        { x: '55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Labels
      scrollTl.fromTo(
        leftLabelRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        rightLabelRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.16
      );

      // Settle at 30%
      scrollTl.to({}, {}, 0.30);

      // EXIT (70-100%)
      scrollTl.fromTo(
        leftCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0.35, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0.35, ease: 'power2.in' },
        0.70
      );

      scrollTl.to([leftCardRef.current, rightCardRef.current], { opacity: 0, ease: 'power2.in' }, 0.95);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="applications"
      className="section-pinned bg-[#0B0B0C] z-50"
    >
      {/* Section eyebrow */}
      <div className="absolute top-[6vh] left-[4vw]">
        <span className="font-mono-label text-[#A8A8A0]">EXPLORE THE RANGE</span>
      </div>

      {/* Left Card - Roof Tiles */}
      <div
        ref={leftCardRef}
        className="absolute overflow-hidden cursor-pointer group will-change-transform"
        style={{
          left: '4vw',
          top: '12vh',
          width: '44vw',
          height: '76vh',
          borderRadius: '2px',
        }}
      >
        <img
          src="/roof_tile.jpg"
          alt="Roof tiles"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div
          ref={leftLabelRef}
          className="absolute bottom-8 left-8 will-change-transform"
        >
          <h3
            className="text-[clamp(24px,2.5vw,40px)] font-semibold text-white mb-2"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Roof Tiles
          </h3>
          <p className="text-sm text-white/70 mb-4">Weatherproof. Timeless profiles.</p>
          <span className="inline-flex items-center gap-2 text-sm text-[#FFD700]">
            Explore
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* Right Card - Wall Tiles */}
      <div
        ref={rightCardRef}
        className="absolute overflow-hidden cursor-pointer group will-change-transform"
        style={{
          left: '52vw',
          top: '12vh',
          width: '44vw',
          height: '76vh',
          borderRadius: '2px',
        }}
      >
        <img
          src="/wall_tile.jpg"
          alt="Wall tiles"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div
          ref={rightLabelRef}
          className="absolute bottom-8 left-8 will-change-transform"
        >
          <h3
            className="text-[clamp(24px,2.5vw,40px)] font-semibold text-white mb-2"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Wall Tiles
          </h3>
          <p className="text-sm text-white/70 mb-4">Textures that define a room.</p>
          <span className="inline-flex items-center gap-2 text-sm text-[#FFD700]">
            Explore
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
