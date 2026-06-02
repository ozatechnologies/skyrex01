import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialStatementSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
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
      // Panel from bottom
      scrollTl.fromTo(
        panelRef.current,
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      // Text
      scrollTl.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      // Image from right
      scrollTl.fromTo(
        imageRef.current,
        { x: '45vw', opacity: 0, scale: 1.02 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.12
      );

      // Settle at 30%
      scrollTl.to({}, {}, 0.30);

      // EXIT (70-100%)
      scrollTl.fromTo(
        panelRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0.35, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        textRef.current,
        { y: 0, opacity: 1 },
        { y: -16, opacity: 0.25, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0.35, ease: 'power2.in' },
        0.70
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#0B0B0C] z-[90]"
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
        {/* Left Text */}
        <div
          ref={textRef}
          className="absolute flex flex-col justify-center will-change-transform"
          style={{
            left: '4vw',
            top: '12vh',
            width: '38vw',
            height: '56vh',
          }}
        >
          <h2
            className="text-[clamp(28px,3.5vw,52px)] font-bold text-[#0B0B0C] mb-6"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Designed for You
          </h2>

          <p className="text-[clamp(13px,1vw,16px)] text-[#0B0B0C]/70 leading-relaxed mb-8">
            Whether you&apos;re specifying for a high-rise or renovating a home, 
            Skyrex makes it easy to choose, sample, and order — backed by 
            technical support and pan-India delivery.
          </p>

          <ul className="space-y-3 mb-10">
            <li className="flex items-center gap-3 text-sm text-[#0B0B0C]/80">
              <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full flex-shrink-0" />
              Pan-India delivery
            </li>
            <li className="flex items-center gap-3 text-sm text-[#0B0B0C]/80">
              <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full flex-shrink-0" />
              Project pricing available
            </li>
            <li className="flex items-center gap-3 text-sm text-[#0B0B0C]/80">
              <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full flex-shrink-0" />
              Technical consultation
            </li>
          </ul>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B0B0C] link-underline w-fit"
          >
            Talk to our team
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Right Image */}
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
            src="/showroom.jpg"
            alt="Skyrex showroom"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
