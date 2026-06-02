import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Products', href: '#categories' },
  { label: 'Applications', href: '#applications' },
  { label: 'Projects', href: '#collection' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.3 }
    );
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 h-[90px] flex items-center justify-between px-6 lg:px-12 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B0B0C]/80 backdrop-blur-[20px] border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 z-10">
        <span className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'Space Grotesk' }}>
          SKYREX
        </span>
        <span className="text-[10px] font-mono-label text-[#A8A8A0] mt-1">INDIA</span>
      </a>

      {/* Desktop Nav Links */}
      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-sm font-medium text-[#A8A8A0] hover:text-[#FFD700] transition-colors duration-300 link-underline"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-[2px] bg-white transition-all duration-300 ${
            menuOpen ? 'rotate-45 translate-y-[5px]' : ''
          }`}
        />
        <span
          className={`w-6 h-[2px] bg-white transition-all duration-300 ${
            menuOpen ? '-rotate-45 -translate-y-[3px]' : ''
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#0B0B0C]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-3xl font-semibold text-white hover:text-[#FFD700] transition-colors duration-300"
            style={{
              fontFamily: 'Space Grotesk',
              transitionDelay: menuOpen ? `${i * 50}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
