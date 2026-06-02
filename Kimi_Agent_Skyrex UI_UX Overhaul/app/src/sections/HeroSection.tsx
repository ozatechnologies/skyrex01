import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Image card slides in
      tl.fromTo(
        imageCardRef.current,
        { x: '-12vw', opacity: 0, scale: 1.04 },
        { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
        0
      );

      // Text card slides in
      tl.fromTo(
        textCardRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        0.08
      );

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.5
      );

      // Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.04 },
          0.6
        );
      }

      // Body
      tl.fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.9
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        1.0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.set([imageCardRef.current, textCardRef.current], { opacity: 1, x: 0 });
          },
        },
      });

      // EXIT (70-100%): cards exit
      scrollTl.fromTo(
        imageCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.25, ease: 'power2.in' },
        0.70
      );
      scrollTl.to(imageCardRef.current, { opacity: 0, ease: 'power2.in' }, 0.95);

      scrollTl.fromTo(
        textCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0.35, ease: 'power2.in' },
        0.70
      );
      scrollTl.to(textCardRef.current, { opacity: 0, ease: 'power2.in' }, 0.95);
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineWords = 'Enduring Materials. Modern Living.'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-[#0B0B0C] z-10"
    >
      {/* Left Image Card */}
      <div
        ref={imageCardRef}
        className="absolute will-change-transform"
        style={{
          left: '4vw',
          top: '10vh',
          width: '56vw',
          height: '80vh',
        }}
      >
        <img
          src="/hero_tile.jpg"
          alt="Terracotta roof tiles"
          className="w-full h-full object-cover"
          style={{ borderRadius: '2px' }}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Right Text Card */}
      <div
        ref={textCardRef}
        className="absolute bg-[#FFD700] will-change-transform flex flex-col justify-center px-[6%]"
        style={{
          left: '62vw',
          top: '10vh',
          width: '34vw',
          height: '80vh',
          borderRadius: '2px',
        }}
      >
        <span
          ref={eyebrowRef}
          className="font-mono-label text-[#0B0B0C]/70 mb-6"
        >
          BUILDING MATERIALS
        </span>

        <h1
          ref={headlineRef}
          className="text-[clamp(28px,3.5vw,52px)] font-bold text-[#0B0B0C] leading-[1.05] mb-8"
          style={{ fontFamily: 'Space Grotesk', maxWidth: '90%' }}
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={bodyRef}
          className="text-[clamp(13px,1vw,16px)] text-[#0B0B0C]/80 leading-relaxed mb-10"
          style={{ maxWidth: '85%' }}
        >
          Skyrex India delivers high-performance roof tiles, precision floor tiles, 
          wall tiles, and refined sanitaryware — engineered for architects, builders, 
          and homeowners who value longevity.
        </p>

        <a
          ref={ctaRef}
          href="#categories"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B0B0C] link-underline w-fit"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#categories')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore the range
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Hairline divider */}
      <div
        className="absolute bg-white/10"
        style={{
          left: '61vw',
          top: '10vh',
          width: '1px',
          height: '80vh',
        }}
      />
    </section>
  );
}
