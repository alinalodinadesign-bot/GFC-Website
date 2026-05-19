import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import About from '@/components/home/About';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import Event from '@/components/home/Event';
import GalleryPreview from '@/components/home/GalleryPreview';
import Partners from '@/components/home/Partners';
import ApplyCta from '@/components/home/ApplyCta';
import ScrollColorSection from '@/components/ScrollColorSection';

export default function HomePage() {
  return (
    <main className="home-main">
      <Hero />
      <Ticker />

      {/* White → Dark: fires at the very end of scrolling through About */}
      <ScrollColorSection colorFrom="#ffffff" colorTo="#0a0a0a" threshold={0.97} band={0.02} thresholdMobile={0.97} bandMobile={0.02}>
        <About />
      </ScrollColorSection>

      <ProjectsPreview />
      <Event />
      {/* Dark → White: short section formula, fires when half scrolled past viewport top */}
      <ScrollColorSection colorFrom="#0a0a0a" colorTo="#ffffff" threshold={0.15} band={0.25} thresholdMobile={0.92} bandMobile={0.06}>
        <GalleryPreview />
      </ScrollColorSection>

      <Partners />

      {/* stays dark — Apply form is already styled for dark background */}
      <ScrollColorSection colorFrom="#0a0a0a" colorTo="#0a0a0a">
        <ApplyCta />
      </ScrollColorSection>
    </main>
  );
}
