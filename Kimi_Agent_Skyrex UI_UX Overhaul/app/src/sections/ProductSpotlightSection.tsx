import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductSpotlightSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
      // Panel slides in from left
      scrollTl.fromTo(
        panelRef.current,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Headline
      scrollTl.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Body + CTA
      scrollTl.fromTo(
        bodyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.14
      );

      // Image from right
      scrollTl.fromTo(
        imageRef.current,
        { x: '50vw', opacity: 0, scale: 1.03 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.10
      );

      // Settle at 30%
      scrollTl.to({}, {}, 0.30);

      // EXIT (70-100%)
      scrollTl.fromTo(
        panelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0.3, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: -20, opacity: 0.25, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: 12, opacity: 0.2, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.35, ease: 'power2.in' },
        0.70
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#0B0B0C] z-40"
    >
      {/* Off-White Panel */}
      <div
        ref={panelRef}
        className="absolute bg-[#F2F2EA] will-change-transform"
        style={{
          left: '4vw',
          top: '10vh',
          width: '92vw',
          height: '80vh',
          borderRadius: '2px',
        }}
      >
        {/* Left Text Area */}
        <div
          className="absolute flex flex-col justify-center"
          style={{
            left: '4vw',
            top: '8vh',
            width: '34vw',
            height: '64vh',
          }}
        >
          <span className="font-mono-label text-[#0B0B0C]/50 mb-4">SIGNATURE PRODUCT</span>

          <h2
            ref={headlineRef}
            className="text-[clamp(28px,3.5vw,52px)] font-bold text-[#0B0B0C] mb-6 will-change-transform"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Signature Floor Tile
          </h2>

          <div ref={bodyRef} className="will-change-transform">
            <p className="text-[clamp(13px,1vw,16px)] text-[#0B0B0C]/70 leading-relaxed mb-8" style={{ maxWidth: '90%' }}>
              A full-bodied vitrified tile with a matte stone finish. High scratch 
              resistance, low porosity, and consistent tonality across batches.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <span className="block text-2xl font-semibold text-[#0B0B0C]" style={{ fontFamily: 'Space Grotesk' }}>600×600</span>
                <span className="font-mono-label text-[#0B0B0C]/50 mt-1">SIZE (MM)</span>
              </div>
              <div>
                <span className="block text-2xl font-semibold text-[#0B0B0C]" style={{ fontFamily: 'Space Grotesk' }}>R11</span>
                <span className="font-mono-label text-[#0B0B0C]/50 mt-1">ANTI-SLIP</span>
              </div>
              <div>
                <span className="block text-2xl font-semibold text-[#0B0B0C]" style={{ fontFamily: 'Space Grotesk' }}>&lt;0.05%</span>
                <span className="font-mono-label text-[#0B0B0C]/50 mt-1">WATER ABS.</span>
              </div>
            </div>

            <button className="px-8 py-3 bg-[#0B0B0C] text-[#FFD700] text-sm font-semibold hover:bg-[#1a1a1a] transition-colors duration-300">
              Request samples
            </button>

            <a href="#" className="block mt-4 text-sm text-[#0B0B0C]/60 hover:text-[#0B0B0C] link-underline w-fit">
              See technical specs →
            </a>
          </div>
        </div>

        {/* Right Product Image */}
        <div
          ref={imageRef}
          className="absolute overflow-hidden will-change-transform"
          style={{
            left: '48vw',
            top: '6vh',
            width: '44vw',
            height: '68vh',
            borderRadius: '2px',
          }}
        >
          <img
            src="/floor_tile.jpg"
            alt="Signature floor tile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
