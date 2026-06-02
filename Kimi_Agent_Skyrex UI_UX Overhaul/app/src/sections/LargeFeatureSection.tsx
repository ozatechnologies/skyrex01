import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LargeFeatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Left feature card from left
      scrollTl.fromTo(
        leftCardRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.06
      );

      // Right stack cards stagger from right
      rightCardsRef.current.forEach((card, i) => {
        if (!card) return;
        scrollTl.fromTo(
          card,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.10 + i * 0.07
        );
      });

      // Settle at 30%
      scrollTl.to({}, {}, 0.30);

      // EXIT (70-100%)
      scrollTl.fromTo(
        panelRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.03, opacity: 0.35, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        leftCardRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0.3, ease: 'power2.in' },
        0.70
      );

      rightCardsRef.current.forEach((card) => {
        if (!card) return;
        scrollTl.fromTo(
          card,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0.25, ease: 'power2.in' },
          0.70
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#0B0B0C] z-[60]"
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
        {/* Left Feature Card - Sanitaryware */}
        <div
          ref={leftCardRef}
          className="absolute overflow-hidden group will-change-transform"
          style={{
            left: '3vw',
            top: '4vh',
            width: '38vw',
            height: '72vh',
            borderRadius: '2px',
          }}
        >
          <img
            src="/sanitary_ware.jpg"
            alt="Modern sanitaryware"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3
              className="text-[clamp(24px,2.5vw,40px)] font-bold text-[#FFD700] mb-2"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Modern Solutions
            </h3>
            <p className="text-sm text-white/80 max-w-[80%]">
              Clean lines, water-saving engineering, easy maintenance.
            </p>
          </div>
        </div>

        {/* Right Stack */}
        <div
          className="absolute flex flex-col gap-[2vh]"
          style={{
            left: '44vw',
            top: '4vh',
            width: '44vw',
            height: '72vh',
          }}
        >
          {/* Top card - Residential */}
          <div
            ref={(el) => { rightCardsRef.current[0] = el; }}
            className="relative overflow-hidden group will-change-transform flex-shrink-0"
            style={{ height: '58%', borderRadius: '2px' }}
          >
            <img
              src="/residential.jpg"
              alt="Residential"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="font-mono-label text-[#FFD700] mb-1 block">APPLICATION</span>
              <h4 className="text-xl font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Residential</h4>
            </div>
          </div>

          {/* Bottom row - Commercial + Exteriors */}
          <div className="flex gap-[1.5vw] flex-1">
            <div
              ref={(el) => { rightCardsRef.current[1] = el; }}
              className="relative overflow-hidden group will-change-transform flex-1"
              style={{ borderRadius: '2px' }}
            >
              <img
                src="/commercial.jpg"
                alt="Commercial"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h4 className="text-lg font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Commercial</h4>
              </div>
            </div>

            <div
              ref={(el) => { rightCardsRef.current[2] = el; }}
              className="relative overflow-hidden group will-change-transform flex-1"
              style={{ borderRadius: '2px' }}
            >
              <img
                src="/exterior.jpg"
                alt="Exteriors"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h4 className="text-lg font-semibold text-white" style={{ fontFamily: 'Space Grotesk' }}>Exteriors</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
