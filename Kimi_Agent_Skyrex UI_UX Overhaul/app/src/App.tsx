import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HeroSection from './sections/HeroSection';
import BrandStatementSection from './sections/BrandStatementSection';
import CategoryOverviewSection from './sections/CategoryOverviewSection';
import ProductSpotlightSection from './sections/ProductSpotlightSection';
import TwoPanelSplitSection from './sections/TwoPanelSplitSection';
import LargeFeatureSection from './sections/LargeFeatureSection';
import TripleFeatureSection from './sections/TripleFeatureSection';
import CollectionShowcaseSection from './sections/CollectionShowcaseSection';
import EditorialStatementSection from './sections/EditorialStatementSection';
import TestimonialSection from './sections/TestimonialSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
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

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative">
        <HeroSection />
        <BrandStatementSection />
        <CategoryOverviewSection />
        <ProductSpotlightSection />
        <TwoPanelSplitSection />
        <LargeFeatureSection />
        <TripleFeatureSection />
        <CollectionShowcaseSection />
        <EditorialStatementSection />
        <TestimonialSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
