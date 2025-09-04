import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Dashboard } from "@/pages/Dashboard";
import { UserManagement } from "@/pages/UserManagement";
import { KYCManagement } from "@/pages/KYCManagement";
import { WalletManagement } from "@/pages/WalletManagement";
import { TransactionManagement } from "@/pages/TransactionManagement";
import { CommissionSettings } from "@/pages/CommissionSettings";
import { ServiceControl } from "@/pages/ServiceControl";
import { Reports } from "@/pages/Reports";
import { ReferralCashback } from "@/pages/ReferralCashback";
import { Support } from "@/pages/Support";
import { CMSManagement } from "@/pages/CMSManagement";
import { NotificationManagement } from "@/pages/NotificationManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/kyc" element={<KYCManagement />} />
            <Route path="/wallet" element={<WalletManagement />} />
            <Route path="/transactions" element={<TransactionManagement />} />
            <Route path="/commission" element={<CommissionSettings />} />
            <Route path="/services" element={<ServiceControl />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/referral" element={<ReferralCashback />} />
            <Route path="/support" element={<Support />} />
            <Route path="/cms" element={<CMSManagement />} />
            <Route path="/notifications" element={<NotificationManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
