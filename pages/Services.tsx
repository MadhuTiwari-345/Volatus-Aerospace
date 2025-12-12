import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SERVICE_SECTIONS = [
  {
    title: 'Engineering Solutions',
    description: 'Our engineering team provides cutting-edge solutions, including design, prototyping, and testing of aerospace components and systems. We leverage the latest technologies and methodologies to ensure optimal performance and reliability.'
  },
  {
    title: 'Regulatory Compliance',
    description: 'Navigating the complex landscape of aerospace regulations can be challenging. Our experts offer guidance and support to ensure your products and operations meet all necessary standards and certifications.'
  },
  {
    title: 'Operational Support',
    description: 'We provide comprehensive operational support, including maintenance, repair, and overhaul (MRO) services, as well as training and technical assistance to keep your operations running smoothly and efficiently.'
  },
  {
    title: 'Consulting Services',
    description: 'Our consulting services offer strategic insights and expert advice to help you optimize your aerospace business. We cover areas such as market analysis, business strategy, and technology integration.'
  },
  {
    title: 'Training Programs',
    description: 'We offer specialized training programs designed to enhance the skills and knowledge of your workforce. Our programs cover a wide range of topics, from engineering design to operational best practices.'
  },
  {
    title: 'Custom Solutions',
    description: 'For unique challenges, we provide custom solutions tailored to your specific needs. Our team works closely with you to develop and implement innovative approaches that address your particular requirements.'
  }
];

export const Services: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8 py-16 relative">
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 lg:top-8 lg:left-8 flex items-center gap-2 text-slate-500 hover:text-[#2563eb] transition-colors"
        >
           <ArrowLeft size={20} />
           <span className="font-medium">Back</span>
        </button>

        <div className="max-w-6xl mx-auto mt-8">
          {/* Header */}
          <div className="mb-16 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Our Services</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Volatus Aerospace offers a comprehensive suite of services designed to meet the evolving needs of the aerospace industry. From advanced engineering solutions to regulatory compliance and operational support, we are committed to delivering excellence at every stage.
            </p>
          </div>

          {/* Service Sections Grid */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {SERVICE_SECTIONS.map((service, index) => (
              <section 
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`transition-all duration-500 ease-out p-6 rounded-2xl ${
                  hoveredIndex !== null && hoveredIndex !== index 
                    ? 'opacity-40 scale-95 blur-[0.5px]' 
                    : 'opacity-100 scale-100'
                } ${hoveredIndex === index ? 'bg-white dark:bg-slate-900 shadow-xl scale-[1.02] -translate-y-1' : ''}`}
              >
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${hoveredIndex === index ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};