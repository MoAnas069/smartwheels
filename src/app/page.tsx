import HeroSection from '@/components/home/HeroSection';
import WhySmartWheels from '@/components/home/WhySmartWheels';
import BranchesSection from '@/components/home/BranchesSection';
import AchievementsCounter from '@/components/home/AchievementsCounter';
import MedalShowcase from '@/components/home/MedalShowcase';
import GalleryPreview from '@/components/home/GalleryPreview';
import Timeline from '@/components/home/Timeline';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhySmartWheels />
      <BranchesSection />
      <AchievementsCounter />
      <MedalShowcase />
      <GalleryPreview />
      <Timeline />
      <CTASection />
    </>
  );
}
