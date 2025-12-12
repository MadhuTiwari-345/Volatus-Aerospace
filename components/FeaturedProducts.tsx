import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { generateProductImage } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

const PRODUCTS = [
  {
    id: 'vanguard',
    title: 'The Vanguard X100',
    description: 'A versatile drone platform for a wide range of applications, known for its reliability and performance.',
    image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'navigator',
    title: 'The Navigator Pro',
    description: 'An advanced control system offering enhanced precision and control for complex drone operations.',
    image: 'https://images.unsplash.com/photo-1507581134176-1b32d0342921?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sentinel',
    title: 'The Sentinel Series',
    description: 'A series of drones equipped with specialized sensors for specific industry needs, ensuring optimal data collection.',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop'
  }
];

export const FeaturedProducts: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const initialized = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const generateImages = async () => {
      // Initialize all loading states to true immediately so the user sees "Generating" for all items
      // rather than waiting for them one by one.
      const initialLoadingState: Record<string, boolean> = {};
      PRODUCTS.forEach(p => {
        initialLoadingState[p.id] = true;
      });
      setLoadingStates(initialLoadingState);

      // Execute sequentially to respect API rate limits
      for (const product of PRODUCTS) {
        try {
          // The service now handles caching. If cached, it returns immediately.
          const imageUrl = await generateProductImage(product.title, product.description);
          if (imageUrl) {
            setGeneratedImages(prev => ({ ...prev, [product.id]: imageUrl }));
          }
        } catch (error) {
          console.error(`Failed to generate image for ${product.title}`);
        } finally {
          setLoadingStates(prev => ({ ...prev, [product.id]: false }));
        }
        
        // Add a small delay between requests to be gentle on the quota
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    };

    generateImages();
  }, []);

  const handleProductClick = () => {
    navigate('/products');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleProductClick();
    }
  };

  return (
    <section id="products" className="py-24 bg-slate-50 dark:bg-slate-950 scroll-mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
          <button 
            onClick={() => navigate('/products')}
            className="hidden md:flex items-center gap-2 text-[#2563eb] font-semibold hover:gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-[#2563eb] rounded p-1"
          >
            View All Products <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              onClick={handleProductClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(product.id)}
              onBlur={() => setHoveredId(null)}
              className={`bg-white dark:bg-slate-800 rounded-lg p-0 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-950 ${
                hoveredId && hoveredId !== product.id 
                  ? 'opacity-40 scale-95 blur-[1px]' 
                  : 'opacity-100 scale-100 hover:-translate-y-2'
              }`}
              aria-label={`View details for ${product.title}`}
            >
              <div className="aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-700 relative">
                
                {/* Original Image (Placeholder) */}
                <img 
                  src={product.image} 
                  alt="" 
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${generatedImages[product.id] ? 'opacity-0 scale-105' : 'opacity-100 group-hover:scale-110'}`}
                />
                
                {/* AI Generated Image (Fade In) */}
                {generatedImages[product.id] && (
                  <img 
                    src={generatedImages[product.id]} 
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-1000 group-hover:scale-110 transition-transform duration-500"
                  />
                )}

                {/* Skeleton Loader Overlay */}
                {loadingStates[product.id] && (
                   <div className="absolute inset-0 z-20 bg-slate-100 dark:bg-slate-800 animate-pulse flex flex-col items-center justify-center">
                     <Sparkles className="text-slate-300 dark:text-slate-600 w-10 h-10 mb-2 animate-bounce" strokeWidth={1.5} aria-hidden="true" />
                     <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-widest">Generating Visuals</span>
                   </div>
                )}

                {/* AI Badge */}
                {generatedImages[product.id] && !loadingStates[product.id] && (
                  <div className="absolute bottom-3 left-3 bg-blue-600/90 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg animate-in fade-in zoom-in duration-300 z-10">
                    Generated by Imagen
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#2563eb] transition-colors">{product.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>
                
                <span 
                  className="w-full py-2.5 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium group-hover:bg-[#2563eb] group-hover:text-white group-hover:border-[#2563eb] transition-colors text-sm text-center block"
                  aria-hidden="true"
                >
                  View Details
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden text-center">
            <button 
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 text-[#2563eb] font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563eb] rounded p-1"
            >
              View All Products <ArrowRight size={20} aria-hidden="true" />
            </button>
        </div>
      </div>
    </section>
  );
};