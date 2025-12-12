import React from 'react';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0f172a] text-white py-20 border-t border-slate-800 scroll-mt-20">
      <div className="container mx-auto px-4 text-center">
        
        {/* Main Navigation */}
        <nav className="flex flex-col md:flex-row justify-center items-center gap-y-4 gap-x-12 mb-10" aria-label="Footer Navigation">
          <button onClick={() => handleNav('/about')} className="text-slate-200 hover:text-white transition-colors text-sm font-medium focus:outline-none focus:underline">About Us</button>
          <button onClick={() => handleNav('/products')} className="text-slate-200 hover:text-white transition-colors text-sm font-medium focus:outline-none focus:underline">Products</button>
          <button onClick={() => handleNav('/services')} className="text-slate-200 hover:text-white transition-colors text-sm font-medium focus:outline-none focus:underline">Services</button>
          <button onClick={() => handleNav('/services')} className="text-slate-200 hover:text-white transition-colors text-sm font-medium focus:outline-none focus:underline">Support</button>
          <button onClick={scrollToContact} className="text-slate-200 hover:text-white transition-colors text-sm font-medium focus:outline-none focus:underline">Contact Us</button>
        </nav>

        {/* Legal Links */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-y-3 gap-x-12 mb-12">
           <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm focus:outline-none focus:text-sky-400">Privacy Policy</a>
           <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm focus:outline-none focus:text-sky-400">Terms of Service</a>
           <button onClick={() => handleNav('/sitemap')} className="text-slate-400 hover:text-sky-400 transition-colors text-sm focus:outline-none focus:text-sky-400">Sitemap</button>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-8 mb-12">
          <a href="#" aria-label="Visit our Twitter page" className="text-slate-400 hover:text-white transition-transform hover:-translate-y-1 duration-200 focus:outline-none focus:text-white focus:scale-110">
            <Twitter strokeWidth={1.5} size={20} aria-hidden="true" />
          </a>
          <a href="#" aria-label="Visit our Facebook page" className="text-slate-400 hover:text-white transition-transform hover:-translate-y-1 duration-200 focus:outline-none focus:text-white focus:scale-110">
            <Facebook strokeWidth={1.5} size={20} aria-hidden="true" />
          </a>
          <a href="#" aria-label="Visit our Instagram page" className="text-slate-400 hover:text-white transition-transform hover:-translate-y-1 duration-200 focus:outline-none focus:text-white focus:scale-110">
            <Instagram strokeWidth={1.5} size={20} aria-hidden="true" />
          </a>
          <a href="#" aria-label="Visit our LinkedIn page" className="text-slate-400 hover:text-white transition-transform hover:-translate-y-1 duration-200 focus:outline-none focus:text-white focus:scale-110">
            <Linkedin strokeWidth={1.5} size={20} aria-hidden="true" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-slate-500 text-sm font-light">
          © {new Date().getFullYear()} Volatus Aerospace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};