import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormStore, Form } from "@/stores/formStore";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Plus,
  Search,
  MoreHorizontal,
  FileText,
  Eye,
  MessageSquare,
  Copy,
  Trash2,
  Edit,
  ExternalLink,
  Clock,
  Filter,
  Grid,
  List
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const FormsList = () => {
  const { forms, createForm, deleteForm, duplicateForm } = useFormStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "closed">("all");

  const filteredForms = forms
    .filter((form) => {
      const matchesSearch = form.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || form.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleCreateForm = () => {
    const newForm = createForm();
    navigate(`/dashboard/forms/${newForm.id}/edit`);
  };

  const handleDelete = (formId: string) => {
    if (confirm("Are you sure you want to delete this form?")) {
      deleteForm(formId);
    }
  };

  const handleDuplicate = (formId: string) => {
    const newForm = duplicateForm(formId);
    navigate(`/dashboard/forms/${newForm.id}/edit`);
  };

  const FormCard = ({ form }: { form: Form }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <Card className="group hover:border-primary transition-all cursor-pointer">
        <CardContent className="p-0">
          {/* Preview area */}
          <Link to={`/dashboard/forms/${form.id}`}>
            <div className="h-40 bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-50"
                style={{ backgroundColor: form.settings.primaryColor + "20" }}
              />
              <FileText className="w-12 h-12 text-muted-foreground" />
              <div className="absolute bottom-2 left-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    form.status === "published"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : form.status === "draft"
                      ? "bg-background text-muted-foreground border"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                  }`}
                >
                  {form.status}
                </span>
              </div>
            </div>
          </Link>

          {/* Info area */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <Link to={`/dashboard/forms/${form.id}`} className="flex-1">
                <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                  {form.title}
                </h3>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/dashboard/forms/${form.id}/edit`)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDuplicate(form.id)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  {form.status === "published" && (
                    <DropdownMenuItem onClick={() => window.open(`/form/${form.id}`, "_blank")}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open form
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleDelete(form.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                {form.responses.length}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {form.views}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {new Date(form.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const FormListItem = ({ form }: { form: Form }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
    >
      <Card className="group hover:border-primary transition-all">
        <CardContent className="flex items-center justify-between p-4">
          <Link to={`/dashboard/forms/${form.id}`} className="flex items-center gap-4 flex-1">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: form.settings.primaryColor + "20" }}
            >
              <FileText className="w-6 h-6" style={{ color: form.settings.primaryColor }} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                {form.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {form.responses.length} responses
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {form.views} views
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(form.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate(`/dashboard/forms/${form.id}/edit`)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDuplicate(form.id)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                {form.status === "published" && (
                  <DropdownMenuItem onClick={() => window.open(`/form/${form.id}`, "_blank")}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open form
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDelete(form.id)} className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">My Forms</h1>
            <p className="text-muted-foreground">{forms.length} forms total</p>
          </div>
          <Button onClick={handleCreateForm} className="bg-foreground text-background hover:bg-foreground/90">
            <Plus className="w-4 h-4 mr-2" />
            Create form
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                {statusFilter === "all" ? "All status" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>All status</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("published")}>Published</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("draft")}>Draft</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("closed")}>Closed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Forms */}
        {filteredForms.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredForms.map((form) => (
                <FormCard key={form.id} form={form} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredForms.map((form) => (
                <FormListItem key={form.id} form={form} />
              ))}
            </div>
          )
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                {searchQuery ? "No forms found" : "No forms yet"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery
                  ? "Try adjusting your search or filters"
                  : "Create your first form to get started"}
              </p>
              {!searchQuery && (
                <Button onClick={handleCreateForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create form
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FormsList;
