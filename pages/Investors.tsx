import React, { useEffect } from 'react';
import { ArrowLeft, Download, TrendingUp, PieChart, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Investors: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="bg-[#0f172a] py-20">
        <div className="container mx-auto px-4 lg:px-8">
           <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
          >
             <ArrowLeft size={20} />
             <span className="font-medium">Back</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Investor Relations</h1>
              <p className="text-xl text-slate-300">
                TSXV: VOL | OTC: VLTSF
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex items-center gap-4">
              <TrendingUp className="text-green-500 w-8 h-8" />
              <div>
                <div className="text-sm text-slate-400">Current Share Price</div>
                <div className="text-2xl font-bold text-white">$0.45 CAD <span className="text-green-500 text-sm ml-2">+2.4%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="text-blue-500" /> Recent News
            </h3>
            <ul className="space-y-4">
              <li className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500 mb-1">Oct 24, 2024</div>
                <a href="#" className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600">Volatus Reports Q3 Financial Results</a>
              </li>
              <li className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500 mb-1">Sep 15, 2024</div>
                <a href="#" className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600">Volatus Secures $2M Government Contract</a>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <PieChart className="text-blue-500" /> Financial Reports
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Q3 2024 Report</span>
                  <Download size={18} className="text-slate-400 group-hover:text-blue-500" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Q2 2024 Report</span>
                  <Download size={18} className="text-slate-400 group-hover:text-blue-500" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">2023 Annual Report</span>
                  <Download size={18} className="text-slate-400 group-hover:text-blue-500" />
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Contact IR</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              For investor inquiries, please contact our relations department.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-slate-800 dark:text-slate-200 font-semibold">Email:</p>
              <a href="mailto:investors@volatus.com" className="text-blue-600 hover:underline">investors@volatus.com</a>
              <p className="text-slate-800 dark:text-slate-200 font-semibold mt-4">Phone:</p>
              <p className="text-slate-600 dark:text-slate-400">+1 (514) 555-0199</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};