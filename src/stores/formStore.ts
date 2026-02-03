import { create } from "zustand";
import { persist } from "zustand/middleware";

export type QuestionType = 
  | "short_text" 
  | "long_text" 
  | "email" 
  | "multiple_choice" 
  | "rating" 
  | "number" 
  | "date" 
  | "yes_no" 
  | "dropdown" 
  | "file_upload"
  | "welcome"
  | "thank_you";

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  maxRating?: number;
  buttonText?: string;
}

export interface FormResponse {
  id: string;
  formId: string;
  answers: Record<string, string | number | string[]>;
  submittedAt: Date;
  metadata: {
    browser?: string;
    device?: string;
    location?: string;
  };
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  responses: FormResponse[];
  settings: {
    theme: "light" | "dark";
    primaryColor: string;
    showProgressBar: boolean;
    shuffleQuestions: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: "draft" | "published" | "closed";
  views: number;
}

interface FormStore {
  forms: Form[];
  currentFormId: string | null;
  createForm: (title?: string) => Form;
  updateForm: (id: string, updates: Partial<Form>) => void;
  deleteForm: (id: string) => void;
  duplicateForm: (id: string) => Form;
  getForm: (id: string) => Form | undefined;
  setCurrentForm: (id: string | null) => void;
  addQuestion: (formId: string, question: Omit<Question, "id">) => void;
  updateQuestion: (formId: string, questionId: string, updates: Partial<Question>) => void;
  deleteQuestion: (formId: string, questionId: string) => void;
  reorderQuestions: (formId: string, startIndex: number, endIndex: number) => void;
  addResponse: (formId: string, response: Omit<FormResponse, "id" | "formId" | "submittedAt">) => void;
  incrementViews: (formId: string) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// Sample data for demonstration
const sampleForms: Form[] = [
  {
    id: "form_1",
    title: "Customer Feedback Survey",
    description: "Help us improve our service",
    questions: [
      {
        id: "q1",
        type: "short_text",
        title: "What's your name?",
        required: true,
        placeholder: "Type your answer here...",
      },
      {
        id: "q2",
        type: "email",
        title: "What's your email address?",
        required: true,
        placeholder: "name@example.com",
      },
      {
        id: "q3",
        type: "rating",
        title: "How satisfied are you with our service?",
        required: true,
        maxRating: 10,
      },
      {
        id: "q4",
        type: "long_text",
        title: "Any additional feedback?",
        required: false,
        placeholder: "Tell us what you think...",
      },
    ],
    responses: [
      {
        id: "r1",
        formId: "form_1",
        answers: { q1: "John Doe", q2: "john@example.com", q3: 9, q4: "Great service!" },
        submittedAt: new Date("2024-01-15"),
        metadata: { browser: "Chrome", device: "Desktop" },
      },
      {
        id: "r2",
        formId: "form_1",
        answers: { q1: "Jane Smith", q2: "jane@example.com", q3: 8, q4: "Very good" },
        submittedAt: new Date("2024-01-16"),
        metadata: { browser: "Safari", device: "Mobile" },
      },
      {
        id: "r3",
        formId: "form_1",
        answers: { q1: "Bob Wilson", q2: "bob@example.com", q3: 10, q4: "" },
        submittedAt: new Date("2024-01-17"),
        metadata: { browser: "Firefox", device: "Desktop" },
      },
    ],
    settings: {
      theme: "light",
      primaryColor: "#6C5CE7",
      showProgressBar: true,
      shuffleQuestions: false,
    },
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-17"),
    publishedAt: new Date("2024-01-12"),
    status: "published",
    views: 156,
  },
  {
    id: "form_2",
    title: "Event Registration",
    description: "Sign up for our upcoming event",
    questions: [
      {
        id: "q1",
        type: "short_text",
        title: "Full name",
        required: true,
      },
      {
        id: "q2",
        type: "email",
        title: "Email",
        required: true,
      },
      {
        id: "q3",
        type: "multiple_choice",
        title: "Which session interests you most?",
        options: ["Morning Workshop", "Afternoon Keynote", "Evening Networking"],
        required: true,
      },
    ],
    responses: [
      {
        id: "r1",
        formId: "form_2",
        answers: { q1: "Alice Brown", q2: "alice@example.com", q3: "Morning Workshop" },
        submittedAt: new Date("2024-01-18"),
        metadata: { browser: "Chrome", device: "Desktop" },
      },
    ],
    settings: {
      theme: "light",
      primaryColor: "#00B894",
      showProgressBar: true,
      shuffleQuestions: false,
    },
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-18"),
    status: "published",
    publishedAt: new Date("2024-01-15"),
    views: 89,
  },
  {
    id: "form_3",
    title: "Product Research",
    description: "Help us understand your needs",
    questions: [],
    responses: [],
    settings: {
      theme: "light",
      primaryColor: "#6C5CE7",
      showProgressBar: true,
      shuffleQuestions: false,
    },
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19"),
    status: "draft",
    views: 0,
  },
];

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      forms: sampleForms,
      currentFormId: null,

