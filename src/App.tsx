
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import YearDetail from './pages/YearDetail';
import GalleryPage from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminEdit from './admin/AdminEdit';
import { LangProvider } from './i18n';


const App: React.FC = () => (
  <LangProvider>
    <Router>
      <div className="flex flex-col min-h-screen min-w-full bg-[#fdf6f0]">
        <Header />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/year/:year" element={<YearDetail />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/edit" element={<AdminEdit />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </Router>
  </LangProvider>
);

export default App;
