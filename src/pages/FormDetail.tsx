import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/formStore";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  ArrowLeft,
  Edit,
  Eye,
  ExternalLink,
  Copy,
  Trash2,
  MessageSquare,
  BarChart3,
  Clock,
  Share2,
  Settings,
  MoreHorizontal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FormDetail = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { getForm, deleteForm, duplicateForm, updateForm } = useFormStore();

  const form = getForm(formId || "");

  if (!form) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Form not found</h1>
            <Button onClick={() => navigate("/dashboard/forms")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to forms
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this form?")) {
      deleteForm(form.id);
      navigate("/dashboard/forms");
    }
  };

  const handleDuplicate = () => {
    const newForm = duplicateForm(form.id);
    navigate(`/dashboard/forms/${newForm.id}/edit`);
  };

  const completionRate = form.views > 0 
    ? Math.round((form.responses.length / form.views) * 100) 
    : 0;

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/forms")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{form.title}</h1>
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
              </div>
              <p className="text-sm text-muted-foreground">
                Created {new Date(form.createdAt).toLocaleDateString()} • 
                Updated {new Date(form.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate(`/dashboard/forms/${form.id}/edit`)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            {form.status === "published" && (
              <Button variant="outline" onClick={() => window.open(`/form/${form.id}`, "_blank")}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open
              </Button>
            )}
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDuplicate}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Responses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{form.responses.length}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{form.views}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{completionRate}%</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{form.questions.length}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="responses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="responses">
            {form.responses.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        {form.questions.slice(0, 4).map((q) => (
                          <TableHead key={q.id} className="max-w-[200px] truncate">
                            {q.title}
                          </TableHead>
                        ))}
                        <TableHead>Submitted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {form.responses.map((response, index) => (
                        <TableRow key={response.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          {form.questions.slice(0, 4).map((q) => (
                            <TableCell key={q.id} className="max-w-[200px] truncate">
                              {String(response.answers[q.id] || "-")}
                            </TableCell>
                          ))}
                          <TableCell className="text-muted-foreground">
                            {new Date(response.submittedAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No responses yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share your form to start collecting responses
                  </p>
                  {form.status !== "published" && (
                    <Button onClick={() => updateForm(form.id, { status: "published", publishedAt: new Date() })}>
                      Publish form
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="questions">
            <div className="space-y-3">
              {form.questions.map((question, index) => (
                <Card key={question.id}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{question.title}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {question.type.replace("_", " ")}
                        {question.required && " • Required"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Analytics coming soon</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed insights and charts will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FormDetail;
