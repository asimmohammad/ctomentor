import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Investors from "./pages/Investors";
import Government from "./pages/Government";
import CaseStudies from "./pages/CaseStudies";
import Circle from "./pages/Circle";
import Apply from "./pages/Apply";
import Insights from "./pages/Insights";
import Article from "./pages/Article";
import About from "./pages/About";
import Experience from "./pages/Experience";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/government" element={<Government />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/circle" element={<Circle />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/pricing" element={<Navigate to="/services" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
