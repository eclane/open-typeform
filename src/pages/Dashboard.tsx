import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/formStore";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Plus, 
  FileText, 
  BarChart3, 
  Eye, 
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { user } = useAuth();
  const { forms, createForm } = useFormStore();
  const navigate = useNavigate();

  const totalResponses = forms.reduce((acc, form) => acc + form.responses.length, 0);
  const totalViews = forms.reduce((acc, form) => acc + form.views, 0);
  const publishedForms = forms.filter((f) => f.status === "published").length;

  const recentForms = [...forms]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const handleCreateForm = () => {
    const newForm = createForm();
    navigate(`/dashboard/forms/${newForm.id}/edit`);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your forms and responses
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="cursor-pointer hover:border-primary transition-colors group" onClick={handleCreateForm}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Create new form</h3>
                  <p className="text-sm text-muted-foreground">Start from scratch</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/dashboard/templates">
              <Card className="cursor-pointer hover:border-primary transition-colors group h-full">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Use a template</h3>
                    <p className="text-sm text-muted-foreground">Start with pre-built forms</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/dashboard/results">
              <Card className="cursor-pointer hover:border-primary transition-colors group h-full">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <BarChart3 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">View results</h3>
                    <p className="text-sm text-muted-foreground">Analyze responses</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Total Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{forms.length}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Responses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{totalResponses}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Total Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{totalViews}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Published
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{publishedForms}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent forms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Recent forms</h2>
            <Link to="/dashboard/forms" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentForms.length > 0 ? (
            <div className="space-y-3">
              {recentForms.map((form) => (
                <Link
                  key={form.id}
                  to={`/dashboard/forms/${form.id}`}
                  className="block"
                >
                  <Card className="hover:border-primary transition-colors">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{form.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(form.updatedAt).toLocaleDateString()}
                            </span>
                            <span>{form.responses.length} responses</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            form.status === "published"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : form.status === "draft"
                              ? "bg-muted text-muted-foreground"
                              : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                          }`}
                        >
                          {form.status}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No forms yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first form to get started
                </p>
                <Button onClick={handleCreateForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create form
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
