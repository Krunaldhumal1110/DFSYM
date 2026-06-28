import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import PageSkeleton from './components/ui/PageSkeleton';
import YearRedirect from './components/YearRedirect';
import { LangProvider } from './i18n';
import { useSlowNetwork } from './hooks/useSlowNetwork';
import { lazyRetry } from './utils/lazyRetry';
import Awards from './pages/Awards';
import Supporters from './components/Supporters';
import NewsArticles from './components/NewsArticles';
import ActivityDetails from './pages/ActivityDetails';
import Sponsors from './pages/Sponsors';

const Home = lazy(() => lazyRetry(() => import('./pages/Home')));
const Celebrations = lazy(() => lazyRetry(() => import('./pages/Celebrations')));
const CelebrationDetail = lazy(() => lazyRetry(() => import('./pages/CelebrationDetail')));
const History = lazy(() => lazyRetry(() => import('./pages/History')));
const Guests = lazy(() => lazyRetry(() => import('./pages/Guests')));
const Activities = lazy(() => lazyRetry(() => import('./pages/Activities')));
const GalleryPage = lazy(() => lazyRetry(() => import('./pages/Gallery')));
const About = lazy(() => lazyRetry(() => import('./pages/About')));
const Contact = lazy(() => lazyRetry(() => import('./pages/Contact')));
const AdminLogin = lazy(() => lazyRetry(() => import('./admin/AdminLogin')));
const AdminDashboard = lazy(() => lazyRetry(() => import('./admin/AdminDashboard')));
const AdminEdit = lazy(() => lazyRetry(() => import('./admin/AdminEdit')));

function getSkeletonVariant(pathname: string): 'home' | 'grid' | 'detail' | 'page' {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/celebration/')) return 'detail';
  if (pathname === '/celebrations' || pathname === '/gallery') return 'grid';
  return 'page';
}

const RouteFallback: React.FC = () => {
  const { pathname } = useLocation();
  const slow = useSlowNetwork();
  const variant = getSkeletonVariant(pathname);

  if (slow) {
    return <PageSkeleton variant={variant} />;
  }

  return (
    <div className="min-h-[40vh] flex items-center justify-center py-16">
      <div
        className="h-11 w-11 rounded-full border-[3px] border-gold-200 border-t-maroon-700 animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

const AppLayout: React.FC = () => (
  <div className="theme-transition flex flex-col min-h-screen w-full bg-ivory dark:bg-slate-950 mandala-pattern overflow-x-hidden transition-colors duration-300">
    <Header />
    <main className="flex-1 w-full">
      <Suspense fallback={<RouteFallback />}>
        <PageTransition />
      </Suspense>
    </main>
    <Footer />
    <ToastContainer position="top-center" autoClose={3000} theme="colored" />
  </div>
);

const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/celebrations" element={<Celebrations />} />
      <Route path="/celebration/:year" element={<CelebrationDetail />} />
      <Route path="/year/:year" element={<YearRedirect />} />
      <Route path="/history" element={<History />} />
      <Route path="/guests" element={<Guests />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/edit" element={<AdminEdit />} />
      <Route path="/awards" element={<Awards />} />
      <Route path="/news & Updates" element={<NewsArticles />} />
      <Route path="/supporters" element={<Supporters />} />
      <Route path="/activities/:id" element={<ActivityDetails />}/>
      <Route path='/sponsors' element={<Sponsors />}/>
    </Route>
  </Routes>
);

const App: React.FC = () => (
  <LangProvider>
    <Router>
      <AppRoutes />
    </Router>
  </LangProvider>
);

export default App;
