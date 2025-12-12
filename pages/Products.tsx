import React, { useEffect, useState, useRef } from 'react';
import { generateProductImage } from '../services/geminiService';
import { Sparkles, ArrowRight, Check, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PRODUCT_LIST = [
  {
    id: 'vanguard',
    title: 'The Vanguard X100',
    description: 'A versatile drone platform for a wide range of applications, known for its reliability and performance in extreme conditions.',
    specs: ['30min Flight Time', '4K Camera', 'Obstacle Avoidance'],
    price: '$2,499',
    image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'navigator',
    title: 'The Navigator Pro',
    description: 'An advanced control system offering enhanced precision and control for complex drone operations and autonomous pathing.',
    specs: ['10km Range', 'Encrypted Link', 'Tactical Display'],
    price: '$4,299',
    image: 'https://images.unsplash.com/photo-1507581134176-1b32d0342921?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'sentinel',
    title: 'The Sentinel Series',
    description: 'A series of drones equipped with specialized sensors for specific industry needs, ensuring optimal data collection.',
    specs: ['Thermal Imaging', 'LiDAR Capable', 'IP54 Rated'],
    price: '$8,999',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'aerolift',
    title: 'AeroLift Cargo',
    description: 'Heavy-lift autonomous drone designed for logistics and supply chain optimization in remote areas.',
    specs: ['50kg Payload', 'Autonomous Route', 'All-Weather'],
    price: '$12,500',
    image: 'https://images.unsplash.com/photo-1559627768-e491e847cd62?q=80&w=800&auto=format&fit=crop'
  }
];

export const Products: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const initialized = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (initialized.current) return;
    initialized.current = true;

    const generateImages = async () => {
      // Set all to loading initially for better UX
      const initialLoadingState: Record<string, boolean> = {};
      PRODUCT_LIST.forEach(p => {
        initialLoadingState[p.id] = true;
      });
      setLoadingStates(initialLoadingState);

      // Execute sequentially to respect API rate limits
      for (const product of PRODUCT_LIST) {
        try {
          const imageUrl = await generateProductImage(product.title, product.description);
          if (imageUrl) {
            setGeneratedImages(prev => ({ ...prev, [product.id]: imageUrl }));
          }
        } catch (error) {
          console.error(`Failed to generate image for ${product.title}`);
        } finally {
          setLoadingStates(prev => ({ ...prev, [product.id]: false }));
        }
        // Add a small delay between requests to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    };

    generateImages();
  }, []);

  const handleBuyNow = (productTitle: string) => {
    // In a real app, this would add to cart or checkout
    const confirm = window.confirm(`Proceed to checkout for ${productTitle}?`);
    if (confirm) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDetails = (productTitle: string) => {
    // Navigate to contact for more info in this demo
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 py-16 relative">
          
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 lg:top-8 lg:left-8 flex items-center gap-2 text-slate-500 hover:text-[#2563eb] transition-colors"
          >
             <ArrowLeft size={20} />
             <span className="font-medium">Back</span>
          </button>

          <div className="max-w-4xl mt-8">
             <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Product Catalog</h1>
             <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
               Explore our industry-leading fleet of unmanned aerial vehicles, sensors, and control systems. Designed for professionals who demand the best in performance and reliability.
             </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCT_LIST.map((product) => (
            <div 
              key={product.id} 
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col ease-out ${
                hoveredId && hoveredId !== product.id 
                  ? 'opacity-40 scale-[0.98] blur-[1px]' 
                  : 'opacity-100 scale-100 hover:-translate-y-1'
              }`}
            >
              {/* Image Section */}
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-200 dark:bg-slate-700 relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${generatedImages[product.id] ? 'opacity-0 scale-105' : 'opacity-100 group-hover:scale-110'}`}
                />
                
                {generatedImages[product.id] && (
                  <img 
                    src={generatedImages[product.id]} 
                    alt={`${product.title} AI Generated`}
                    className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-1000 group-hover:scale-110 transition-transform duration-500"
                  />
                )}

                 {/* Skeleton Loader Overlay */}
                {loadingStates[product.id] && (
                   <div className="absolute inset-0 z-20 bg-slate-100 dark:bg-slate-800 animate-pulse flex flex-col items-center justify-center">
                     <Sparkles className="text-slate-300 dark:text-slate-600 w-10 h-10 mb-2 animate-bounce" strokeWidth={1.5} />
                     <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold uppercase tracking-widest">Generating Visuals</span>
                   </div>
                )}

                {generatedImages[product.id] && !loadingStates[product.id] && (
                  <div className="absolute bottom-3 left-3 bg-blue-600/90 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg animate-in fade-in zoom-in duration-300 z-10">
                    Generated by Imagen
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{product.title}</h3>
                  <span className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold px-3 py-1 rounded text-sm">{product.price}</span>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    {product.specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Check size={16} className="text-green-500" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700 flex gap-4">
                    <button 
                      onClick={() => handleBuyNow(product.title)}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md group-hover:shadow-blue-500/20"
                    >
                      <ShoppingCart size={18} />
                      Buy Now
                    </button>
                    <button 
                      onClick={() => handleDetails(product.title)}
                      className="px-4 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};