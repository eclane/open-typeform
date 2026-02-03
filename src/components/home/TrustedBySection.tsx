import { motion } from "framer-motion";

const TrustedBySection = () => {
  const logos = [
    { name: "Airbnb", color: "#FF5A5F" },
    { name: "HubSpot", color: "#FF7A59" },
    { name: "Nike", color: "#000000" },
    { name: "Apple", color: "#555555" },
    { name: "Uber", color: "#000000" },
    { name: "Mailchimp", color: "#FFE01B" },
  ];

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          Trusted by 500,000+ brands worldwide
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              {logo.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
