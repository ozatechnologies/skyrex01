@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Skyrex Brand Colors */
    --skyrex-stone: #F5F3EE;
    --skyrex-dark: #0F0E0C;
    --skyrex-accent: #C65D3B;
    --skyrex-text: #141414;
    --skyrex-text-secondary: #6E6A63;
    --skyrex-border: rgba(20, 20, 20, 0.10);
    --skyrex-border-dark: rgba(245, 243, 238, 0.12);
    --skyrex-hairline: rgba(20, 20, 20, 0.18);
    --skyrex-hairline-dark: rgba(245, 243, 238, 0.16);

    /* shadcn overrides */
    --background: 40 20% 95%;
    --foreground: 30 6% 8%;
    --card: 40 20% 95%;
    --card-foreground: 30 6% 8%;
    --popover: 40 20% 95%;
    --popover-foreground: 30 6% 8%;
    --primary: 16 55% 50%;
    --primary-foreground: 40 20% 95%;
    --secondary: 40 10% 90%;
    --secondary-foreground: 30 6% 8%;
    --muted: 40 10% 90%;
    --muted-foreground: 35 6% 40%;
    --accent: 16 55% 50%;
    --accent-foreground: 40 20% 95%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 40 10% 85%;
    --input: 40 10% 85%;
    --ring: 16 55% 50%;
    --radius: 0px;
  }

  * {
    @apply border-border;
  }

  html {
    scroll-behavior: auto;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--skyrex-stone);
    color: var(--skyrex-text);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* ======================== */
/* TYPOGRAPHY               */
/* ======================== */
.font-display {
  font-family: 'Sora', sans-serif;
}

.font-body {
  font-family: 'Inter', sans-serif;
}

/* ======================== */
/* SECTION BASE STYLES      */
/* ======================== */
.pinned-section {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  will-change: transform;
}

/* ======================== */
/* IMAGE FRAME STYLES       */
/* ======================== */
.img-frame {
  position: absolute;
  overflow: hidden;
  border: 1px solid var(--skyrex-border);
}

.img-frame-dark {
  border-color: var(--skyrex-border-dark);
}

.img-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ======================== */
/* HAIRLINE RULES           */
/* ======================== */
.hairline {
  height: 1px;
  background: var(--skyrex-hairline);
  transform-origin: left center;
}

.hairline-dark {
  background: var(--skyrex-hairline-dark);
}

/* ======================== */
/* CTA BUTTON STYLES        */
/* ======================== */
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background-color: var(--skyrex-dark);
  color: var(--skyrex-stone);
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-2px);
  background-color: var(--skyrex-accent);
}

.cta-btn-outline {
  background-color: transparent;
  color: var(--skyrex-text);
  border: 1px solid var(--skyrex-hairline);
}

.cta-btn-outline:hover {
  background-color: var(--skyrex-dark);
  color: var(--skyrex-stone);
  border-color: var(--skyrex-dark);
}

/* Arrow icon inside CTA */
.cta-arrow {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 1.5;
  fill: none;
  transition: transform 0.3s ease;
}

.cta-btn:hover .cta-arrow {
  transform: translateX(4px);
}

/* ======================== */
/* NAVBAR STYLES            */
/* ======================== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 0 6vw;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.5s ease, backdrop-filter 0.5s ease;
}

.navbar-scrolled {
  background-color: rgba(245, 243, 238, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.navbar-dark {
  background-color: rgba(15, 14, 12, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.nav-logo {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.02em;
  color: var(--skyrex-text);
  text-decoration: none;
}

.navbar-dark .nav-logo {
  color: var(--skyrex-stone);
}

.nav-links {
  display: flex;
  gap: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--skyrex-text);
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  transition: color 0.3s ease;
}

.navbar-dark .nav-link {
  color: var(--skyrex-stone);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--skyrex-accent);
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: var(--skyrex-accent);
}

/* ======================== */
/* SCROLL CUE               */
/* ======================== */
.scroll-cue {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--skyrex-text-secondary);
}

