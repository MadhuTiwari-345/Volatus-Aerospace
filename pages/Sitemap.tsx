import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Map as MapIcon, ChevronRight, Home, ExternalLink } from 'lucide-react';
import { NAVIGATION_STRUCTURE } from '../constants';

export const Sitemap: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Hero Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 py-12 relative">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-[#2563eb] transition-colors mb-6"
          >
             <ArrowLeft size={20} />
             <span className="font-medium">Back</span>
          </button>
          
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                <MapIcon size={32} />
             </div>
             <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Sitemap</h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            A complete hierarchical overview of the Volatus Aerospace website structure to help you find exactly what you are looking for.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Home Section (Manual Entry) */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <Home size={20} className="text-blue-500" />
                    <span>General</span>
                </h2>
                <ul className="space-y-3">
                     <li>
                        <Link to="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                            <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500" />
                            Homepage
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView(); }} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                             <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500" />
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Dynamic Sections from Constants */}
            {NAVIGATION_STRUCTURE.map((section, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <span className="text-blue-500 font-serif italic text-2xl mr-1">{idx + 1}.</span>
                        <span>{section.label}</span>
                    </h2>
                    
                    <div className="mb-4">
                        <Link 
                            to={section.href.replace('#', '')} 
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-4"
                        >
                            Visit {section.label} Overview <ExternalLink size={14} />
                        </Link>
                    </div>

                    {section.children && (
                        <ul className="space-y-3 mt-2">
                            {section.children.map((child, childIdx) => (
                                <li key={childIdx}>
                                    <Link 
                                        to={child.href.replace('#', '')} 
                                        className="flex items-start gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                                    >
                                        <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-500 mt-1 shrink-0" />
                                        <div>
                                            <span className="font-medium block">{child.label}</span>
                                            {child.description && (
                                                <span className="text-xs text-slate-400 dark:text-slate-500">{child.description}</span>
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};