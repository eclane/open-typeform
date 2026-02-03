import { motion } from "framer-motion";
import { Sparkles, BarChart3, Zap, Palette, Users, Shield } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Beautiful by default",
      description: "Every typeform looks great on any device. No design skills needed.",
      color: "bg-typeform-purple",
    },
    {
      icon: BarChart3,
      title: "Powerful insights",
      description: "See real-time results and export your data whenever you need it.",
      color: "bg-typeform-coral",
    },
    {
      icon: Zap,
      title: "Lightning fast",
      description: "Create forms in minutes. Get responses in seconds. Simple as that.",
      color: "bg-typeform-yellow",
    },
    {
      icon: Palette,
      title: "Fully customizable",
      description: "Match your brand with custom themes, fonts, and colors.",
      color: "bg-typeform-teal",
    },
    {
      icon: Users,
      title: "Team collaboration",
      description: "Work together seamlessly with shared workspaces and permissions.",
      color: "bg-primary",
    },
    {
      icon: Shield,
      title: "Enterprise security",
      description: "GDPR compliant with enterprise-grade security and data protection.",
      color: "bg-foreground",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything you need to collect data
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features that help you create engaging forms and surveys your audience will actually enjoy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
