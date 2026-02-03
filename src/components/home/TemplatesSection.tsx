import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TemplatesSection = () => {
  const templates = [
    { name: "Contact Form", category: "Lead Gen", color: "bg-typeform-purple" },
    { name: "Customer Survey", category: "Feedback", color: "bg-typeform-coral" },
    { name: "Job Application", category: "HR", color: "bg-typeform-teal" },
    { name: "Quiz", category: "Engagement", color: "bg-typeform-yellow" },
    { name: "Order Form", category: "E-commerce", color: "bg-primary" },
    { name: "Registration", category: "Events", color: "bg-foreground" },
  ];

  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Start with a template
            </h2>
            <p className="text-xl text-muted-foreground">
              Get inspired by 1,000+ ready-to-use templates
            </p>
          </div>
          <Link to="/templates">
            <Button variant="outline" className="border-2">
              View all templates
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className={`${template.color} h-40 rounded-xl mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                <span className="text-4xl opacity-50">📝</span>
              </div>
              <p className="font-medium text-foreground">{template.name}</p>
              <p className="text-sm text-muted-foreground">{template.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
