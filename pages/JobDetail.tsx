import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Clock, CheckCircle, Upload } from 'lucide-react';
import { JOBS_DATA } from '../constants';

export const JobDetail: React.FC = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = JOBS_DATA.find(j => j.id === jobId);
  
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!job) {
    return (
      <div className="pt-32 pb-20 text-center container mx-auto px-4">
         <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Job Not Found</h2>
         <button onClick={() => navigate('/company/careers')} className="text-blue-600 hover:underline">Return to Careers</button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (isSuccess) {
     return (
        <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8 max-w-3xl text-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-8 rounded-2xl border border-green-200 dark:border-green-800">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-white w-8 h-8" aria-hidden="true" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Application Submitted!</h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                    Thank you for applying to the <strong>{job.title}</strong> position. Our recruiting team will review your application and get back to you shortly.
                </p>
                <button 
                    onClick={() => navigate('/company/careers')}
                    className="px-8 py-3 bg-[#2563eb] text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Browse More Jobs
                </button>
            </div>
        </div>
     );
  }

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
        
        {/* Header */}
        <div className="bg-[#0f172a] text-white pt-16 pb-24">
            <div className="container mx-auto px-4 lg:px-8 relative">
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute -top-8 left-4 lg:left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors focus:outline-none focus:text-white focus:underline"
                    aria-label="Back to Jobs list"
                >
                    <ArrowLeft size={20} aria-hidden="true" />
                    <span className="font-medium">Back to Jobs</span>
                </button>
                <div className="max-w-4xl">
                    <span className="inline-block px-3 py-1 rounded bg-blue-600/20 text-blue-400 text-sm font-semibold mb-4 border border-blue-600/30">{job.dept}</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{job.title}</h1>
                    <div className="flex flex-wrap gap-6 text-slate-300">
                        <span className="flex items-center gap-2"><MapPin size={18} className="text-blue-500" aria-hidden="true" /> {job.location}</span>
                        <span className="flex items-center gap-2"><Clock size={18} className="text-blue-500" aria-hidden="true" /> {job.type}</span>
                        <span className="flex items-center gap-2"><Briefcase size={18} className="text-blue-500" aria-hidden="true" /> {job.id}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 -mt-12 pb-24">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About the Role</h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                            {job.description}
                        </p>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Key Responsibilities</h3>
                        <ul className="space-y-3 mb-8">
                            {job.responsibilities.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" aria-hidden="true"></div>
                                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{req}</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Qualifications</h3>
                        <ul className="space-y-3">
                            {job.qualifications.map((qual, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" aria-hidden="true"></div>
                                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{qual}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Application Form Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 sticky top-24">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Apply for this Position</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                                    <input 
                                        id="firstName"
                                        required
                                        type="text" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                        value={formState.firstName}
                                        onChange={e => setFormState({...formState, firstName: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                                    <input 
                                        id="lastName"
                                        required
                                        type="text" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                        value={formState.lastName}
                                        onChange={e => setFormState({...formState, lastName: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                <input 
                                    id="email"
                                    required
                                    type="email" 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                    value={formState.email}
                                    onChange={e => setFormState({...formState, email: e.target.value})}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                                <input 
                                    id="phone"
                                    type="tel" 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                                    value={formState.phone}
                                    onChange={e => setFormState({...formState, phone: e.target.value})}
                                />
                            </div>

                            <div>
                                <label htmlFor="resume-upload" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Resume/CV</label>
                                <label 
                                  htmlFor="resume-upload" 
                                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/50 block focus-within:ring-2 focus-within:ring-blue-500"
                                >
                                    <Upload className="mx-auto text-slate-400 mb-2" size={24} aria-hidden="true" />
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Click to upload or drag and drop</p>
                                    <p className="text-xs text-slate-400 mt-1">PDF, DOCX up to 10MB</p>
                                    <input id="resume-upload" type="file" className="sr-only" />
                                </label>
                            </div>

                             <div>
                                <label htmlFor="coverLetter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cover Letter</label>
                                <textarea 
                                    id="coverLetter"
                                    rows={4}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors resize-none"
                                    value={formState.coverLetter}
                                    onChange={e => setFormState({...formState, coverLetter: e.target.value})}
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {isSubmitting ? (
                                    <>Processing...</>
                                ) : (
                                    <>Submit Application</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};