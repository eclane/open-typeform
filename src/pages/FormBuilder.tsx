import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFormStore, Question, QuestionType } from "@/stores/formStore";
import {
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Eye,
  Settings,
  Type,
  Mail,
  AlignLeft,
  List,
  Star,
  Hash,
  Calendar,
  ThumbsUp,
  ChevronDown,
  Upload,
  Save,
  ExternalLink,
  Palette
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const questionTypes: { type: QuestionType; label: string; icon: React.ReactNode }[] = [
  { type: "short_text", label: "Short Text", icon: <Type className="w-4 h-4" /> },
  { type: "long_text", label: "Long Text", icon: <AlignLeft className="w-4 h-4" /> },
  { type: "email", label: "Email", icon: <Mail className="w-4 h-4" /> },
  { type: "multiple_choice", label: "Multiple Choice", icon: <List className="w-4 h-4" /> },
  { type: "rating", label: "Rating", icon: <Star className="w-4 h-4" /> },
  { type: "number", label: "Number", icon: <Hash className="w-4 h-4" /> },
  { type: "date", label: "Date", icon: <Calendar className="w-4 h-4" /> },
  { type: "yes_no", label: "Yes/No", icon: <ThumbsUp className="w-4 h-4" /> },
  { type: "dropdown", label: "Dropdown", icon: <ChevronDown className="w-4 h-4" /> },
  { type: "file_upload", label: "File Upload", icon: <Upload className="w-4 h-4" /> },
];

const FormBuilder = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { getForm, updateForm, addQuestion, updateQuestion, deleteQuestion, reorderQuestions } = useFormStore();

  const form = getForm(formId || "");
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Form not found</h1>
          <Button onClick={() => navigate("/dashboard/forms")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to forms
          </Button>
        </div>
      </div>
    );
  }

  const selectedQuestion = form.questions.find((q) => q.id === selectedQuestionId);

  const handleAddQuestion = (type: QuestionType) => {
    const newQuestion: Omit<Question, "id"> = {
      type,
      title: getDefaultTitle(type),
      required: false,
      placeholder: getDefaultPlaceholder(type),
      options: type === "multiple_choice" || type === "dropdown" ? ["Option 1", "Option 2", "Option 3"] : undefined,
      maxRating: type === "rating" ? 10 : undefined,
    };
    addQuestion(form.id, newQuestion);
  };

  const getDefaultTitle = (type: QuestionType): string => {
    const titles: Record<QuestionType, string> = {
      short_text: "What's your name?",
      long_text: "Tell us more about yourself",
      email: "What's your email?",
      multiple_choice: "Which option do you prefer?",
      rating: "How would you rate your experience?",
      number: "Enter a number",
      date: "Select a date",
      yes_no: "Do you agree?",
      dropdown: "Select an option",
      file_upload: "Upload a file",
      welcome: "Welcome!",
      thank_you: "Thank you!",
    };
    return titles[type];
  };

  const getDefaultPlaceholder = (type: QuestionType): string => {
    const placeholders: Record<QuestionType, string> = {
      short_text: "Type your answer here...",
      long_text: "Type your answer here...",
      email: "name@example.com",
      multiple_choice: "",
      rating: "",
      number: "0",
      date: "",
      yes_no: "",
      dropdown: "Select...",
      file_upload: "",
      welcome: "",
      thank_you: "",
    };
    return placeholders[type];
  };

  const handlePublish = () => {
    updateForm(form.id, { 
      status: "published", 
      publishedAt: new Date() 
    });
  };

  const handleReorder = (newOrder: Question[]) => {
    // Find the indices and reorder
    const currentIndex = form.questions.findIndex((q) => q.id === newOrder[0]?.id);
    if (currentIndex !== -1) {
      // Update all questions at once
      updateForm(form.id, { questions: newOrder });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header */}
      <header className="h-14 bg-background border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/forms/${form.id}`)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Input
            value={form.title}
            onChange={(e) => updateForm(form.id, { title: e.target.value })}
            className="font-semibold text-lg border-none shadow-none focus-visible:ring-0 bg-transparent max-w-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.open(`/preview/${form.id}`, "_blank")}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Form Settings</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label>Form Title</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => updateForm(form.id, { title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={form.description || ""}
                    onChange={(e) => updateForm(form.id, { description: e.target.value })}
                    placeholder="Add a description..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show progress bar</Label>
                  <Switch
                    checked={form.settings.showProgressBar}
                    onCheckedChange={(checked) =>
                      updateForm(form.id, {
                        settings: { ...form.settings, showProgressBar: checked },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Primary Color
                  </Label>
                  <div className="flex gap-2">
                    {["#6C5CE7", "#00B894", "#E17055", "#0984E3", "#FDCB6E", "#E84393"].map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          form.settings.primaryColor === color ? "border-foreground scale-110" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          updateForm(form.id, {
                            settings: { ...form.settings, primaryColor: color },
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button 
            onClick={handlePublish}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            {form.status === "published" ? (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                Published
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Publish
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Left sidebar - Question types */}
        <aside className="w-64 bg-background border-r border-border p-4 overflow-y-auto">
          <h3 className="font-semibold text-foreground mb-4">Add Question</h3>
          <div className="space-y-2">
            {questionTypes.map(({ type, label, icon }) => (
              <Button
                key={type}
                variant="ghost"
                className="w-full justify-start gap-3"
                onClick={() => handleAddQuestion(type)}
              >
                {icon}
                {label}
              </Button>
            ))}
          </div>
        </aside>

        {/* Center - Form canvas */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            {form.questions.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Plus className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Add your first question</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click on a question type from the left panel to get started
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Reorder.Group
                axis="y"
                values={form.questions}
                onReorder={handleReorder}
                className="space-y-4"
              >
                {form.questions.map((question, index) => (
                  <Reorder.Item
                    key={question.id}
                    value={question}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <motion.div layout>
                      <Card
                        className={`transition-all ${
                          selectedQuestionId === question.id
                            ? "border-primary ring-2 ring-primary/20"
                            : "hover:border-muted-foreground/50"
                        }`}
                        onClick={() => setSelectedQuestionId(question.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-1 cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium text-primary">{index + 1}</span>
                                <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">
                                  {question.type.replace("_", " ")}
                                </span>
                                {question.required && (
                                  <span className="text-xs text-destructive">*required</span>
                                )}
                              </div>
                              <Input
                                value={question.title}
                                onChange={(e) =>
                                  updateQuestion(form.id, question.id, { title: e.target.value })
                                }
                                className="text-lg font-medium border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                                placeholder="Enter your question..."
                              />
                              {question.description && (
                                <p className="text-sm text-muted-foreground mt-1">{question.description}</p>
                              )}

                              {/* Question type specific preview */}
                              <div className="mt-4 opacity-50">
                                {(question.type === "short_text" || question.type === "email") && (
                                  <div className="border-b-2 border-muted py-2 text-muted-foreground">
                                    {question.placeholder || "Type your answer here..."}
                                  </div>
                                )}
                                {question.type === "long_text" && (
                                  <div className="border-b-2 border-muted py-2 text-muted-foreground h-20">
                                    {question.placeholder || "Type your answer here..."}
                                  </div>
                                )}
                                {question.type === "multiple_choice" && (
                                  <div className="space-y-2">
                                    {question.options?.map((option, i) => (
                                      <div key={i} className="flex items-center gap-2 p-2 border rounded">
                                        <span className="w-6 h-6 rounded border flex items-center justify-center text-xs">
                                          {String.fromCharCode(65 + i)}
                                        </span>
                                        {option}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {question.type === "rating" && (
                                  <div className="flex gap-2">
                                    {[...Array(question.maxRating || 10)].map((_, i) => (
                                      <div key={i} className="w-10 h-10 border rounded flex items-center justify-center">
                                        {i + 1}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {question.type === "yes_no" && (
                                  <div className="flex gap-4">
                                    <div className="px-6 py-2 border rounded">Yes</div>
                                    <div className="px-6 py-2 border rounded">No</div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteQuestion(form.id, question.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}

            {/* Add question button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full mt-4 border-dashed">
                  <Plus className="w-4 h-4 mr-2" />
                  Add question
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {questionTypes.map(({ type, label, icon }) => (
                  <DropdownMenuItem key={type} onClick={() => handleAddQuestion(type)}>
                    {icon}
                    <span className="ml-2">{label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </main>

        {/* Right sidebar - Question settings */}
        {selectedQuestion && (
          <aside className="w-80 bg-background border-l border-border p-4 overflow-y-auto">
            <h3 className="font-semibold text-foreground mb-4">Question Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Question</Label>
                <Textarea
                  value={selectedQuestion.title}
                  onChange={(e) =>
                    updateQuestion(form.id, selectedQuestion.id, { title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Textarea
                  value={selectedQuestion.description || ""}
                  onChange={(e) =>
                    updateQuestion(form.id, selectedQuestion.id, { description: e.target.value })
                  }
                  placeholder="Add a description..."
                />
              </div>

              {(selectedQuestion.type === "short_text" ||
                selectedQuestion.type === "long_text" ||
                selectedQuestion.type === "email") && (
                <div className="space-y-2">
                  <Label>Placeholder</Label>
                  <Input
                    value={selectedQuestion.placeholder || ""}
                    onChange={(e) =>
                      updateQuestion(form.id, selectedQuestion.id, { placeholder: e.target.value })
                    }
                  />
                </div>
              )}

              {(selectedQuestion.type === "multiple_choice" || selectedQuestion.type === "dropdown") && (
                <div className="space-y-2">
                  <Label>Options</Label>
                  <div className="space-y-2">
                    {selectedQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(selectedQuestion.options || [])];
                            newOptions[index] = e.target.value;
                            updateQuestion(form.id, selectedQuestion.id, { options: newOptions });
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newOptions = selectedQuestion.options?.filter((_, i) => i !== index);
                            updateQuestion(form.id, selectedQuestion.id, { options: newOptions });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        const newOptions = [...(selectedQuestion.options || []), `Option ${(selectedQuestion.options?.length || 0) + 1}`];
                        updateQuestion(form.id, selectedQuestion.id, { options: newOptions });
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add option
                    </Button>
                  </div>
                </div>
              )}

              {selectedQuestion.type === "rating" && (
                <div className="space-y-2">
                  <Label>Max Rating</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={selectedQuestion.maxRating || 10}
                    onChange={(e) =>
                      updateQuestion(form.id, selectedQuestion.id, {
                        maxRating: parseInt(e.target.value) || 10,
                      })
                    }
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <Label>Required</Label>
                <Switch
                  checked={selectedQuestion.required}
                  onCheckedChange={(checked) =>
                    updateQuestion(form.id, selectedQuestion.id, { required: checked })
                  }
                />
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
