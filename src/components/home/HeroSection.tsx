import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6">
              Get to know your customers with{" "}
              <span className="typeform-text-gradient">forms worth filling out</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl">
              Typeform makes collecting and sharing information comfortable and conversational.
              It's a web-based platform you can use to create anything from surveys to apps,
              without needing to write a single line of code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 text-base px-8 h-14">
                  Get started free
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="text-base px-8 h-14 border-2">
                  See how it works
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required
            </p>
          </motion.div>

          {/* Right Content - Form Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 lg:p-12">
              <div className="bg-background rounded-2xl shadow-2xl overflow-hidden">
                {/* Form Preview Header */}
                <div className="h-2 bg-primary" />
                <div className="p-8 lg:p-12">
                  <p className="text-sm text-primary font-medium mb-4">1 → 4</p>
                  <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-6">
                    What's your name?
                  </h2>
                  <input
                    type="text"
                    placeholder="Type your answer here..."
                    className="w-full text-xl border-b-2 border-muted pb-2 focus:border-primary focus:outline-none transition-colors bg-transparent"
                  />
                  <div className="mt-8 flex items-center gap-3">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      OK <span className="ml-2">✓</span>
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      press <strong>Enter ↵</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-typeform-coral text-background p-4 rounded-2xl shadow-lg"
            >
              <span className="text-2xl">📊</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-typeform-teal text-background p-4 rounded-2xl shadow-lg"
            >
              <span className="text-2xl">💬</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
