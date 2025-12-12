import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Search, Loader2, Sparkles, ArrowRight, Moon, Sun, ChevronDown } from 'lucide-react';
import { NAVIGATION_STRUCTURE, ICONS } from '../constants';
import { querySiteAssistant } from '../services/geminiService';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Theme State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // Search State
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});

  const toggleMenu = () => setIsOpen(!isOpen);

  // Apply theme class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside to close search result
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchResult(null);
        if (!searchQuery) setIsSearchExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  // Focus input when expanded
  useEffect(() => {
    if (isSearchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResult(null);
    try {
      const result = await querySiteAssistant(searchQuery);
      setSearchResult(result);
    } catch (error) {
      setSearchResult("Sorry, I couldn't connect to the AI assistant right now.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveDropdown(null); // Close dropdown immediately on click
    if (href.startsWith('#/')) {
       navigate(href.replace('#', ''));
    } else {
       window.location.href = href;
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to check active state
  const isLinkActive = (href: string) => {
    const path = href.replace('#', '');
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent, label: string) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveDropdown(label);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setActiveDropdown(null);
      navRefs.current[label]?.focus();
    }
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
          e.preventDefault();
          setActiveDropdown(null);
      }
  }

  return (
    <>
      {/* Backdrop Overlay for Focus Mode */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${activeDropdown ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        aria-hidden="true"
      />

      <header className="fixed w-full z-50 bg-[#0f172a] border-b border-slate-800 shadow-lg transition-colors duration-300">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
                href="#/" 
                className="flex items-center gap-3 z-50 shrink-0 group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1"
                aria-label="Volatus Aerospace Home"
            >
              <div className="w-8 h-8 flex items-center justify-center text-white transition-transform group-hover:scale-110">
                 <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                   <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                 </svg>
              </div>
              <span className="text-xl font-bold tracking-wide text-white group-hover:text-sky-400 transition-colors">
                Volatus Aerospace
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" role="navigation" aria-label="Main Navigation">
              {NAVIGATION_STRUCTURE.map((item) => {
                const isActive = isLinkActive(item.href);
                return (
                    <div 
                    key={item.label}
                    className="relative group h-20 flex items-center"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onFocus={() => setActiveDropdown(item.label)}
                    onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                        setActiveDropdown(null);
                        }
                    }}
                    onKeyDown={(e) => handleMenuKeyDown(e, item.label)}
                    >
                    <button 
                        ref={el => navRefs.current[item.label] = el}
                        onClick={() => handleNavClick(item.href)}
                        className={`flex items-center gap-1 text-[13px] xl:text-sm font-medium tracking-wide transition-all uppercase py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                            isActive 
                                ? 'text-white bg-slate-800 shadow-[0_0_10px_rgba(14,165,233,0.15)] border border-slate-700' 
                                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        } ${activeDropdown === item.label ? 'bg-slate-800 text-white' : ''}`}
                        aria-expanded={activeDropdown === item.label}
                        aria-haspopup={item.children ? 'true' : undefined}
                    >
                        {item.label}
                        {item.children && (
                             <ChevronDown 
                                size={14} 
                                className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                                aria-hidden="true"
                             />
                        )}
                    </button>

                    {/* Mega Menu Dropdown */}
                    {item.children && (
                        <div 
                        className={`absolute top-full left-1/2 -translate-x-1/2 w-[500px] transition-all duration-300 origin-top pt-4 ${
                            activeDropdown === item.label 
                            ? 'opacity-100 visible translate-y-0' 
                            : 'opacity-0 invisible -translate-y-4 pointer-events-none'
                        }`}
                        role="menu"
                        onKeyDown={handleDropdownKeyDown}
                        >
                        <div className="bg-[#0f172a] rounded-xl shadow-2xl border border-slate-700 p-2 grid grid-cols-1 gap-1 overflow-hidden relative after:absolute after:top-0 after:left-0 after:right-0 after:h-1 after:bg-gradient-to-r after:from-transparent after:via-sky-500 after:to-transparent after:opacity-50">
                            {item.children.map((child, idx) => (
                                <button 
                                key={child.label} 
                                onClick={() => handleNavClick(child.href)}
                                className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-800 transition-all group/item text-left w-full focus:outline-none focus:bg-slate-800 focus:ring-2 focus:ring-sky-500 relative overflow-hidden"
                                role="menuitem"
                                style={{ transitionDelay: `${idx * 50}ms` }}
                                >
                                <div className="mt-1 p-2 rounded-md bg-slate-800/50 text-sky-500 group-hover/item:text-sky-400 group-hover/item:bg-sky-500/10 transition-all group-hover/item:scale-110" aria-hidden="true">
                                    {child.icon && ICONS[child.icon] ? React.createElement(ICONS[child.icon], { size: 18 }) : <ChevronRight size={18} />}
                                </div>
                                <div>
                                    <div className="text-slate-200 font-bold text-sm group-hover/item:text-white mb-0.5">
                                    {child.label}
                                    </div>
                                    {child.description && (
                                    <div className="text-slate-400 text-xs leading-relaxed group-hover/item:text-slate-300">
                                        {child.description}
                                    </div>
                                    )}
                                </div>
                                </button>
                            ))}
                        </div>
                        </div>
                    )}
                    </div>
                );
            })}
            </nav>

            {/* CTA, Search, Theme Toggle & Mobile Toggle */}
            <div className="flex items-center gap-3 xl:gap-4">
              {/* AI Search Bar */}
              <div ref={searchContainerRef} className="hidden lg:block relative">
                <div 
                  className={`flex items-center rounded-full border transition-all duration-500 ease-out ${
                    isSearchExpanded 
                      ? 'w-[24rem] px-4 py-1 bg-slate-900 border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.2)] ring-1 ring-sky-500/50' 
                      : 'w-10 h-10 justify-center bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-700 cursor-pointer'
                  }`}
                  onClick={() => { if (!isSearchExpanded) setIsSearchExpanded(true); }}
                >
                  <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsSearchExpanded(!isSearchExpanded);
                    }}
                    className={`text-slate-300 hover:text-white transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-full p-1.5 ${isSearchExpanded ? 'mr-2 text-sky-400' : ''}`}
                    aria-label={isSearchExpanded ? "Close AI search" : "Open AI search assistant"}
                    aria-expanded={isSearchExpanded}
                  >
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin text-sky-400" /> : <Search className="w-4 h-4" />}
                  </button>
                  <form onSubmit={handleSearchSubmit} className={`flex-1 ${!isSearchExpanded && 'hidden'}`}>
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ask our AI assistant..."
                      aria-label="Search query"
                      className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-slate-500 h-9"
                    />
                  </form>
                  {isSearchExpanded && searchQuery && (
                     <button 
                       onClick={(e) => { e.stopPropagation(); handleSearchSubmit(e as any); }}
                       className="ml-2 bg-sky-600 hover:bg-sky-500 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-full p-1.5 transition-colors shadow-lg shadow-sky-900/20"
                       aria-label="Submit search"
                     >
                       <ArrowRight size={14} strokeWidth={3} />
                     </button>
                  )}
                </div>
                {/* Search Result */}
                {searchResult && isSearchExpanded && (
                  <div className="absolute top-full right-0 mt-4 w-96 bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl p-0 z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden ring-1 ring-white/10">
                     <div className="p-5 relative">
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
                       <div className="flex items-start gap-4">
                        <div className="mt-1 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg p-2 shrink-0 shadow-lg shadow-blue-900/30">
                          <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">AI Assistant</h4>
                          <p className="text-sm text-slate-200 leading-relaxed">
                            {searchResult}
                          </p>
                        </div>
                      </div>
                     </div>
                     <div className="bg-slate-900/50 p-2 text-center border-t border-slate-800">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Powered by Gemini</span>
                     </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle Button - Improved Animation */}
              <button
                onClick={toggleTheme}
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border border-slate-700 hover:border-slate-600 hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-sky-500 relative overflow-hidden group"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div className={`absolute transition-all duration-500 ease-in-out transform ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : 'rotate-180 opacity-0 scale-50'}`}>
                    <Moon size={18} className="text-sky-400 fill-sky-400/20" />
                </div>
                <div className={`absolute transition-all duration-500 ease-in-out transform ${theme === 'light' ? 'rotate-0 opacity-100 scale-100' : '-rotate-180 opacity-0 scale-50'}`}>
                    <Sun size={18} className="text-amber-400 fill-amber-400/20" />
                </div>
              </button>

              <button 
                onClick={scrollToContact} 
                className="hidden lg:inline-flex px-6 py-2.5 rounded-lg bg-[#2563eb] text-white text-sm font-bold tracking-wide hover:bg-blue-600 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] whitespace-nowrap cursor-pointer hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Contact Us
              </button>
              
              <button 
                onClick={toggleMenu}
                className="lg:hidden p-2 text-white hover:text-sky-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          id="mobile-menu"
          className={`fixed inset-0 bg-[#0f172a] z-40 lg:hidden transition-transform duration-300 pt-24 px-6 overflow-y-auto ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-6 pb-20">
            
            <div className="flex gap-3">
              <form onSubmit={handleSearchSubmit} className="relative flex-1 group">
                <input 
                  type="text" 
                  placeholder="Search Volatus..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-11 pr-4 text-white placeholder:text-slate-400 focus:border-sky-500 outline-none transition-colors"
                  aria-label="Search" 
                />
                <button
                  type="submit" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-400 transition-colors p-1"
                  aria-label="Submit Search"
                >
                    <Search size={18} />
                </button>
              </form>
              
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shrink-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>

            {NAVIGATION_STRUCTURE.map((item) => {
               const isActive = isLinkActive(item.href);
               return (
                <div key={item.label} className="border-b border-slate-800 pb-4">
                    <button 
                    onClick={() => handleNavClick(item.href)}
                    className={`font-bold text-base mb-3 uppercase tracking-wider w-full text-left focus:outline-none focus:text-sky-400 flex items-center justify-between ${isActive ? 'text-sky-400' : 'text-white'}`}
                    >
                    {item.label}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>}
                    </button>
                    <div className="flex flex-col gap-3 pl-2">
                    {item.children?.map((child) => {
                        const isChildActive = isLinkActive(child.href);
                        return (
                            <button 
                            key={child.label} 
                            onClick={() => handleNavClick(child.href)}
                            className={`text-sm py-1 flex items-center justify-between transition-colors w-full text-left focus:outline-none focus:text-sky-400 ${isChildActive ? 'text-sky-400 font-medium' : 'text-slate-400 hover:text-white'}`}
                            >
                            {child.label}
                            <ChevronRight className={`w-4 h-4 ${isChildActive ? 'text-sky-500' : 'text-slate-600'}`} aria-hidden="true" />
                            </button>
                        );
                    })}
                    </div>
                </div>
               );
            })}
            <button 
              onClick={scrollToContact} 
              className="w-full bg-[#2563eb] text-white py-3.5 rounded-lg text-center font-semibold mt-4 hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-900/50 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Contact Us
            </button>
          </div>
        </div>
      </header>
    </>
  );
};