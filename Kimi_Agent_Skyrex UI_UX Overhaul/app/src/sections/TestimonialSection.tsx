import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

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
      // Panel scales in
      scrollTl.fromTo(
        panelRef.current,
        { scale: 0.98, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Image from left
      scrollTl.fromTo(
        imageRef.current,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );

      // Quote mark
      scrollTl.fromTo(
        quoteMarkRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.12
      );

      // Quote text
      scrollTl.fromTo(
        quoteRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.16
      );

      // Settle at 30%
      scrollTl.to({}, {}, 0.30);

      // EXIT (70-100%)
      scrollTl.fromTo(
        panelRef.current,
        { opacity: 1 },
        { opacity: 0.35, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        imageRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0.3, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        quoteMarkRef.current,
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        quoteRef.current,
        { y: 0, opacity: 1 },
        { y: 12, opacity: 0.2, ease: 'power2.in' },
        0.70
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#0B0B0C] z-[100]"
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
        {/* Left Image */}
        <div
          ref={imageRef}
          className="absolute overflow-hidden will-change-transform"
          style={{
            left: '2vw',
            top: '2vh',
            width: '44vw',
            height: '76vh',
            borderRadius: '2px',
          }}
        >
          <img
            src="/testimonial.jpg"
            alt="Completed project interior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Quote Block */}
        <div
          className="absolute flex flex-col justify-center"
          style={{
            left: '52vw',
            top: '16vh',
            width: '38vw',
            height: '48vh',
          }}
        >
          {/* Quote Mark */}
          <div
            ref={quoteMarkRef}
            className="text-[80px] leading-none text-[#FFD700] font-serif mb-4 will-change-transform"
          >
            &ldquo;
          </div>

          {/* Quote */}
          <div ref={quoteRef} className="will-change-transform">
            <p
              className="text-[clamp(16px,1.3vw,22px)] text-[#0B0B0C]/85 leading-relaxed mb-8"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Skyrex tiles kept their finish after two monsoons. The consistency 
              across batches saved us rework, and the sanitaryware line completed 
              the look without extra coordination.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0B0B0C]/10 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-[#0B0B0C]">RM</span>
              </div>
              <div>
                <span
                  className="block text-sm font-semibold text-[#0B0B0C] uppercase tracking-wider"
                  style={{ fontFamily: 'IBM Plex Mono' }}
                >
                  Rajiv Menon
                </span>
                <span className="text-xs text-[#0B0B0C]/60">
                  Project Architect — Bangalore
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
