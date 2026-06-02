import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Floor Tiles',
    desc: 'High-traffic durability with a refined surface that elevates any interior.',
    cta: 'Explore finishes',
    image: '/floor_tile.jpg',
  },
  {
    title: 'Wall Tiles',
    desc: 'From subtle textures to bold statements, find the perfect wall expression.',
    cta: 'See designs',
    image: '/wall_detail.jpg',
  },
  {
    title: 'Sanitaryware',
    desc: 'Function-first, form-close-behind. Engineered for modern living.',
    cta: 'View collection',
    image: '/sanitary_ware.jpg',
  },
];

export default function TripleFeatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards reveal with stagger
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: '10vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.12,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B0B0C] py-[10vh] px-[4vw] z-[70]"
    >
      <h2
        ref={headingRef}
        className="text-center text-[clamp(28px,3vw,48px)] font-bold text-[#FFD700] mb-16 will-change-transform"
        style={{ fontFamily: 'Space Grotesk' }}
      >
        A Tile for Every Surface
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[3vw]">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="group cursor-pointer will-change-transform"
          >
            {/* Image */}
            <div
              className="relative overflow-hidden mb-6"
              style={{ height: '45vh', borderRadius: '2px' }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div>
              <h3
                className="text-xl font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors duration-300"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-[#A8A8A0] leading-relaxed mb-4">
                {feature.desc}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#FFD700] link-underline">
                {feature.cta}
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
