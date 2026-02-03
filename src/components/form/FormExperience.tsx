import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Check } from "lucide-react";

interface Question {
  id: number;
  type: "text" | "email" | "multiple" | "rating" | "long-text";
  question: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    type: "text",
    question: "First, what's your name?",
    placeholder: "Type your answer here...",
    required: true,
  },
  {
    id: 2,
    type: "email",
    question: "Great to meet you! What's your email address?",
    placeholder: "name@example.com",
    required: true,
  },
  {
    id: 3,
    type: "multiple",
    question: "What brings you to Typeform today?",
    options: ["Lead generation", "Customer feedback", "Market research", "Employee surveys", "Other"],
    required: true,
  },
  {
    id: 4,
    type: "rating",
    question: "On a scale of 1-10, how would you rate your current form solution?",
    required: false,
  },
  {
    id: 5,
    type: "long-text",
    question: "Any additional comments or questions?",
    placeholder: "Type your answer here...",
    required: false,
  },
];

const FormExperience = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = sampleQuestions[currentIndex];
  const progress = ((currentIndex + 1) / sampleQuestions.length) * 100;

  const goToNext = useCallback(() => {
    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex]);

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
      <div className="min-h-screen bg-primary flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-primary-foreground"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-12 h-12" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Thank you!</h1>
          <p className="text-xl opacity-90 mb-8">Your response has been recorded.</p>
          <Button
            variant="outline"
            className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
            onClick={() => {
              setCurrentIndex(0);
              setAnswers({});
              setIsComplete(false);
            }}
          >
            Start over
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

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
                <span className="text-primary font-medium">
                  {currentIndex + 1}
                </span>
                <span className="text-muted-foreground">→</span>
              </div>

              {/* Question */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-8 leading-tight">
                {currentQuestion.question}
              </h2>

              {/* Input based on type */}
              {currentQuestion.type === "text" && (
                <input
                  type="text"
                  placeholder={currentQuestion.placeholder}
                  value={(answers[currentQuestion.id] as string) || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full text-xl md:text-2xl border-b-2 border-muted pb-3 focus:border-primary focus:outline-none transition-colors bg-transparent placeholder:text-muted-foreground/50"
                  autoFocus
                />
              )}

              {currentQuestion.type === "email" && (
                <input
                  type="email"
                  placeholder={currentQuestion.placeholder}
                  value={(answers[currentQuestion.id] as string) || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full text-xl md:text-2xl border-b-2 border-muted pb-3 focus:border-primary focus:outline-none transition-colors bg-transparent placeholder:text-muted-foreground/50"
                  autoFocus
                />
              )}

              {currentQuestion.type === "long-text" && (
                <textarea
                  placeholder={currentQuestion.placeholder}
                  value={(answers[currentQuestion.id] as string) || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  rows={4}
                  className="w-full text-xl md:text-2xl border-b-2 border-muted pb-3 focus:border-primary focus:outline-none transition-colors bg-transparent placeholder:text-muted-foreground/50 resize-none"
                  autoFocus
                />
              )}

              {currentQuestion.type === "multiple" && (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option)}
                      className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all text-left ${
                        answers[currentQuestion.id] === option
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="w-8 h-8 rounded border-2 border-current flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-lg">{option}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {currentQuestion.type === "rating" && (
                <div className="flex gap-2 flex-wrap">
                  {[...Array(10)].map((_, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleAnswer(i + 1)}
                      className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-medium transition-all ${
                        answers[currentQuestion.id] === i + 1
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {i + 1}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Submit button */}
              <div className="mt-8 flex items-center gap-4">
                <Button
                  onClick={goToNext}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {currentIndex === sampleQuestions.length - 1 ? "Submit" : "OK"}
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

      {/* Typeform branding */}
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

export default FormExperience;
