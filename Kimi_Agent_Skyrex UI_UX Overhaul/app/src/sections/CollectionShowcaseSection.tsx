import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CollectionShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

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
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Right card from right
      scrollTl.fromTo(
        rightCardRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Text elements stagger
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        scrollTl.fromTo(
          el,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.10 + i * 0.05
        );
      });

      // Settle at 30%
      scrollTl.to({}, {}, 0.30);

      // EXIT (70-100%)
      scrollTl.fromTo(
        leftCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.35, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0.35, ease: 'power2.in' },
        0.70
      );

      textRefs.current.forEach((el) => {
        if (!el) return;
        scrollTl.fromTo(
          el,
          { opacity: 1 },
          { opacity: 0.25, ease: 'power2.in' },
          0.70
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="section-pinned bg-[#0B0B0C] z-[80]"
    >
      {/* Left Large Card */}
      <div
        ref={leftCardRef}
        className="absolute overflow-hidden group will-change-transform"
        style={{
          left: '4vw',
          top: '10vh',
          width: '56vw',
          height: '80vh',
          borderRadius: '2px',
        }}
      >
        <img
          src="/collection.jpg"
          alt="Complete tile collection"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        {/* Text overlay */}
        <div className="absolute" style={{ left: '6%', top: '10%' }}>
          <span
            ref={(el) => { textRefs.current[0] = el; }}
            className="font-mono-label text-[#FFD700] mb-4 block will-change-transform"
          >
            COLLECTIONS
          </span>
          <h2
            ref={(el) => { textRefs.current[1] = el; }}
            className="text-[clamp(28px,3.5vw,52px)] font-bold text-[#FFD700] mb-6 will-change-transform"
            style={{ fontFamily: 'Space Grotesk', maxWidth: '70%' }}
          >
            The Complete Collection
          </h2>
          <p
            ref={(el) => { textRefs.current[2] = el; }}
            className="text-sm text-white/80 leading-relaxed mb-8 will-change-transform"
            style={{ maxWidth: '55%' }}
          >
            Coordinate surfaces across a single palette — floor, wall, roof, and bath.
          </p>
          <a
            ref={(el) => { textRefs.current[3] = el; }}
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-white link-underline will-change-transform"
          >
            Browse by collection
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Right Card */}
      <div
        ref={rightCardRef}
        className="absolute overflow-hidden group will-change-transform"
        style={{
          left: '62vw',
          top: '10vh',
          width: '34vw',
          height: '80vh',
          borderRadius: '2px',
        }}
      >
        <img
          src="/roof_tile.jpg"
          alt="Roofscapes"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-8 left-8">
          <span
            ref={(el) => { textRefs.current[4] = el; }}
            className="font-mono-label text-[#FFD700] mb-2 block will-change-transform"
          >
            FEATURED
          </span>
          <h3
            ref={(el) => { textRefs.current[5] = el; }}
            className="text-[clamp(20px,2vw,32px)] font-semibold text-white mb-2 will-change-transform"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Roofscapes
          </h3>
          <p
            ref={(el) => { textRefs.current[6] = el; }}
            className="text-sm text-white/70 will-change-transform"
          >
            Engineered for sun, rain, and time.
          </p>
        </div>
      </div>
    </section>
  );
}
