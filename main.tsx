import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowDown, Download, Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ======================================================== */
/* NAVBAR COMPONENT                                         */
/* ======================================================== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Check if we're in a dark section
      const darkSections = document.querySelectorAll('.dark-section');
      let inDark = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < 80 && rect.bottom > 80) {
          inDark = true;
        }
      });
      setIsDark(inDark);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navClass = scrolled
    ? isDark
      ? 'navbar navbar-dark'
      : 'navbar navbar-scrolled'
    : 'navbar';

  return (
    <nav className={navClass}>
      <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        SKYREX
      </a>
      <ul className="nav-links">
        <li><a href="#products" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('roofing'); }}>Products</a></li>
        <li><a href="#projects" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>Projects</a></li>
        <li><a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('morbi'); }}>About</a></li>
        <li><a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
      </ul>
    </nav>
  );
}

/* ======================================================== */
/* PRODUCT SECTION COMPONENT (reusable for S3-S7)            */
/* ======================================================== */
interface ProductSectionProps {
  id: string;
  zIndex: number;
  image: string;
  headline: string[];
  accentWord: string;
  cta: string;
  body: string;
}

function ProductSection({ id, zIndex, image, headline, accentWord, cta, body }: ProductSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imgEl = imageRef.current;
    const headEl = headlineRef.current;
    const ctaEl = ctaRef.current;
    const bodyEl = bodyRef.current;
    if (!section || !imgEl || !headEl || !ctaEl || !bodyEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      tl.fromTo(imgEl, { x: '-70vw', opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
      tl.fromTo(headEl, { x: '35vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      tl.fromTo(ctaEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      tl.fromTo(bodyEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08);

      // SETTLE (30% - 70%) - no animation

      // EXIT (70% - 100%)
      tl.to(imgEl, { x: '-40vw', opacity:0.3, ease:'power2.in' }, 0.70);
      tl.to(headEl, { x: '18vw', opacity:0, ease:'power2.in' }, 0.70);
      tl.to(ctaEl, { y: 10, opacity: 0, ease: 'power2.in' }, 0.70);
      tl.to(bodyEl, { y: 10, opacity: 0, ease: 'power2.in' }, 0.70);

      // Fade out remaining opacity at the very end
      tl.to(imgEl, { opacity: 0, duration: 0.05 }, 0.95);
    }, section);

    return () => ctx.revert();
  }, []);

  const renderHeadline = () => {
    return headline.map((line, i) => (
      <span key={i} className="block overflow-hidden">
        <span className="headline-line block">
          {line}{i === headline.length - 1 && <span className="accent-word">{accentWord}</span>}
        </span>
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="pinned-section product-section"
      style={{ zIndex, backgroundColor: 'var(--skyrex-stone)' }}
    >
      {/* Left Image Frame */}
      <div
        ref={imageRef}
        className="img-frame"
        style={{ left: '6vw', top: '14vh', width: '46vw', height: '72vh' }}
      >
        <img src={image} alt={headline.join(' ')} />
      </div>

      {/* Right Headline Block */}
      <div
        ref={headlineRef}
        className="absolute font-display"
        style={{ left: '58vw', top: '14vh', width: '36vw' }}
      >
        <h2
          className="font-display font-bold leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(36px, 4.5vw, 72px)', color: 'var(--skyrex-text)' }}
        >
          {renderHeadline()}
        </h2>
      </div>

      {/* CTA Row */}
      <div
        ref={ctaRef}
        className="absolute"
        style={{ left: '58vw', top: '54vh', width: '36vw' }}
      >
        <div className="hairline mb-6" style={{ width: '22vw' }} />
        <button className="cta-btn">
          {cta}
          <ArrowRight className="cta-arrow" size={16} />
        </button>
      </div>

      {/* Bottom Paragraph */}
      <p
        ref={bodyRef}
        className="absolute font-body leading-relaxed"
        style={{
          left: '6vw',
          top: '78vh',
          width: '44vw',
          fontSize: 'clamp(13px, 1vw, 15px)',
          color: 'var(--skyrex-text-secondary)',
        }}
      >
        {body}
      </p>

      {/* Scroll Cue */}
      <div className="scroll-cue absolute" style={{ left: '58vw', top: '82vh' }}>
        <span>Scroll to explore</span>
        <ArrowDown className="scroll-cue-arrow" size={14} />
      </div>
    </section>
  );
}

/* ======================================================== */
/* MAIN APP COMPONENT                                       */
/* ======================================================== */
function App() {
  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroBodyRef = useRef<HTMLParagraphElement>(null);
  const heroScrollCueRef = useRef<HTMLDivElement>(null);

  const morbiRef = useRef<HTMLElement>(null);
  const morbiImageRef = useRef<HTMLDivElement>(null);
  const morbiHeadlineRef = useRef<HTMLDivElement>(null);
  const morbiCtaRef = useRef<HTMLDivElement>(null);
  const morbiBodyRef = useRef<HTMLParagraphElement>(null);

  const craftRef = useRef<HTMLElement>(null);
  const craftHeadlineRef = useRef<HTMLHeadingElement>(null);
  const craftLineRef = useRef<HTMLDivElement>(null);

  const projectsRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const testimonialRef = useRef<HTMLElement>(null);
  const testImageRef = useRef<HTMLDivElement>(null);
  const testHeadlineRef = useRef<HTMLDivElement>(null);
  const testQuoteRef = useRef<HTMLDivElement>(null);

  const downloadsRef = useRef<HTMLElement>(null);
  const downloadsImageRef = useRef<HTMLDivElement>(null);
  const downloadsListRef = useRef<HTMLDivElement>(null);

  const contactRef = useRef<HTMLElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);

  // Hero entrance animation (auto-play on load)
  useEffect(() => {
    const heroImage = heroImageRef.current;
    const heroHeadline = heroHeadlineRef.current;
    const heroCta = heroCtaRef.current;
    const heroBody = heroBodyRef.current;
    const heroScrollCue = heroScrollCueRef.current;

    if (!heroImage || !heroHeadline || !heroCta || !heroBody || !heroScrollCue) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(heroImage, { opacity: 0, scale: 1.06, x: '-6vw' }, { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: 'power2.out' })
      .fromTo(heroHeadline.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power2.out' }, '-=0.5')
      .fromTo(heroCta, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .fromTo(heroBody, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .fromTo(heroScrollCue, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2');

    return () => { tl.kill(); };
  }, []);

  // Hero scroll-driven exit animation
  useEffect(() => {
    const section = heroRef.current;
    const heroImage = heroImageRef.current;
    const heroHeadline = heroHeadlineRef.current;
    const heroCta = heroCtaRef.current;
    const heroBody = heroBodyRef.current;
    const heroScrollCue = heroScrollCueRef.current;
    if (!section || !heroImage || !heroHeadline || !heroCta || !heroBody || !heroScrollCue) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set(heroImage, { x: 0, scale: 1, opacity: 1 });
            gsap.set(heroHeadline, { x: 0, opacity: 1 });
            gsap.set(heroCta, { y: 0, opacity: 1 });
            gsap.set(heroBody, { y: 0, opacity: 1 });
            gsap.set(heroScrollCue, { opacity: 1 });
          },
        },
      });

      // Phase 1-2 (0% - 70%): Hold - no animation

      // Phase 3 (70% - 100%): Exit
      tl.to(heroHeadline, { x: '28vw', opacity: 0, ease: 'power2.in' }, 0.70);
      tl.to(heroImage, { x: '-40vw', scale: 0.96, opacity: 0.35, ease: 'power2.in' }, 0.70);
      tl.to(heroBody, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.70);
      tl.to(heroCta, { opacity: 0, ease: 'power2.in' }, 0.70);
      tl.to(heroScrollCue, { opacity: 0, ease: 'power2.in' }, 0.70);

      // Final fade
      tl.to(heroImage, { opacity: 0, duration: 0.05 }, 0.95);
    }, section);

    return () => ctx.revert();
  }, []);

  // Morbi section
  useEffect(() => {
    const section = morbiRef.current;
    const imgEl = morbiImageRef.current;
    const headEl = morbiHeadlineRef.current;
    const ctaEl = morbiCtaRef.current;
    const bodyEl = morbiBodyRef.current;
    if (!section || !imgEl || !headEl || !ctaEl || !bodyEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      tl.fromTo(imgEl, { x: '-60vw', opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
      tl.fromTo(headEl, { x: '40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      tl.fromTo(ctaEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      tl.fromTo(bodyEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08);

      tl.to(imgEl, { x: '-35vw', opacity: 0.3, ease: 'power2.in' }, 0.70);
      tl.to(headEl, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.70);
      tl.to(ctaEl, { y: 10, opacity: 0, ease: 'power2.in' }, 0.70);
      tl.to(bodyEl, { y: 10, opacity: 0, ease: 'power2.in' }, 0.70);

      tl.to(imgEl, { opacity: 0, duration: 0.05 }, 0.95);
    }, section);

    return () => ctx.revert();
  }, []);

  // Craft Statement section
  useEffect(() => {
    const section = craftRef.current;
    const headEl = craftHeadlineRef.current;
    const lineEl = craftLineRef.current;
    if (!section || !headEl || !lineEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      tl.fromTo(headEl, { y: '40vh', opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
      tl.fromTo(lineEl, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0.15);

      tl.to(headEl, { y: '-30vh', opacity: 0, ease: 'power2.in' }, 0.70);
      tl.to(lineEl, { scaleX: 0, ease: 'power2.in' }, 0.70);
    }, section);

    return () => ctx.revert();
  }, []);

  // Projects slider drag
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const handleMouseLeave = () => { isDown = false; };
    const handleMouseUp = () => { isDown = false; };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Projects scroll reveal
  useEffect(() => {
    const section = projectsRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.projects-header'),
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 55%', scrub: true },
        }
      );

      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
        gsap.fromTo(card, { x: '8vw', opacity: 0, scale: 0.98 }, {
          x: 0, opacity: 1, scale: 1,
          scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 60%', scrub: true },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Testimonials section
  useEffect(() => {
    const section = testimonialRef.current;
    const imgEl = testImageRef.current;
    const headEl = testHeadlineRef.current;
    const quoteEl = testQuoteRef.current;
    if (!section || !imgEl || !headEl || !quoteEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      tl.fromTo(imgEl, { x: '-70vw', opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
      tl.fromTo(headEl, { x: '35vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0);
      tl.fromTo(quoteEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);

      tl.to(imgEl, { x: '-40vw', opacity: 0.3, ease: 'power2.in' }, 0.70);
      tl.to(headEl, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.70);
      tl.to(quoteEl, { y: 10, opacity: 0, ease: 'power2.in' }, 0.70);

      tl.to(imgEl, { opacity: 0, duration: 0.05 }, 0.95);
    }, section);

    return () => ctx.revert();
  }, []);

  // Downloads section
  useEffect(() => {
    const section = downloadsRef.current;
    const imgEl = downloadsImageRef.current;
    const listEl = downloadsListRef.current;
    if (!section || !imgEl || !listEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(imgEl, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1,
        scrollTrigger: { trigger: section, start: 'top 75%', end: 'top 50%', scrub: true },
      });

      gsap.utils.toArray<HTMLElement>('.download-row').forEach((row, i) => {
        gsap.fromTo(row, { y: 18, opacity: 0 }, {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: row, start: 'top 90%', end: 'top 75%', scrub: true },
          delay: i * 0.05,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Contact section
  useEffect(() => {
    const section = contactRef.current;
    const formEl = contactFormRef.current;
    if (!section || !formEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.contact-title'),
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: section, start: 'top 75%', end: 'top 55%', scrub: true },
        }
      );

      gsap.utils.toArray<HTMLElement>('.form-field').forEach((field, i) => {
        gsap.fromTo(field, { y: 16, opacity: 0 }, {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: field, start: 'top 92%', end: 'top 80%', scrub: true },
          delay: i * 0.06,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Global snap for pinned sections
  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some((r) => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Project data
  const projects = [
    { image: '/project_residence_kerala.jpg', caption: 'Residence', location: 'Kerala' },
    { image: '/project_hotel_rajasthan.jpg', caption: 'Boutique Hotel', location: 'Rajasthan' },
    { image: '/project_wellness_karnataka.jpg', caption: 'Wellness Centre', location: 'Karnataka' },
    { image: '/project_commercial_gujarat.jpg', caption: 'Commercial Facade', location: 'Gujarat' },
    { image: '/project_villa_goa.jpg', caption: 'Villa Complex', location: 'Goa' },
  ];

  const downloads = [
    { title: 'Full Product Catalog (2026)', type: 'PDF', size: '8 MB' },
    { title: 'Roofing Tile Technical Sheet', type: 'PDF', size: '2 MB' },
    { title: 'Floor Tile Install Guide', type: 'PDF', size: '3 MB' },
    { title: 'Sanitaryware Care Manual', type: 'PDF', size: '1 MB' },
    { title: 'Clay Tile Heritage Range', type: 'PDF', size: '4 MB' },
  ];

  return (
    <div className="relative">
      <Navbar />

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* ======== SECTION 1: HERO ======== */}
      <section
        ref={heroRef}
        className="pinned-section"
        style={{ zIndex: 10, backgroundColor: 'var(--skyrex-stone)' }}
      >
        {/* Hero Image Frame */}
        <div
          ref={heroImageRef}
          className="img-frame"
          style={{ left: '6vw', top: '14vh', width: '62vw', height: '58vh' }}
        >
          <img src="/hero_interior_bath.jpg" alt="Luxury bathroom interior with Skyrex tiles" />
        </div>

        {/* Right Headline Block */}
        <div
          ref={heroHeadlineRef}
          className="absolute font-display"
          style={{ left: '72vw', top: '14vh', width: '22vw' }}
        >
          <h1
            className="font-display font-bold leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(40px, 5vw, 80px)', color: 'var(--skyrex-text)' }}
          >
            <span className="block overflow-hidden"><span className="block">Built for</span></span>
            <span className="block overflow-hidden"><span className="block accent-word">India.</span></span>
          </h1>
          <p
            className="mt-6 font-body"
            style={{ fontSize: '13px', letterSpacing: '0.08em', color: 'var(--skyrex-text-secondary)' }}
          >
            Tiles · Sanitaryware · Clay Roofing
          </p>
        </div>

        {/* CTA Row */}
        <div
          ref={heroCtaRef}
          className="absolute"
          style={{ left: '72vw', top: '48vh', width: '22vw' }}
        >
          <div className="hairline mb-6" style={{ width: '22vw' }} />
          <button className="cta-btn">
            Explore products
            <ArrowRight className="cta-arrow" size={16} />
          </button>
        </div>

        {/* Bottom Left Paragraph */}
        <p
          ref={heroBodyRef}
          className="absolute font-body leading-relaxed"
          style={{
            left: '6vw',
            top: '78vh',
            width: '34vw',
            fontSize: 'clamp(13px, 1vw, 15px)',
            color: 'var(--skyrex-text-secondary)',
          }}
        >
          From Morbi to every state—Skyrex delivers surfaces that last decades.
        </p>

        {/* Scroll Cue */}
        <div
          ref={heroScrollCueRef}
          className="scroll-cue absolute"
          style={{ left: '72vw', top: '78vh' }}
        >
          <span>Scroll to explore</span>
          <ArrowDown className="scroll-cue-arrow" size={14} />
        </div>
      </section>

      {/* ======== SECTION 2: MADE IN MORBI ======== */}
      <section
        ref={morbiRef}
        id="morbi"
        className="pinned-section"
        style={{ zIndex: 11, backgroundColor: 'var(--skyrex-stone)' }}
      >
        {/* Left Image Frame */}
        <div
          ref={morbiImageRef}
          className="img-frame"
          style={{ left: '6vw', top: '14vh', width: '42vw', height: '58vh' }}
        >
          <img src="/factory_aerial_morbi.jpg" alt="Skyrex factory in Morbi, Gujarat" />
        </div>

        {/* Right Headline Block */}
        <div
          ref={morbiHeadlineRef}
          className="absolute font-display"
          style={{ left: '54vw', top: '14vh', width: '40vw' }}
        >
          <h2
            className="font-display font-bold leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 4.5vw, 72px)', color: 'var(--skyrex-text)' }}
          >
            <span className="block overflow-hidden"><span className="block">Proudly</span></span>
            <span className="block overflow-hidden"><span className="block">made in</span></span>
            <span className="block overflow-hidden"><span className="block accent-word">Morbi.</span></span>
          </h2>
        </div>

        {/* CTA Row */}
        <div
          ref={morbiCtaRef}
          className="absolute"
          style={{ left: '54vw', top: '50vh', width: '40vw' }}
        >
          <div className="hairline mb-6" style={{ width: '22vw' }} />
          <button className="cta-btn">
            About Skyrex
            <ArrowRight className="cta-arrow" size={16} />
          </button>
        </div>

        {/* Bottom Paragraph */}
        <p
          ref={morbiBodyRef}
          className="absolute font-body leading-relaxed"
          style={{
            left: '6vw',
            top: '78vh',
            width: '40vw',
            fontSize: 'clamp(13px, 1vw, 15px)',
            color: 'var(--skyrex-text-secondary)',
          }}
        >
          Morbi, Gujarat—India's ceramic capital. We press, fire, finish, and ship with factory-level consistency.
        </p>

        {/* Scroll Cue */}
        <div className="scroll-cue absolute" style={{ left: '54vw', top: '78vh' }}>
          <span>Scroll to explore</span>
          <ArrowDown className="scroll-cue-arrow" size={14} />
        </div>
      </section>

      {/* ======== SECTION 3: ROOFING TILES ======== */}
      <ProductSection
        id="roofing"
        zIndex={12}
        image="/roofing_closeup.jpg"
        headline={['Roofing tiles', 'that outlast', '']}
        accentWord="monsoons."
        cta="See roofing range"
        body="Engineered for thermal performance and wind resistance—tested across India's coastal belts."
      />

      {/* ======== SECTION 4: WALL TILES ======== */}
      <ProductSection
        id="wall"
        zIndex={13}
        image="/wall_tiles_blue_scene.jpg"
        headline={['Walls that', 'stay bold,', 'year after year.']}
        accentWord=""
        cta="Explore wall tiles"
        body="Stain-resistant glazes, rich textures, and formats that reduce grout lines."
      />

      {/* ======== SECTION 5: FLOOR TILES ======== */}
      <ProductSection
        id="floor"
        zIndex={14}
        image="/floor_tiles_lobby.jpg"
        headline={['Floors built', 'for footsteps', 'and time.']}
        accentWord=""
        cta="View floor tiles"
        body="High MOH hardness, anti-skid options, and formats from 600×600 mm to large slabs."
      />

      {/* ======== SECTION 6: SANITARYWARE ======== */}
      <ProductSection
        id="sanitaryware"
        zIndex={15}
        image="/sanitaryware_white_set.jpg"
        headline={['Sanitaryware', 'that stays', 'spotless.']}
        accentWord=""
        cta="See sanitaryware"
        body="Nano-coated surfaces, water-efficient designs, and shapes that fit modern Indian bathrooms."
      />

      {/* ======== SECTION 7: CLAY ROOFING TILES ======== */}
      <ProductSection
        id="clay"
        zIndex={16}
        image="/clay_roofing_traditional.jpg"
        headline={['Crafted in clay.', 'Fired for', '']}
        accentWord="generations."
        cta="Explore clay tiles"
        body="Traditional profiles, modern firing consistency—made for heritage homes and climate-smart architecture."
      />

      {/* ======== SECTION 8: CRAFT STATEMENT (DARK) ======== */}
      <section
        ref={craftRef}
        className="pinned-section dark-section"
        style={{ zIndex: 17 }}
      >
        <div
          className="absolute text-center"
          style={{
            left: '50%',
            top: '46vh',
            transform: 'translate(-50%, -50%)',
            width: '72vw',
          }}
        >
          <h2
            ref={craftHeadlineRef}
            className="font-display font-bold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', color: 'var(--skyrex-stone)' }}
          >
            Great spaces start with honest materials.
          </h2>
          <p
            className="mt-8 font-body"
            style={{ fontSize: '15px', color: 'var(--skyrex-text-secondary)' }}
          >
            If you can sketch it, we can surface it.
          </p>
        </div>

        {/* Micro Line */}
        <div
          ref={craftLineRef}
          className="hairline hairline-dark absolute"
          style={{
            left: '50%',
            top: '72vh',
            width: '18vw',
            transform: 'translateX(-50%)',
          }}
        />
      </section>

      {/* ======== SECTION 9: PROJECT SLIDER ======== */}
      <section
        ref={projectsRef}
        id="projects"
        className="relative"
        style={{
          zIndex: 18,
          backgroundColor: 'var(--skyrex-stone)',
          padding: '10vh 0 12vh',
        }}
      >
        {/* Header */}
        <div className="projects-header px-[6vw] mb-12">
          <h2
            className="font-display font-bold tracking-[-0.02em]"
            style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', color: 'var(--skyrex-text)' }}
          >
            Projects across <span className="accent-word">India</span>
          </h2>
          <p
            className="mt-4 font-body max-w-xl"
            style={{ fontSize: '15px', color: 'var(--skyrex-text-secondary)', lineHeight: 1.6 }}
          >
            Homes, hotels, hospitals, and commercial facades.
          </p>
        </div>

        {/* Horizontal Slider */}
        <div ref={sliderRef} className="project-slider">
          {projects.map((project, i) => (
            <div key={i} className="project-card">
              <img src={project.image} alt={`${project.caption} in ${project.location}`} />
              <div className="project-card-caption">
                <p className="font-display font-semibold text-lg">{project.caption}</p>
                <p className="font-body text-sm opacity-70 mt-1">{project.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-[6vw] mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-3 font-body font-medium"
            style={{ fontSize: '14px', color: 'var(--skyrex-text)' }}
          >
            View all projects
            <ArrowRight size={16} className="transition-transform hover:translate-x-1" />
          </a>
        </div>
      </section>

      {/* ======== SECTION 10: TESTIMONIALS ======== */}
      <section
        ref={testimonialRef}
        id="testimonials"
        className="pinned-section"
        style={{ zIndex: 19, backgroundColor: 'var(--skyrex-stone)' }}
      >
        {/* Left Image Frame */}
        <div
          ref={testImageRef}
          className="img-frame"
          style={{ left: '6vw', top: '14vh', width: '46vw', height: '72vh' }}
        >
          <img src="/testimonial_meeting.jpg" alt="Architects reviewing Skyrex products" />
        </div>

        {/* Right Headline Block */}
        <div
          ref={testHeadlineRef}
          className="absolute font-display"
          style={{ left: '58vw', top: '14vh', width: '36vw' }}
        >
          <h2
            className="font-display font-bold leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 4.5vw, 72px)', color: 'var(--skyrex-text)' }}
          >
            <span className="block overflow-hidden"><span className="block">Loved by</span></span>
            <span className="block overflow-hidden"><span className="block accent-word">architects</span></span>
            <span className="block overflow-hidden"><span className="block">and builders.</span></span>
          </h2>
        </div>

        {/* CTA Row */}
        <div className="absolute" style={{ left: '58vw', top: '50vh', width: '36vw' }}>
          <div className="hairline mb-6" style={{ width: '22vw' }} />
          <button className="cta-btn">
            Read stories
            <ArrowRight className="cta-arrow" size={16} />
          </button>
        </div>

        {/* Quote Block */}
        <div
          ref={testQuoteRef}
          className="absolute"
          style={{ left: '6vw', top: '74vh', width: '44vw' }}
        >
          <div className="testimonial-quote-mark">"</div>
          <p
            className="font-body italic leading-relaxed -mt-8"
            style={{ fontSize: 'clamp(14px, 1.1vw, 17px)', color: 'var(--skyrex-text)' }}
          >
            Skyrex delivered consistency batch after batch. That's rare—and valuable.
          </p>
          <p
            className="mt-4 font-body font-medium"
            style={{ fontSize: '13px', color: 'var(--skyrex-text-secondary)', letterSpacing: '0.04em' }}
          >
            —R. K. Mehta, Project Director, Jaipur
          </p>
        </div>

        {/* Scroll Cue */}
        <div className="scroll-cue absolute" style={{ left: '58vw', top: '78vh' }}>
          <span>Scroll to explore</span>
          <ArrowDown className="scroll-cue-arrow" size={14} />
        </div>
      </section>

      {/* ======== SECTION 11: DOWNLOADS ======== */}
      <section
        ref={downloadsRef}
        id="downloads"
        className="relative"
        style={{
          zIndex: 20,
          backgroundColor: 'var(--skyrex-stone)',
          padding: '10vh 0 12vh',
        }}
      >
        <div className="px-[6vw] flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Image */}
          <div
            ref={downloadsImageRef}
            className="img-frame flex-shrink-0"
            style={{ width: '100%', maxWidth: '420px', height: '320px' }}
          >
            <img src="/downloads_office_scene.jpg" alt="Modern office with Skyrex tiles" />
          </div>

          {/* Right Downloads List */}
          <div ref={downloadsListRef} className="flex-1">
            <h2
              className="font-display font-bold tracking-[-0.02em] mb-10"
              style={{ fontSize: 'clamp(28px, 3vw, 44px)', color: 'var(--skyrex-text)' }}
            >
              Specifications <span className="accent-word">& catalogs</span>
            </h2>

            <div>
              {downloads.map((item, i) => (
                <div key={i} className="download-row">
                  <div className="flex-1">
                    <p
                      className="font-body font-medium"
                      style={{ fontSize: '15px', color: 'var(--skyrex-text)' }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="font-body mt-1"
                      style={{ fontSize: '12px', color: 'var(--skyrex-text-secondary)', letterSpacing: '0.06em' }}
                    >
                      {item.type} · {item.size}
                    </p>
                  </div>
                  <Download className="download-arrow" size={18} style={{ color: 'var(--skyrex-text-secondary)' }} />
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button className="cta-btn-outline px-6 py-3">
                Request a price list
                <ArrowRight className="cta-arrow" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======== SECTION 12: CONTACT ======== */}
      <section
        ref={contactRef}
        id="contact"
        className="dark-section relative"
        style={{ zIndex: 21, padding: '10vh 0 12vh' }}
      >
        <div className="px-[6vw] flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Info */}
          <div className="flex-1">
            <h2
              className="contact-title font-display font-bold tracking-[-0.02em]"
              style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', color: 'var(--skyrex-stone)' }}
            >
              Let's build something <span className="accent-word">lasting.</span>
            </h2>
            <p
              className="mt-6 font-body leading-relaxed max-w-md"
              style={{ fontSize: '15px', color: 'var(--skyrex-text-secondary)' }}
            >
              Tell us what you're making. We'll recommend the right product and finish.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <Mail size={18} style={{ color: 'var(--skyrex-accent)' }} />
                <span className="font-body" style={{ fontSize: '14px', color: 'var(--skyrex-stone)' }}>
                  factory@skyrex.in
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={18} style={{ color: 'var(--skyrex-accent)' }} />
                <span className="font-body" style={{ fontSize: '14px', color: 'var(--skyrex-stone)' }}>
                  +91-98250-12345
                </span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={18} style={{ color: 'var(--skyrex-accent)' }} />
                <span className="font-body" style={{ fontSize: '14px', color: 'var(--skyrex-stone)' }}>
                  Morbi, Gujarat, India
                </span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div ref={contactFormRef} className="flex-1 max-w-lg">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="form-field">
                <input type="text" placeholder="Name" className="form-input" />
              </div>
              <div className="form-field">
                <input type="email" placeholder="Email" className="form-input" />
              </div>
              <div className="form-field">
                <input type="tel" placeholder="Phone" className="form-input" />
              </div>
              <div className="form-field">
                <select className="form-input" defaultValue="">
                  <option value="" disabled>Project Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-field">
                <textarea placeholder="Message" className="form-input resize-none" rows={4} />
              </div>
              <div className="form-field pt-4">
                <button type="submit" className="cta-btn w-full justify-center">
                  Send enquiry
                  <ArrowRight className="cta-arrow" size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ======== SECTION 13: FOOTER ======== */}
      <footer
        className="dark-section relative overflow-hidden"
        style={{ zIndex: 22, padding: '8vh 0 4vh' }}
      >
        {/* Large Background Wordmark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.04 }}
        >
          <span
            className="font-display font-bold"
            style={{ fontSize: 'clamp(120px, 18vw, 300px)', color: 'var(--skyrex-stone)' }}
          >
            SKYREX
          </span>
        </div>

        <div className="relative px-[6vw]">
          {/* Links Row */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 mb-16">
            {['Products', 'Projects', 'About', 'Downloads', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="footer-link font-medium"
                style={{ fontSize: '14px', letterSpacing: '0.04em' }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Bottom Row */}
          <div
            className="flex flex-col lg:flex-row justify-between items-center gap-4 pt-8"
            style={{ borderTop: '1px solid var(--skyrex-hairline-dark)' }}
          >
            <p className="font-body" style={{ fontSize: '13px', color: 'var(--skyrex-text-secondary)' }}>
              © Skyrex Industries
            </p>
            <div className="flex gap-8">
              <a href="#" className="footer-link" style={{ fontSize: '13px' }}>Privacy</a>
              <a href="#" className="footer-link" style={{ fontSize: '13px' }}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
