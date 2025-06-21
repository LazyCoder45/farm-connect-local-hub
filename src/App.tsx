
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
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
import FarmerDashboard from "@/pages/Farmer/FarmerDashboard";
import WeatherForecast from "@/pages/Farmer/WeatherForecast";
import CropGuide from "@/pages/Farmer/CropGuide";
import FarmingTips from "@/pages/Farmer/FarmingTips";
import NutritionalInfo from "@/pages/Consumer/NutritionalInfo";
import CropCalendar from "@/pages/Consumer/CropCalendar";
import ForumHome from "@/pages/Forum/ForumHome";
import ForumCategory from "@/pages/Forum/ForumCategory";
import ForumPost from "@/pages/Forum/ForumPost";
import CreateForumPost from "@/pages/Forum/CreateForumPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
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
                <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
                <Route path="/farmer/weather" element={<WeatherForecast />} />
                <Route path="/farmer/crop-guide" element={<CropGuide />} />
                <Route path="/farmer/tips" element={<FarmingTips />} />
                <Route path="/consumer/nutrition" element={<NutritionalInfo />} />
                <Route path="/consumer/calendar" element={<CropCalendar />} />
                <Route path="/forum" element={<ForumHome />} />
                <Route path="/forum/category/:categoryId" element={<ForumCategory />} />
                <Route path="/forum/post/:postId" element={<ForumPost />} />
                <Route path="/forum/create-post" element={<CreateForumPost />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