.scroll-cue-arrow {
  animation: bounceDown 2s ease-in-out infinite;
}

@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

/* ======================== */
/* PRODUCT SECTION PATTERN  */
/* ======================== */
.product-section .headline-line {
  display: block;
  overflow: hidden;
}

.product-section .headline-word {
  display: inline-block;
}

.accent-word {
  color: var(--skyrex-accent);
}

/* ======================== */
/* DARK SECTION STYLES      */
/* ======================== */
.dark-section {
  background-color: var(--skyrex-dark);
  color: var(--skyrex-stone);
}

.dark-section .scroll-cue {
  color: var(--skyrex-hairline-dark);
}

/* ======================== */
/* PROJECT SLIDER           */
/* ======================== */
.project-slider {
  display: flex;
  gap: 3.5vw;
  padding: 0 6vw;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
}

.project-slider::-webkit-scrollbar {
  display: none;
}

.project-slider:active {
  cursor: grabbing;
}

.project-card {
  flex-shrink: 0;
  width: 62vw;
  height: 44vh;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--skyrex-border);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover {
  transform: translateY(-6px);
}

.project-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover img {
  transform: scale(1.05);
}

.project-card-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 28px;
  background: linear-gradient(to top, rgba(15,14,12,0.85) 0%, transparent 100%);
  color: var(--skyrex-stone);
}

/* ======================== */
/* DOWNLOADS SECTION        */
/* ======================== */
.download-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 0;
  border-bottom: 1px solid var(--skyrex-hairline);
  cursor: pointer;
  transition: padding-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.download-row:hover {
  padding-left: 12px;
}

.download-row:hover .download-arrow {
  transform: translateX(6px);
}

.download-arrow {
  transition: transform 0.3s ease;
}

/* ======================== */
/* TESTIMONIAL SECTION      */
/* ======================== */
.testimonial-quote-mark {
  font-family: 'Sora', sans-serif;
  font-size: 120px;
  font-weight: 700;
  line-height: 0.6;
  color: var(--skyrex-accent);
  opacity: 0.3;
}

/* ======================== */
/* CONTACT FORM             */
/* ======================== */
.form-input {
  width: 100%;
  padding: 16px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--skyrex-hairline-dark);
  color: var(--skyrex-stone);
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-input::placeholder {
  color: var(--skyrex-text-secondary);
  opacity: 0.6;
}

.form-input:focus {
  border-color: var(--skyrex-accent);
}

/* ======================== */
/* FOOTER                   */
/* ======================== */
.footer-link {
  color: var(--skyrex-stone);
  opacity: 0.6;
  text-decoration: none;
  font-size: 14px;
  transition: opacity 0.3s ease;
}

.footer-link:hover {
  opacity: 1;
}

/* ======================== */
/* GRAIN OVERLAY            */
/* ======================== */
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* ======================== */
/* FLOATING ANIMATIONS      */
/* ======================== */
.float-subtle {
  animation: floatSubtle 3.2s ease-in-out infinite;
}

@keyframes floatSubtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

/* ======================== */
/* PULSE ANIMATION          */
/* ======================== */
.pulse-subtle {
  animation: pulseSubtle 2.8s ease-in-out infinite;
}

@keyframes pulseSubtle {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
}

/* ======================== */
/* ROTATE ANIMATION         */
/* ======================== */
.rotate-slow {
  animation: rotateSlow 20s linear infinite;
}

@keyframes rotateSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ======================== */
/* RESPONSIVE               */
/* ======================== */
@media (max-width: 1024px) {
  .nav-links {
    gap: 24px;
  }

  .project-card {
    width: 80vw;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 5vw;
    height: 64px;
  }

  .nav-links {
    display: none;
  }

  .project-card {
    width: 85vw;
    height: 36vh;
  }
}
