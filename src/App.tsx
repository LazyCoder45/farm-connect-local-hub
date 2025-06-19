
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import CropList from "@/pages/Crops/CropList";
import CropDetail from "@/pages/Crops/CropDetail";
import PostCrop from "@/pages/Crops/PostCrop";
import Profile from "@/pages/Profile/Profile";
import Settings from "@/pages/Settings/Settings";
import TransportList from "@/pages/Transport/TransportList";
import TopRatedFarmers from "@/pages/Farmers/TopRatedFarmers";
import OrderList from "@/pages/Orders/OrderList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/crops" element={<CropList />} />
              <Route path="/crops/:id" element={<CropDetail />} />
              <Route path="/post-crop" element={<PostCrop />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/transport" element={<TransportList />} />
              <Route path="/top-farmers" element={<TopRatedFarmers />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
