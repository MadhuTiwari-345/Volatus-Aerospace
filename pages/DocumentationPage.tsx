import React, { useEffect } from 'react';
import { Documentation } from '../components/Documentation';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DocumentationPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
       <div className="container mx-auto px-4 lg:px-8 py-8">
         <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-[#2563eb] transition-colors mb-4"
          >
             <ArrowLeft size={20} />
             <span className="font-medium">Back</span>
          </button>
       </div>
       <Documentation />
    </div>
  );
};