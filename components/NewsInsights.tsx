import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NEWS_ITEMS = [
  {
    id: 1,
    title: 'Volatus Aerospace Announces New Partnership',
    description: 'Volatus Aerospace has partnered with a leading technology firm to enhance its drone capabilities and expand its market reach.',
    image: 'https://images.unsplash.com/photo-1559863398-c92926e83c21?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Industry Trends in Drone Technology',
    description: 'Explore the latest trends and innovations shaping the future of the drone industry, from regulatory changes to technological advancements.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Case Study: Drone Application in Agriculture',
    description: 'Learn how Volatus Aerospace helped a local farm improve crop monitoring and yield using drone technology.',
    image: 'https://images.unsplash.com/photo-1622378377749-2e11e3b6a908?q=80&w=800&auto=format&fit=crop'
  }
];

export const NewsInsights: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleReadMore = () => {
    navigate('/about');
    window.scrollTo(0, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleReadMore();
    }
  };

  return (
    <section id="news" className="py-24 bg-white dark:bg-slate-900 scroll-mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">News & Insights</h2>

        <div className="flex flex-col gap-12" role="list">
          {NEWS_ITEMS.map((item) => (
            <div 
              key={item.id} 
              onClick={handleReadMore}
              onKeyDown={handleKeyDown}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
              role="listitem"
              tabIndex={0}
              className={`flex flex-col md:flex-row gap-8 items-start group cursor-pointer border-b border-slate-100 dark:border-slate-800 pb-8 last:border-0 last:pb-0 transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 rounded-lg p-2 -ml-2 ${
                hoveredId && hoveredId !== item.id 
                  ? 'opacity-40 blur-[1px]' 
                  : 'opacity-100'
              }`}
              aria-label={`Read more about: ${item.title}`}
            >
               <div className="flex-1 order-2 md:order-1">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#2563eb] transition-colors">
                   {item.title}
                 </h3>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                   {item.description}
                 </p>
                 <span 
                   className="text-sm text-[#2563eb] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all hover:underline"
                   aria-hidden="true"
                 >
                   Read More <span className="text-lg">→</span>
                 </span>
               </div>
               <div className="w-full md:w-80 h-48 rounded-xl overflow-hidden order-1 md:order-2 shrink-0 shadow-md bg-slate-200 dark:bg-slate-800 transition-all duration-300 group-hover:shadow-xl">
                  <img 
                    src={item.image} 
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};