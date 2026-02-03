import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import FeaturesSection from "@/components/home/FeaturesSection";
import UseCasesSection from "@/components/home/UseCasesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TemplatesSection from "@/components/home/TemplatesSection";
import IntegrationsSection from "@/components/home/IntegrationsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <UseCasesSection />
        <TestimonialsSection />
        <TemplatesSection />
        <IntegrationsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
