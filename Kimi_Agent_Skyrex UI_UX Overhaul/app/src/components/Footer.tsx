import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Products: ['Floor Tiles', 'Wall Tiles', 'Roof Tiles', 'Sanitaryware'],
  Company: ['About Us', 'Manufacturing', 'Careers', 'Press'],
  Support: ['Contact', 'FAQs', 'Shipping', 'Returns'],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const columns = footer.querySelectorAll('.footer-col');
      columns.forEach((col, i) => {
        gsap.fromTo(
          col,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0B0B0C] z-[120] pt-[10vh] pb-8 px-[6vw]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Logo & Tagline */}
        <div className="footer-col lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-2xl font-bold tracking-tight text-white"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              SKYREX
            </span>
            <span className="text-[10px] font-mono-label text-[#A8A8A0] mt-1">INDIA</span>
          </div>
          <p className="text-sm text-[#A8A8A0] leading-relaxed mb-6" style={{ maxWidth: '280px' }}>
            Enduring Materials. Modern Living. <br />
            Premium tiles and sanitaryware from Morbi, Gujarat.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {['facebook', 'instagram', 'linkedin', 'twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-[#FFD700] hover:text-[#FFD700] transition-colors duration-300"
                aria-label={social}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {social === 'facebook' && <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />}
                  {social === 'instagram' && (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </>
                  )}
                  {social === 'linkedin' && (
                    <>
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </>
                  )}
                  {social === 'twitter' && <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="footer-col">
            <h4
              className="font-mono-label text-[#FFD700] mb-4"
              style={{ fontSize: '11px' }}
            >
              {title.toUpperCase()}
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-[#A8A8A0] hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="footer-col">
          <h4
            className="font-mono-label text-[#FFD700] mb-4"
            style={{ fontSize: '11px' }}
          >
            NEWSLETTER
          </h4>
          <p className="text-sm text-[#A8A8A0] mb-4">
            Get product updates and inspiration.
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder-[#A8A8A0] focus:outline-none focus:border-[#FFD700] transition-colors"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#FFD700] text-[#0B0B0C] text-sm font-semibold hover:bg-[#e6c200] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#A8A8A0]">
          © 2025 Skyrex India. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-[#A8A8A0] hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-[#A8A8A0] hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-xs text-[#A8A8A0] hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
