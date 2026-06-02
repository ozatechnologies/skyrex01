import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { label: 'Floor Tiles', image: '/floor_tile.jpg', desc: 'Durable. Elegant.' },
  { label: 'Wall Tiles', image: '/wall_tile.jpg', desc: 'Texture. Character.' },
  { label: 'Roof Tiles', image: '/roof_tile.jpg', desc: 'Weatherproof. Timeless.' },
  { label: 'Sanitaryware', image: '/sanitary_ware.jpg', desc: 'Modern. Refined.' },
];

export default function CategoryOverviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // ENTRANCE (0-30%): Cards stagger in
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        scrollTl.fromTo(
          card,
          { y: '18vh', opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, ease: 'none' },
          i * 0.06
        );
      });

      // Labels
      labelRefs.current.forEach((label, i) => {
        if (!label) return;
        scrollTl.fromTo(
          label,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.10 + i * 0.04
        );
      });

      // Settle at 30%
      scrollTl.to({}, {}, 0.30);

      // EXIT (70-100%): Cards exit upward
      cardRefs.current.forEach((card) => {
        if (!card) return;
        scrollTl.fromTo(
          card,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0.35, ease: 'power2.in' },
          0.70
        );
        scrollTl.to(card, { opacity: 0, ease: 'power2.in' }, 0.95);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="section-pinned bg-[#0B0B0C] z-30"
    >
      {/* Section eyebrow */}
      <div className="absolute top-[6vh] left-[4vw]">
        <span className="font-mono-label text-[#A8A8A0]">THE RANGE AT A GLANCE</span>
      </div>

      {/* 2x2 Grid */}
      <div className="absolute grid grid-cols-2 grid-rows-2 gap-[3vw]"
        style={{
          left: '4vw',
          top: '12vh',
          width: '92vw',
          height: '76vh',
        }}
      >
        {categories.map((cat, i) => (
          <div
            key={cat.label}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="relative overflow-hidden cursor-pointer group hover-lift will-change-transform"
            style={{ borderRadius: '2px' }}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Label */}
            <div
              ref={(el) => { labelRefs.current[i] = el; }}
              className="absolute bottom-6 left-6 will-change-transform"
            >
              <span className="font-mono-label text-[#FFD700] mb-2 block">{cat.desc}</span>
              <h3
                className="text-[clamp(20px,2vw,32px)] font-semibold text-white"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {cat.label}
              </h3>
              <span className="inline-flex items-center gap-2 mt-3 text-sm text-white/70 group-hover:text-[#FFD700] transition-colors">
                View range
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
