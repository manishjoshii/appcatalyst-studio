import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Loader2 } from "lucide-react";

interface PublicRouteProps {
  children?: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 glow-effect">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span>Loading AppCatalyst Studio...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    // If user is already authenticated, redirect them to the origin or default /projects
    const origin = (location.state as { from?: Location })?.from?.pathname || "/projects";
    return <Navigate to={origin} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
