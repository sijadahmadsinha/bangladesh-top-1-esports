import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ParticleBackground from './components/layout/ParticleBackground';
import CustomCursor from './components/layout/CustomCursor';
import ScrollToTop from './components/layout/ScrollToTop';

// Pages
import Home from './pages/Home';
import Team from './pages/Team';
import OfficialTournaments from './pages/OfficialTournaments';
import UnofficialTournaments from './pages/UnofficialTournaments';
import Results from './pages/Results';
import Achievements from './pages/Achievements';
import Earnings from './pages/Earnings';
import Gallery from './pages/Gallery';
import Community from './pages/Community';
import PlayerProfile from './pages/PlayerProfile';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPlayers from './pages/admin/AdminPlayers';
import AdminTournaments from './pages/admin/AdminTournaments';
import AdminResults from './pages/admin/AdminResults';
import AdminAchievements from './pages/admin/AdminAchievements';
import AdminEarnings from './pages/admin/AdminEarnings';
import AdminGallery from './pages/admin/AdminGallery';
import AdminManagement from './pages/admin/AdminManagement';

const PublicLayout = ({ children }) => (
  <>
    <ParticleBackground />
    <div className="site-bg" />
    <Navbar />
    <main className="relative z-10">
      {children}
    </main>
    <Footer />
  </>
);

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-obsidian">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border border-silver/20 border-t-silver/80 rounded-full animate-spin" />
          <p className="font-mono text-xs text-steel tracking-ultra">TOP-1</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
      <Route path="/player/:id" element={<PublicLayout><PlayerProfile /></PublicLayout>} />
      <Route path="/official-tournaments" element={<PublicLayout><OfficialTournaments /></PublicLayout>} />
      <Route path="/unofficial-tournaments" element={<PublicLayout><UnofficialTournaments /></PublicLayout>} />
      <Route path="/results" element={<PublicLayout><Results /></PublicLayout>} />
      <Route path="/achievements" element={<PublicLayout><Achievements /></PublicLayout>} />
      <Route path="/earnings" element={<PublicLayout><Earnings /></PublicLayout>} />
      <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
      <Route path="/community" element={<PublicLayout><Community /></PublicLayout>} />

      {/* Auth route */}
      <Route path="/login" element={<Navigate to="/top-1website#author-adminbangladesh$top1" replace />} />

      {/* Admin routes */}
      <Route path="/top-1website" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="players" element={<AdminPlayers />} />
        <Route path="tournaments" element={<AdminTournaments />} />
        <Route path="results" element={<AdminResults />} />
        <Route path="achievements" element={<AdminAchievements />} />
        <Route path="earnings" element={<AdminEarnings />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="management" element={<AdminManagement />} />
      </Route>

      <Route path="*" element={<PublicLayout><PageNotFound /></PublicLayout>} />
    </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;