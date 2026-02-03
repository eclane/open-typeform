import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Public pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import FormsList from "./pages/FormsList";
import FormDetail from "./pages/FormDetail";
import FormBuilder from "./pages/FormBuilder";
import FormPreview from "./pages/FormPreview";
import Results from "./pages/Results";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

// Redirect authenticated users away from auth page
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Index />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/demo" element={<Demo />} />
    <Route
      path="/auth"
      element={
        <PublicRoute>
          <Auth />
        </PublicRoute>
      }
    />
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Auth />
        </PublicRoute>
      }
    />
    <Route
      path="/signup"
      element={
        <PublicRoute>
          <Auth />
        </PublicRoute>
      }
    />

    {/* Form viewing (public) */}
    <Route path="/form/:formId" element={<FormPreview />} />
    <Route path="/preview/:formId" element={<FormPreview />} />

    {/* Protected dashboard routes */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/forms"
      element={
        <ProtectedRoute>
          <FormsList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/forms/:formId"
      element={
        <ProtectedRoute>
          <FormDetail />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/forms/:formId/edit"
      element={
        <ProtectedRoute>
          <FormBuilder />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/create"
      element={
        <ProtectedRoute>
          <FormBuilder />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/results"
      element={
        <ProtectedRoute>
          <Results />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/templates"
      element={
        <ProtectedRoute>
          <Templates />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/workspaces"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard/help"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    {/* Catch-all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
