import React, { useEffect } from 'react';
import { Lightbulb, Users, Award, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const About: React.FC = () => {
  const navigate = useNavigate();

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

        <div className="max-w-4xl mx-auto mt-8">
          
          {/* Main Header */}
          <div className="mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">About Volatus Aerospace</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Volatus Aerospace is a leading provider of integrated drone solutions, offering a comprehensive suite of products, services, and support to meet the evolving needs of the aerospace industry. With a focus on innovation and excellence, we are committed to delivering cutting-edge technology and unparalleled expertise to our clients.
            </p>
          </div>

          {/* History Section */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Our History</h2>
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-8 ml-2 space-y-12">
              <div className="relative">
                <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-slate-950"></span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Founded in 2015</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Volatus Aerospace was established with a vision to revolutionize the aerospace landscape through innovative drone technology.
                </p>
              </div>
              <div className="relative">
                <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-slate-950"></span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Expanded Global Operations</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  We expanded our operations globally, establishing offices and partnerships in key markets to better serve our international clientele.
                </p>
              </div>
              <div className="relative">
                <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-slate-950"></span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Launched Flagship Product Line</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Volatus Aerospace introduced its flagship product line, setting new standards for performance and reliability in the industry.
                </p>
              </div>
              <div className="relative">
                 <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-slate-950"></span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Achieved Industry Recognition</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Our commitment to excellence and innovation has been recognized with numerous industry awards and accolades.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Mission & Vision</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Our mission is to empower businesses and organizations with the transformative potential of drone technology, enabling them to achieve greater efficiency, productivity, and success. Our vision is to be the global leader in integrated drone solutions, driving innovation and shaping the future of aerospace.
            </p>
          </section>

          {/* Our Team */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Our Team</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              Our team comprises seasoned professionals with extensive experience in aerospace, engineering, and technology. We are passionate about pushing the boundaries of what's possible and dedicated to delivering exceptional results for our clients.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-slate-800 rounded-full mb-4 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Dr. Anya Sharma" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Dr. Anya Sharma</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Chief Executive Officer</p>
              </div>
              <div>
                <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-slate-800 rounded-full mb-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" alt="Mr. Ben Carter" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Mr. Ben Carter</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Chief Technology Officer</p>
              </div>
              <div>
                <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-slate-800 rounded-full mb-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" alt="Ms. Chloe Davis" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Ms. Chloe Davis</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Head of Marketing</p>
              </div>
              <div>
                <div className="w-24 h-24 mx-auto bg-slate-200 dark:bg-slate-800 rounded-full mb-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" alt="Mr. David Evans" className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Mr. David Evans</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Director of Operations</p>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Core Values</h2>
            <div className="grid md:grid-cols-4 gap-6">
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 text-slate-900 dark:text-white">
                  <Lightbulb strokeWidth={1.5} size={28} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">Innovation</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  We embrace innovation and continuously seek new ways to improve our products and services.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 text-slate-900 dark:text-white">
                  <Users strokeWidth={1.5} size={28} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">Collaboration</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  We foster a collaborative environment, working together with our clients and partners to achieve shared goals.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 text-slate-900 dark:text-white">
                  <Award strokeWidth={1.5} size={28} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">Excellence</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  We are committed to excellence in everything we do, striving for the highest standards of quality and performance.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 text-slate-900 dark:text-white">
                  <ShieldCheck strokeWidth={1.5} size={28} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm">Integrity</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                   We uphold the highest ethical standards and conduct our business with integrity and transparency.
                </p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
};