import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/stores/formStore";
import { ChevronUp, ChevronDown, Check } from "lucide-react";

const FormPreview = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { getForm, addResponse, incrementViews } = useFormStore();

  const form = getForm(formId || "");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (form) {
      incrementViews(form.id);
    }
  }, [form?.id]);

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Form not found</h1>
          <Button onClick={() => navigate("/")}>Go home</Button>
        </div>
      </div>
    );
  }

  if (form.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">This form has no questions</h1>
          <Button onClick={() => navigate("/dashboard/forms")}>Go to dashboard</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = form.questions[currentIndex];
  const progress = ((currentIndex + 1) / form.questions.length) * 100;

  const goToNext = useCallback(() => {
    if (currentIndex < form.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Submit form
      addResponse(form.id, {
        answers,
        metadata: {
          browser: navigator.userAgent,
          device: /Mobile|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        },
      });
      setIsComplete(true);
    }
  }, [currentIndex, form.questions.length, answers, form.id, addResponse]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleAnswer = (value: string | number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        goToNext();
      }
    },
    [goToNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (isComplete) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: form.settings.primaryColor }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-12 h-12" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Thank you!</h1>
          <p className="text-xl opacity-90 mb-8">Your response has been recorded.</p>
          <Button
            variant="outline"
            className="border-white text-white bg-transparent hover:bg-white/10"
            onClick={() => {
              setCurrentIndex(0);
              setAnswers({});
              setIsComplete(false);
            }}
          >
            Submit another response
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      {form.settings.showProgressBar && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
          <motion.div
            className="h-full"
            style={{ backgroundColor: form.settings.primaryColor }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Form content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              {/* Question number */}
              <div className="flex items-center gap-2 mb-6">
                <span className="font-medium" style={{ color: form.settings.primaryColor }}>
                  {currentIndex + 1}
                </span>
                <span className="text-muted-foreground">→</span>
              </div>

              {/* Question */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-2 leading-tight">
                {currentQuestion.title}
                {currentQuestion.required && <span className="text-destructive ml-1">*</span>}
              </h2>

              {currentQuestion.description && (
                <p className="text-muted-foreground mb-8">{currentQuestion.description}</p>
              )}

              {/* Input based on type */}
              <div className="mb-8">
                {(currentQuestion.type === "short_text" || currentQuestion.type === "email") && (
                  <input
                    type={currentQuestion.type === "email" ? "email" : "text"}
                    placeholder={currentQuestion.placeholder}
                    value={(answers[currentQuestion.id] as string) || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="w-full text-xl md:text-2xl border-b-2 border-muted pb-3 focus:outline-none transition-colors bg-transparent placeholder:text-muted-foreground/50"
                    style={{ borderBottomColor: answers[currentQuestion.id] ? form.settings.primaryColor : undefined }}
                    autoFocus
                  />
                )}

                {currentQuestion.type === "long_text" && (
                  <textarea
                    placeholder={currentQuestion.placeholder}
                    value={(answers[currentQuestion.id] as string) || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    rows={4}
                    className="w-full text-xl md:text-2xl border-b-2 border-muted pb-3 focus:outline-none transition-colors bg-transparent placeholder:text-muted-foreground/50 resize-none"
                    style={{ borderBottomColor: answers[currentQuestion.id] ? form.settings.primaryColor : undefined }}
                    autoFocus
                  />
                )}

                {currentQuestion.type === "number" && (
                  <input
                    type="number"
                    placeholder={currentQuestion.placeholder}
                    value={(answers[currentQuestion.id] as string) || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="w-full text-xl md:text-2xl border-b-2 border-muted pb-3 focus:outline-none transition-colors bg-transparent placeholder:text-muted-foreground/50"
                    style={{ borderBottomColor: answers[currentQuestion.id] ? form.settings.primaryColor : undefined }}
                    autoFocus
                  />
                )}

                {currentQuestion.type === "multiple_choice" && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleAnswer(option)}
                        className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left`}
                        style={{
                          borderColor: answers[currentQuestion.id] === option ? form.settings.primaryColor : undefined,
                          backgroundColor: answers[currentQuestion.id] === option ? form.settings.primaryColor + "10" : undefined,
                        }}
                      >
                        <span 
                          className="w-8 h-8 rounded border-2 flex items-center justify-center text-sm font-medium"
                          style={{
                            borderColor: answers[currentQuestion.id] === option ? form.settings.primaryColor : undefined,
                            color: answers[currentQuestion.id] === option ? form.settings.primaryColor : undefined,
                          }}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-lg">{option}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "rating" && (
                  <div className="flex gap-2 flex-wrap">
                    {[...Array(currentQuestion.maxRating || 10)].map((_, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => handleAnswer(i + 1)}
                        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-medium transition-all`}
                        style={{
                          borderColor: answers[currentQuestion.id] === i + 1 ? form.settings.primaryColor : undefined,
                          backgroundColor: answers[currentQuestion.id] === i + 1 ? form.settings.primaryColor : undefined,
                          color: answers[currentQuestion.id] === i + 1 ? "white" : undefined,
                        }}
                      >
                        {i + 1}
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "yes_no" && (
                  <div className="flex gap-4">
                    {["Yes", "No"].map((option) => (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => handleAnswer(option)}
                        className={`px-8 py-4 rounded-lg border-2 font-medium transition-all`}
                        style={{
                          borderColor: answers[currentQuestion.id] === option ? form.settings.primaryColor : undefined,
                          backgroundColor: answers[currentQuestion.id] === option ? form.settings.primaryColor : undefined,
                          color: answers[currentQuestion.id] === option ? "white" : undefined,
                        }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "date" && (
                  <input
                    type="date"
                    value={(answers[currentQuestion.id] as string) || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="text-xl border-2 border-muted rounded-lg p-3 focus:outline-none transition-colors bg-transparent"
                    style={{ borderColor: answers[currentQuestion.id] ? form.settings.primaryColor : undefined }}
                  />
                )}
              </div>

              {/* Submit button */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={goToNext}
                  style={{ backgroundColor: form.settings.primaryColor }}
                  className="text-white hover:opacity-90"
                >
                  {currentIndex === form.questions.length - 1 ? "Submit" : "OK"}
                  <Check className="w-4 h-4 ml-2" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  press <strong>Enter ↵</strong>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-1">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="w-10 h-10"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="w-10 h-10"
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>

      {/* Branding */}
      <div className="fixed bottom-8 left-8">
        <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="6" className="fill-current" />
            <path d="M8 12H24M12 12V22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="text-sm font-medium">Powered by Typeform</span>
        </a>
      </div>
    </div>
  );
};

export default FormPreview;
