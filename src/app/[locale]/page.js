import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import About from '@/components/home/About';
import ProjectsPreview from '@/components/home/ProjectsPreview';
import Event from '@/components/home/Event';
import GalleryPreview from '@/components/home/GalleryPreview';
import Partners from '@/components/home/Partners';
import ApplyCta from '@/components/home/ApplyCta';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ticker />
      <About />
      <ProjectsPreview />
      <Event />
      <GalleryPreview />
      <Partners />
      <ApplyCta />
    </main>
  );
}
