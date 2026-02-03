import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="typeform-gradient rounded-3xl p-12 md:p-20 text-center text-background"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join 500,000+ brands already using Typeform to create better experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 text-base px-8 h-14">
                Get started free
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="border-2 border-background text-background bg-transparent hover:bg-background/10 text-base px-8 h-14">
                Talk to sales
              </Button>
            </Link>
          </div>
          <p className="text-sm opacity-70 mt-6">
            No credit card required • Free plan available
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
