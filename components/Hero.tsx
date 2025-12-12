import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[600px] lg:h-[750px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Aerial View" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Premium Gradient Overlay: Seamless blend from dark bottom to lighter top */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-[#0f172a]/10"></div>
        {/* Subtle radial vignette for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-[#0f172a]/70"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Innovating the <br/>
            Future of Flight
          </h1>
          
          <p className="text-lg text-slate-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg text-shadow-sm">
            Volatus Aerospace is at the forefront of the drone industry, providing cutting-edge solutions for a wide range of applications. Our commitment to innovation and excellence drives us to deliver unparalleled value to our clients.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button 
               onClick={() => navigate('/services')}
               className="px-8 py-4 rounded-lg bg-[#2563eb] text-white font-bold hover:bg-blue-600 transition-all w-full sm:w-auto text-base shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2"
             >
               Explore Our Solutions <ArrowRight size={20} />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};