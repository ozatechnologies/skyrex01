import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatementSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
      // Watermark
      scrollTl.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 0.06, scale: 1, ease: 'none' },
        0
      );

      // Headline line 1
      scrollTl.fromTo(
        line1Ref.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Headline line 2
      scrollTl.fromTo(
        line2Ref.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.13
      );

      // Body
      scrollTl.fromTo(
        bodyRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // CTA
      scrollTl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // Set keyframes at 30% (settle start)
      scrollTl.to({}, {}, 0.30);

      // EXIT (70-100%)
      scrollTl.fromTo(
        watermarkRef.current,
        { opacity: 0.06, scale: 1 },
        { opacity: 0, scale: 1.04, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        line1Ref.current,
        { y: 0, opacity: 1 },
        { y: -40, opacity: 0.25, ease: 'power2.in' },
        0.70
      );
      scrollTl.to(line1Ref.current, { opacity: 0, ease: 'power2.in' }, 0.95);

      scrollTl.fromTo(
        line2Ref.current,
        { y: 0, opacity: 1 },
        { y: -40, opacity: 0.25, ease: 'power2.in' },
        0.72
      );
      scrollTl.to(line2Ref.current, { opacity: 0, ease: 'power2.in' }, 0.95);

      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: 20, opacity: 0.2, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: 16, opacity: 0.2, ease: 'power2.in' },
        0.72
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pinned bg-[#0B0B0C] z-20"
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
      >
        <span
          className="text-[#F2F2EA] font-bold select-none whitespace-nowrap"
          style={{
            fontSize: '22vw',
            fontFamily: 'Space Grotesk',
            opacity: 0.06,
          }}
        >
          QUALITY
        </span>
      </div>

      {/* Content */}
      <div className="absolute" style={{ left: '10vw', top: '36vh' }}>
        <h2
          className="text-[clamp(32px,4.5vw,64px)] font-bold leading-[1.05] mb-6"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          <span ref={line1Ref} className="block text-[#FFD700] will-change-transform">
            Quality is the driver
          </span>
          <span ref={line2Ref} className="block text-[#FFD700] will-change-transform">
            of everything we do.
          </span>
        </h2>

        <p
          ref={bodyRef}
          className="text-[clamp(14px,1.1vw,18px)] text-[#A8A8A0] leading-relaxed mb-8 will-change-transform"
          style={{ maxWidth: '38vw' }}
        >
          From raw material selection to kiln-firing and final finish, every Skyrex 
          product is tested for strength, finish consistency, and climate resilience.
        </p>

        <a
          ref={ctaRef}
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#FFD700] link-underline will-change-transform"
        >
          See how we manufacture
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-0.5">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
