import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

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

      // Form fields
      const fields = formRef.current?.querySelectorAll('.form-field');
      if (fields) {
        fields.forEach((field, i) => {
          scrollTl.fromTo(
            field,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.12 + i * 0.03
          );
        });
      }

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

      if (fields) {
        scrollTl.fromTo(
          fields,
          { opacity: 1 },
          { opacity: 0.25, ease: 'power2.in' },
          0.70
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pinned bg-[#0B0B0C] z-[110]"
    >
      {/* Left Card - Form */}
      <div
        ref={leftCardRef}
        className="absolute bg-[#FFD700] will-change-transform flex flex-col justify-center px-[4vw]"
        style={{
          left: '4vw',
          top: '10vh',
          width: '44vw',
          height: '80vh',
          borderRadius: '2px',
        }}
      >
        <h2
          className="text-[clamp(28px,3vw,48px)] font-bold text-[#0B0B0C] mb-4"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          Ready to Build?
        </h2>
        <p className="text-sm text-[#0B0B0C]/70 mb-8" style={{ maxWidth: '85%' }}>
          Tell us what you need. We&apos;ll share catalogs, pricing, and delivery timelines.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="form-field">
            <label className="font-mono-label text-[#0B0B0C]/60 mb-1 block">NAME</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b border-[#0B0B0C]/30 py-2 text-[#0B0B0C] placeholder-[#0B0B0C]/40 focus:outline-none focus:border-[#0B0B0C] transition-colors"
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-field">
            <label className="font-mono-label text-[#0B0B0C]/60 mb-1 block">EMAIL</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b border-[#0B0B0C]/30 py-2 text-[#0B0B0C] placeholder-[#0B0B0C]/40 focus:outline-none focus:border-[#0B0B0C] transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-field">
            <label className="font-mono-label text-[#0B0B0C]/60 mb-1 block">PHONE</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-transparent border-b border-[#0B0B0C]/30 py-2 text-[#0B0B0C] placeholder-[#0B0B0C]/40 focus:outline-none focus:border-[#0B0B0C] transition-colors"
              placeholder="+91 00000 00000"
            />
          </div>

          <div className="form-field">
            <label className="font-mono-label text-[#0B0B0C]/60 mb-1 block">MESSAGE</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              className="w-full bg-transparent border-b border-[#0B0B0C]/30 py-2 text-[#0B0B0C] placeholder-[#0B0B0C]/40 focus:outline-none focus:border-[#0B0B0C] transition-colors resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          <button
            type="submit"
            className="form-field mt-6 px-8 py-3 bg-[#0B0B0C] text-[#FFD700] text-sm font-semibold hover:bg-[#1a1a1a] transition-colors duration-300 active:scale-[0.98]"
          >
            Send inquiry
          </button>
        </form>

        <div className="mt-6 flex gap-6">
          <a href="#" className="text-xs text-[#0B0B0C]/60 hover:text-[#0B0B0C] link-underline">
            Download catalog (PDF)
          </a>
          <a href="#" className="text-xs text-[#0B0B0C]/60 hover:text-[#0B0B0C] link-underline">
            Email us
          </a>
        </div>
      </div>

      {/* Right Card - Image */}
      <div
        ref={rightCardRef}
        className="absolute overflow-hidden will-change-transform"
        style={{
          left: '52vw',
          top: '10vh',
          width: '44vw',
          height: '80vh',
          borderRadius: '2px',
        }}
      >
        <img
          src="/showroom.jpg"
          alt="Skyrex showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-8 left-8">
          <span className="font-mono-label text-[#FFD700] mb-2 block">VISIT THE SHOWROOM</span>
          <h3
            className="text-xl font-semibold text-white mb-2"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Skyrex India
          </h3>
          <p className="text-sm text-white/70">
            Morbi, Gujarat — India&apos;s Ceramic Capital
          </p>
        </div>
      </div>
    </section>
  );
}
