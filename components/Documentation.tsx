import React from 'react';
import { FileText, Layout, Navigation, Zap } from 'lucide-react';

export const Documentation: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 lg:p-12 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
             <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-volatus-blue dark:text-blue-200">
               <FileText size={24} />
             </div>
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white">UX & Design Strategy Documentation</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <Navigation className="w-8 h-8 text-volatus-accent shrink-0" />
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Service-First Navigation</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    Based on user behavior analysis, I flattened the architecture to expose key service pillars immediately: <strong>Aerial Imaging, Infrastructure, Security, Environment, and Emergency</strong>. This "Service-First" approach reduces the cognitive load required to find specific solutions compared to generic "Solutions" or "Products" buckets.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Layout className="w-8 h-8 text-volatus-accent shrink-0" />
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Dark UI Aesthetics</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    Transitioned to a permanent <strong>Dark Slate (#0f172a)</strong> header to create a premium, authoritative aerospace aesthetic. High-contrast white text ensures legibility, while the solid bar provides a stable anchor for navigation regardless of the page content or scroll position.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                 <Zap className="w-8 h-8 text-volatus-accent shrink-0" />
                 <div>
                   <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">AI-Driven Discoverability</h3>
                   <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                     Recognizing the complexity of aerospace catalogs, I added a <strong>Gemini-powered Natural Language Search</strong> in the hero section. This allows non-expert users to ask questions like "drones for fire fighting" and get directed instantly, bypassing complex menu structures entirely.
                   </p>
                 </div>
              </div>

               <div className="p-6 bg-blue-900/5 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 mt-4">
                 <h4 className="font-bold text-sm text-volatus-blue dark:text-blue-300 mb-2">Technical Implementation</h4>
                 <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1">
                   <li><strong>React 18 + TypeScript:</strong> For type-safe, scalable component architecture.</li>
                   <li><strong>Tailwind CSS:</strong> For rapid, consistent mobile-first styling.</li>
                   <li><strong>Gemini API:</strong> Integrating <code>gemini-2.5-flash</code> for intelligent context awareness.</li>
                 </ul>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};