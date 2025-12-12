import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    id: 'inspection',
    title: 'Inspection & Monitoring',
    description: 'Utilizing advanced drone technology for precise and efficient inspections of infrastructure, ensuring safety and operational integrity.',
    image: 'https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'surveying',
    title: 'Surveying & Mapping',
    description: 'Providing high-resolution aerial mapping and surveying services, delivering accurate data for informed decision-making.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'delivery',
    title: 'Delivery & Logistics',
    description: 'Streamlining logistics with drone-based delivery solutions, enhancing speed and efficiency in transporting goods.',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=800&auto=format&fit=crop',
  }
];

export const Divisions: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 bg-white dark:bg-slate-900 scroll-mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12">
          <h4 className="text-slate-500 dark:text-slate-400 font-semibold mb-2 uppercase tracking-wide text-sm">Our Services</h4>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Comprehensive Drone Solutions</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed text-lg">
            We offer a full suite of drone services, from data acquisition and analysis to pilot training and regulatory consulting. Our expertise spans various industries, ensuring tailored solutions for every client.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Link 
              to="/services"
              key={service.id} 
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(service.id)}
              onBlur={() => setHoveredId(null)}
              className={`group block transition-all duration-500 ease-out rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
                hoveredId && hoveredId !== service.id 
                  ? 'opacity-40 scale-95 grayscale-[50%] blur-[1px]' 
                  : 'opacity-100 scale-100'
              }`}
            >
              <div className="h-64 overflow-hidden rounded-xl mb-6 shadow-md group-hover:shadow-2xl group-hover:shadow-blue-900/20 transition-all duration-300 bg-slate-200 dark:bg-slate-800">
                <img 
                  src={service.image} 
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#2563eb] transition-colors">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="text-blue-600 font-semibold text-sm group-hover:underline flex items-center gap-1">
                Learn more <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};