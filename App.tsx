import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { SolutionDetail } from './pages/SolutionDetail';
import { Careers } from './pages/Careers';
import { Investors } from './pages/Investors';
import { Training } from './pages/Training';
import { DocumentationPage } from './pages/DocumentationPage';
import { Sitemap } from './pages/Sitemap';
import { JobDetail } from './pages/JobDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-900 transition-colors duration-300">
        <Header />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            
            {/* New Routes */}
            <Route path="/solutions" element={<Services />} /> {/* Reusing Services as Solutions Overview */}
            <Route path="/solutions/:type" element={<SolutionDetail />} />
            <Route path="/company/careers" element={<Careers />} />
            <Route path="/company/careers/:jobId" element={<JobDetail />} />
            <Route path="/company/investors" element={<Investors />} />
            <Route path="/resources/training" element={<Training />} />
            <Route path="/resources/documentation" element={<DocumentationPage />} />
            <Route path="/sitemap" element={<Sitemap />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;