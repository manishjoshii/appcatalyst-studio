import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";
import { PublicRoute } from "@/components/routes/PublicRoute";
import Index from "./pages/Index";
import { LoginModal } from "./components/LoginModal";
import { ProjectView } from "./pages/ProjectView";
import { ProjectsDashboard } from "./pages/ProjectsDashboard";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Root landing redirect */}
            <Route path="/" element={<Index />} />

            {/* Public / Guest-only routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginModal />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Authenticated-only routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/projects" element={<ProjectsDashboard />} />
              <Route path="/projects/:projectId" element={<ProjectView />} />
            </Route>

            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
