import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const UseCasesSection = () => {
  const useCases = [
    {
      title: "Lead generation",
      description: "Capture qualified leads with beautiful, conversational forms that convert 2x better than traditional ones.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      color: "from-typeform-purple/20 to-typeform-coral/20",
    },
    {
      title: "Customer feedback",
      description: "Understand your customers better with surveys they'll actually want to complete.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      color: "from-typeform-teal/20 to-typeform-purple/20",
    },
    {
      title: "Market research",
      description: "Gather actionable insights with forms that feel more like conversations than interrogations.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      color: "from-typeform-yellow/20 to-typeform-teal/20",
    },
  ];

  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for every use case
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From startups to enterprises, teams use Typeform to collect data that matters.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-background rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className={`h-48 bg-gradient-to-br ${useCase.color} relative overflow-hidden`}>
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {useCase.description}
                </p>
                <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary/80">
                  Learn more 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
