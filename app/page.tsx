import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import BestSellers from "@/components/home/BestSellers";
import BridalBanner from "@/components/home/BridalBanner";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <BestSellers />
      <BridalBanner />
      <WhyUs />
      <Testimonials />
    </>
  );
}