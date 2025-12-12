import React, { useEffect } from 'react';
import { ArrowLeft, GraduationCap, Award, BookOpen, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Training: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
       {/* Hero */}
       <div className="relative h-[300px] bg-slate-900 flex items-center">
         <div className="absolute inset-0">
           <img src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1920&auto=format&fit=crop" className="w-full h-full object-cover opacity-20" alt="Drone Training" />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
         </div>
         <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
               <ArrowLeft size={20} />
               <span className="font-medium">Back</span>
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-4">
              <GraduationCap className="text-blue-500" size={48} />
              Volatus Training Academy
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              Professional drone pilot certification and advanced operations training.
            </p>
         </div>
       </div>

       <div className="container mx-auto px-4 lg:px-8 py-16">
         <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors group">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Basic Pilot Certificate</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Get started with your drone career. Covers regulations, safety, and basic flight maneuvers.
              </p>
              <ul className="space-y-2 mb-6">
                 <li className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><CheckCircle size={14} className="text-green-500" /> Online Ground School</li>
                 <li className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><CheckCircle size={14} className="text-green-500" /> Transport Canada Exam Prep</li>
              </ul>
              <button className="w-full py-2 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-colors">Enroll Now - $299</button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border-2 border-blue-600 shadow-xl relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Advanced Operations</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                For commercial pilots flying in controlled airspace or near people. Includes flight review.
              </p>
              <ul className="space-y-2 mb-6">
                 <li className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><CheckCircle size={14} className="text-green-500" /> In-Person Flight Review</li>
                 <li className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><CheckCircle size={14} className="text-green-500" /> ROC-A Radio License</li>
                 <li className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><CheckCircle size={14} className="text-green-500" /> Advanced Nav & Weather</li>
              </ul>
              <button className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">Enroll Now - $599</button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors group">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Specialized SORA</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Specific Operations Risk Assessment training for complex BVLOS missions.
              </p>
              <ul className="space-y-2 mb-6">
                 <li className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><CheckCircle size={14} className="text-green-500" /> Risk Methodology</li>
                 <li className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><CheckCircle size={14} className="text-green-500" /> ConOps Development</li>
              </ul>
              <button className="w-full py-2 rounded-lg border border-purple-600 text-purple-600 font-semibold hover:bg-purple-600 hover:text-white transition-colors">Contact Sales</button>
            </div>
         </div>
       </div>
    </div>
  );
};