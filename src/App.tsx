
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GarnishmentProvider } from "./context/GarnishmentContext";
import NotFound from "./pages/NotFound";
import AddGarnishment from "./pages/AddGarnishment";
import GarnishmentDetails from "./pages/GarnishmentDetails";
import TeamOrders from "./pages/TeamOrders";
import Landing from "./pages/Landing";
import GarnishmentOrders from "./pages/GarnishmentOrders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GarnishmentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/garnishment-orders" element={<GarnishmentOrders />} />
            <Route path="/add-garnishment" element={<AddGarnishment />} />
            <Route path="/garnishment/:id" element={<GarnishmentDetails />} />
            <Route path="/team/:teamId" element={<TeamOrders />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GarnishmentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
