import React, { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, MapPin, Briefcase, Clock, Search, Filter, Bookmark, X, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { JOBS_DATA } from '../constants';

export const Careers: React.FC = () => {
  const navigate = useNavigate();
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedJobs');
    return saved ? JSON.parse(saved) : [];
  });
  const [hoveredJobId, setHoveredJobId] = useState<string | null>(null);

  // Derived Filters
  const departments = useMemo(() => Array.from(new Set(JOBS_DATA.map(j => j.dept))), []);
  const locations = useMemo(() => Array.from(new Set(JOBS_DATA.map(j => j.location))), []);
  const types = useMemo(() => Array.from(new Set(JOBS_DATA.map(j => j.type))), []);

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            job.dept.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDepts.length === 0 || selectedDepts.includes(job.dept);
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(job.location);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
      const matchesSaved = !showSavedOnly || savedJobIds.includes(job.id);

      return matchesSearch && matchesDept && matchesLocation && matchesType && matchesSaved;
    });
  }, [searchQuery, selectedDepts, selectedLocations, selectedTypes, showSavedOnly, savedJobIds]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Save Job Handler
  const toggleSaveJob = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    let newSaved;
    if (savedJobIds.includes(id)) {
      newSaved = savedJobIds.filter(jobId => jobId !== id);
    } else {
      newSaved = [...savedJobIds, id];
    }
    setSavedJobIds(newSaved);
    localStorage.setItem('savedJobs', JSON.stringify(newSaved));
  };

  const handleDeptChange = (dept: string) => {
    setSelectedDepts(prev => 
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  const handleLocationChange = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleCardBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Only clear hover state if focus leaves the card completely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setHoveredJobId(null);
    }
  };

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* Hero Header */}
      <div className="bg-[#0f172a] py-20">
        <div className="container mx-auto px-4 lg:px-8 relative">
           <button 
            onClick={() => navigate(-1)}
            className="absolute -top-10 left-0 md:-top-12 flex items-center gap-2 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-2 py-1"
            aria-label="Go Back"
          >
             <ArrowLeft size={20} aria-hidden="true" />
             <span className="font-medium">Back</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join Our Mission</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Help us shape the future of autonomous flight. We are looking for innovators, dreamers, and doers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Bar (Mobile/Desktop) */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400" size={18} aria-hidden="true" />
                <input 
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search jobs"
                />
            </div>

            {/* Saved Jobs Toggle */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Bookmark size={18} className="text-blue-500" aria-hidden="true" /> Saved Jobs
                    </h3>
                    {savedJobIds.length > 0 && <span className="bg-blue-100 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full text-xs font-bold">{savedJobIds.length}</span>}
                </div>
                <label className="flex items-center gap-3 cursor-pointer mt-3 group">
                   <input 
                     type="checkbox" 
                     className="sr-only peer" 
                     checked={showSavedOnly} 
                     onChange={() => setShowSavedOnly(!showSavedOnly)} 
                   />
                   <div className="w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out bg-slate-300 dark:bg-slate-700 peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2 peer-focus:ring-offset-white dark:peer-focus:ring-offset-slate-900 peer-checked:bg-blue-600">
                      <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${showSavedOnly ? 'translate-x-4' : 'translate-x-0'}`}></div>
                   </div>
                   <span className="text-sm text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white">Show Saved Only</span>
                </label>
            </div>

            {/* Department Filter */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Filter size={16} aria-hidden="true" /> Department
                </h3>
                <div className="space-y-2">
                    {departments.map(dept => (
                        <label key={dept} className="flex items-center gap-3 cursor-pointer group p-1 -ml-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50">
                             <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={selectedDepts.includes(dept)} 
                                onChange={() => handleDeptChange(dept)} 
                             />
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors border-slate-300 dark:border-slate-600 bg-transparent peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-1 ${selectedDepts.includes(dept) ? 'bg-blue-600 border-blue-600' : 'group-hover:border-blue-400'}`}>
                                {selectedDepts.includes(dept) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{dept}</span>
                        </label>
                    ))}
                </div>
            </div>

             {/* Location Filter */}
             <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Globe size={16} aria-hidden="true" /> Location
                </h3>
                <div className="space-y-2">
                    {locations.map(loc => (
                        <label key={loc} className="flex items-center gap-3 cursor-pointer group p-1 -ml-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50">
                             <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={selectedLocations.includes(loc)} 
                                onChange={() => handleLocationChange(loc)} 
                             />
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors border-slate-300 dark:border-slate-600 bg-transparent peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-1 ${selectedLocations.includes(loc) ? 'bg-blue-600 border-blue-600' : 'group-hover:border-blue-400'}`}>
                                {selectedLocations.includes(loc) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{loc}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Type Filter */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock size={16} aria-hidden="true" /> Job Type
                </h3>
                <div className="space-y-2">
                    {types.map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group p-1 -ml-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50">
                             <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={selectedTypes.includes(type)} 
                                onChange={() => handleTypeChange(type)} 
                             />
                             <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors border-slate-300 dark:border-slate-600 bg-transparent peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-1 ${selectedTypes.includes(type) ? 'bg-blue-600 border-blue-600' : 'group-hover:border-blue-400'}`}>
                                {selectedTypes.includes(type) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                            <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

             {/* Clear Filters */}
             {(selectedDepts.length > 0 || selectedLocations.length > 0 || selectedTypes.length > 0 || searchQuery || showSavedOnly) && (
                 <button 
                    onClick={() => {
                        setSelectedDepts([]);
                        setSelectedLocations([]);
                        setSelectedTypes([]);
                        setSearchQuery('');
                        setShowSavedOnly(false);
                    }}
                    className="w-full py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center justify-center gap-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                 >
                    <X size={14} aria-hidden="true" /> Clear All Filters
                 </button>
             )}
          </div>

          {/* Main Content - Job List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {showSavedOnly ? 'Saved Jobs' : 'Open Positions'} 
                    <span className="text-slate-500 dark:text-slate-400 text-lg font-normal ml-3">{filteredJobs.length} results</span>
                </h2>
            </div>
            
            <div className="grid gap-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                    <div 
                        key={job.id} 
                        onMouseEnter={() => setHoveredJobId(job.id)}
                        onMouseLeave={() => setHoveredJobId(null)}
                        onFocus={() => setHoveredJobId(job.id)}
                        onBlur={handleCardBlur}
                        className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl transition-all duration-300 group relative cursor-default ${
                            hoveredJobId && hoveredJobId !== job.id 
                            ? 'opacity-50 scale-[0.99] grayscale-[30%]' 
                            : 'opacity-100 scale-100 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                    >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                                    <button 
                                        onClick={() => navigate(`/company/careers/${job.id}`)}
                                        className="text-left hover:underline focus:outline-none focus:underline decoration-2 underline-offset-2"
                                    >
                                        {job.title}
                                    </button>
                                </h3>
                                <button 
                                    onClick={(e) => toggleSaveJob(e, job.id)}
                                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label={savedJobIds.includes(job.id) ? "Unsave Job" : "Save Job"}
                                >
                                    <Bookmark 
                                        size={20} 
                                        className={`transition-colors ${savedJobIds.includes(job.id) ? 'fill-blue-500 text-blue-500' : 'text-slate-400 dark:text-slate-500 hover:text-blue-500'}`} 
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 mt-2 mb-4 text-sm text-slate-600 dark:text-slate-400">
                                <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-medium"><Briefcase size={14} aria-hidden="true" /> {job.dept}</span>
                                <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-medium"><MapPin size={14} aria-hidden="true" /> {job.location}</span>
                                <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-medium"><Clock size={14} aria-hidden="true" /> {job.type}</span>
                            </div>

                            <p className="text-slate-700 dark:text-slate-300 text-sm line-clamp-2 mb-4 leading-relaxed">
                                {job.description}
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-3 shrink-0 md:w-36">
                            <button 
                                onClick={() => navigate(`/company/careers/${job.id}`)}
                                className="w-full px-4 py-2.5 rounded-lg bg-[#2563eb] text-white text-sm font-bold hover:bg-blue-700 hover:shadow-md transition-all text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                            >
                                Apply Now
                            </button>
                            <button 
                                onClick={() => navigate(`/company/careers/${job.id}`)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                            >
                                Details
                            </button>
                        </div>
                    </div>
                    </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-slate-400" size={24} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No jobs found</h3>
                    <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters.</p>
                    <button 
                        onClick={() => {
                            setSelectedDepts([]);
                            setSelectedLocations([]);
                            setSelectedTypes([]);
                            setSearchQuery('');
                            setShowSavedOnly(false);
                        }}
                        className="mt-4 text-blue-600 hover:underline text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                    >
                        Clear all filters
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};