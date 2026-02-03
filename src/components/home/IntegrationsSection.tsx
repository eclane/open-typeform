import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const IntegrationsSection = () => {
  const integrations = [
    { name: "Slack", icon: "💬" },
    { name: "Google Sheets", icon: "📊" },
    { name: "Zapier", icon: "⚡" },
    { name: "HubSpot", icon: "🔶" },
    { name: "Salesforce", icon: "☁️" },
    { name: "Mailchimp", icon: "📧" },
    { name: "Notion", icon: "📝" },
    { name: "Airtable", icon: "📋" },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Connect with 120+ apps
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Send your data where it needs to go. Typeform integrates with all the tools you already use, from CRMs to spreadsheets to marketing platforms.
            </p>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              Explore integrations
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-4 gap-4"
          >
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="aspect-square bg-muted rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-muted/80 hover:scale-105 transition-all cursor-pointer"
              >
                <span className="text-3xl">{integration.icon}</span>
                <span className="text-xs text-muted-foreground font-medium">{integration.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
