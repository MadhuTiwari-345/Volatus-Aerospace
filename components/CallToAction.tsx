import React from 'react';

export const CallToAction: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 text-center transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
          Ready to Elevate Your Operations?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
          Get in touch with our team to discuss how our drone solutions can benefit your business.
        </p>
        <button 
          onClick={scrollToContact} 
          className="inline-block px-8 py-3 bg-[#2563eb] text-white font-bold rounded hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
};