      createForm: (title = "Untitled Form") => {
        const newForm: Form = {
          id: generateId(),
          title,
          questions: [],
          responses: [],
          settings: {
            theme: "light",
            primaryColor: "#6C5CE7",
            showProgressBar: true,
            shuffleQuestions: false,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          status: "draft",
          views: 0,
        };
        set((state) => ({ forms: [...state.forms, newForm] }));
        return newForm;
      },

      updateForm: (id, updates) => {
        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === id
              ? { ...form, ...updates, updatedAt: new Date() }
              : form
          ),
        }));
      },

      deleteForm: (id) => {
        set((state) => ({
          forms: state.forms.filter((form) => form.id !== id),
        }));
      },

      duplicateForm: (id) => {
        const form = get().forms.find((f) => f.id === id);
        if (!form) throw new Error("Form not found");

        const newForm: Form = {
          ...form,
          id: generateId(),
          title: `${form.title} (Copy)`,
          responses: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedAt: undefined,
          status: "draft",
          views: 0,
        };
        set((state) => ({ forms: [...state.forms, newForm] }));
        return newForm;
      },

      getForm: (id) => get().forms.find((f) => f.id === id),

      setCurrentForm: (id) => set({ currentFormId: id }),

      addQuestion: (formId, question) => {
        const newQuestion: Question = {
          ...question,
          id: generateId(),
        };
        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === formId
              ? {
                  ...form,
                  questions: [...form.questions, newQuestion],
                  updatedAt: new Date(),
                }
              : form
          ),
        }));
      },

      updateQuestion: (formId, questionId, updates) => {
        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === formId
              ? {
                  ...form,
                  questions: form.questions.map((q) =>
                    q.id === questionId ? { ...q, ...updates } : q
                  ),
                  updatedAt: new Date(),
                }
              : form
          ),
        }));
      },

      deleteQuestion: (formId, questionId) => {
        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === formId
              ? {
                  ...form,
                  questions: form.questions.filter((q) => q.id !== questionId),
                  updatedAt: new Date(),
                }
              : form
          ),
        }));
      },

      reorderQuestions: (formId, startIndex, endIndex) => {
        set((state) => ({
          forms: state.forms.map((form) => {
            if (form.id !== formId) return form;

            const questions = Array.from(form.questions);
            const [removed] = questions.splice(startIndex, 1);
            questions.splice(endIndex, 0, removed);

            return { ...form, questions, updatedAt: new Date() };
          }),
        }));
      },

      addResponse: (formId, response) => {
        const newResponse: FormResponse = {
          ...response,
          id: generateId(),
          formId,
          submittedAt: new Date(),
        };
        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === formId
              ? { ...form, responses: [...form.responses, newResponse] }
              : form
          ),
        }));
      },

      incrementViews: (formId) => {
        set((state) => ({
          forms: state.forms.map((form) =>
            form.id === formId ? { ...form, views: form.views + 1 } : form
          ),
        }));
      },
    }),
    {
      name: "typeform-storage",
    }
  )
);
