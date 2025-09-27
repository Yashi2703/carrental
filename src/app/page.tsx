import HeroSection from '@/components/HeroSection'
import FeaturedCars from '@/components/FeaturedCars'
import BenefitsSection from '@/components/BenefitsSection'
import ContactCTA from '@/components/ContactCTA'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCars />
      <BenefitsSection />
      <ContactCTA />
    </div>
  )
}
