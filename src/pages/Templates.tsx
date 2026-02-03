import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Users, MessageSquare, Star, Calendar, Briefcase } from "lucide-react";

const templates = [
  {
    id: "feedback",
    title: "Customer Feedback",
    description: "Collect valuable feedback from your customers",
    icon: MessageSquare,
    color: "#6C5CE7",
    questions: 5,
    category: "Feedback",
  },
  {
    id: "registration",
    title: "Event Registration",
    description: "Register attendees for your next event",
    icon: Calendar,
    color: "#00B894",
    questions: 7,
    category: "Events",
  },
  {
    id: "lead",
    title: "Lead Generation",
    description: "Capture leads and grow your business",
    icon: Users,
    color: "#E17055",
    questions: 6,
    category: "Marketing",
  },
  {
    id: "survey",
    title: "Employee Survey",
    description: "Get insights from your team",
    icon: Briefcase,
    color: "#0984E3",
    questions: 10,
    category: "HR",
  },
  {
    id: "nps",
    title: "NPS Survey",
    description: "Measure customer loyalty with Net Promoter Score",
    icon: Star,
    color: "#FDCB6E",
    questions: 3,
    category: "Feedback",
  },
  {
    id: "contact",
    title: "Contact Form",
    description: "Let people get in touch with you",
    icon: FileText,
    color: "#E84393",
    questions: 4,
    category: "Contact",
  },
];

const Templates = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Templates</h1>
          <p className="text-muted-foreground">
            Start with a pre-built template and customize it to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="cursor-pointer hover:border-primary transition-all group h-full">
                <CardHeader>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: template.color + "20" }}
                  >
                    <template.icon className="w-6 h-6" style={{ color: template.color }} />
                  </div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {template.questions} questions
                    </span>
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{ backgroundColor: template.color + "20", color: template.color }}
                    >
                      {template.category}
                    </span>
                  </div>
                  <Button
                    className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => navigate("/dashboard/create")}
                  >
                    Use template
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Templates;
