import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "For individuals just getting started",
    features: [
      "10 responses/month",
      "Unlimited forms",
      "Basic question types",
      "Typeform branding",
      "Email notifications",
    ],
    cta: "Get started free",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "$25",
    period: "/month",
    description: "For creators and small teams",
    features: [
      "1,000 responses/month",
      "Unlimited forms",
      "All question types",
      "Remove Typeform branding",
      "Custom thank you screens",
      "Logic jumps",
      "Calculator",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Business",
    price: "$50",
    period: "/month",
    description: "For growing businesses",
    features: [
      "10,000 responses/month",
      "Priority support",
      "Custom closed message",
      "Conversion tracking",
      "Facebook pixel",
      "Drop-off analysis",
      "Advanced logic",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited responses",
      "Dedicated success manager",
      "SSO/SAML",
      "Custom integrations",
      "Advanced security",
      "SLA",
      "Custom contracts",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Plans that grow with you
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Start free, upgrade when you need more. Simple pricing, no surprises.
            </motion.p>
          </div>
        </section>

        {/* Plans */}
        <section className="pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`h-full ${
                      plan.highlighted
                        ? "border-primary ring-2 ring-primary/20"
                        : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      {plan.highlighted && (
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full mb-4">
                          Most popular
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        {plan.period && (
                          <span className="text-muted-foreground">{plan.period}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                      <Button
                        className={`w-full mb-6 ${
                          plan.highlighted
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-foreground text-background hover:bg-foreground/90"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-muted/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I change plans anytime?",
                  a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
                },
                {
                  q: "What happens if I exceed my response limit?",
                  a: "You'll receive a notification before reaching your limit. Additional responses are available at $0.10 each or you can upgrade.",
                },
                {
                  q: "Is there a free trial?",
                  a: "Yes, all paid plans come with a 14-day free trial. No credit card required.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Absolutely. You can cancel your subscription at any time. You'll keep access until the end of your billing period.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
