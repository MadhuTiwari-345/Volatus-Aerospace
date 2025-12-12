import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, ArrowRight, Sparkles, Share2, Linkedin, Twitter, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { generateProductImage } from '../services/geminiService';

const SOLUTION_DATA: Record<string, any> = {
  'aerial-imaging': {
    title: 'Aerial Imaging',
    subtitle: 'High-Precision Mapping & Surveying',
    description: 'Leverage state-of-the-art LiDAR and photogrammetry sensors to create digital twins, topographic maps, and 3D models with centimeter-level accuracy.',
    features: ['LiDAR Scanning', 'Thermal Imaging', '3D Photogrammetry', 'Orthomosaics'],
    imagePrompt: 'A drone conducting high tech aerial survey mapping over a landscape, digital grid overlay'
  },
  'infrastructure': {
    title: 'Infrastructure Inspection',
    subtitle: 'Critical Asset Monitoring',
    description: 'Ensure the safety and longevity of your assets. Our automated drone inspections identify structural defects, corrosion, and wear in bridges, towers, and pipelines.',
    features: ['Bridge Inspection', 'Pipeline Monitoring', 'Cell Tower Audits', 'Wind Turbine Analysis'],
    imagePrompt: 'Industrial drone inspecting a massive bridge structure or wind turbine, high tech visuals'
  },
  'security': {
    title: 'Security Solutions',
    subtitle: 'Advanced Perimeter Protection',
    description: 'Deploy autonomous drone fleets for 24/7 perimeter security, event monitoring, and rapid response. Integrated with AI for real-time threat detection.',
    features: ['Autonomous Patrols', 'Event Surveillance', 'Counter-UAS Systems', 'Night Vision Ops'],
    imagePrompt: 'Surveillance drone patrolling a secure facility at night with infrared camera visuals'
  },
  'environmental': {
    title: 'Environmental',
    subtitle: 'Wildlife & Forestry Management',
    description: 'Monitor ecosystems, track wildlife populations, and assess forest health with non-invasive aerial technology designed for conservation.',
    features: ['Wildlife Tracking', 'Vegetation Health', 'Carbon Mapping', 'Erosion Control'],
    imagePrompt: 'Drone flying over a lush forest or green landscape monitoring wildlife, eco friendly tech'
  },
  'emergency': {
    title: 'Emergency Response',
    subtitle: 'Search & Rescue Support',
    description: 'Rapid deployment drones equipped with thermal cameras and drop mechanisms to assist first responders in critical search and rescue operations.',
    features: ['Thermal Search', 'Supply Drop', 'Disaster Assessment', 'Live Streaming'],
    imagePrompt: 'Search and rescue drone flying in a rugged environment with thermal camera overlay graphics'
  }
};

const RELATED_MAP: Record<string, string[]> = {
  'aerial-imaging': ['infrastructure', 'environmental'],
  'infrastructure': ['aerial-imaging', 'security'],
  'security': ['emergency', 'infrastructure'],
  'environmental': ['aerial-imaging', 'infrastructure'],
  'emergency': ['security', 'aerial-imaging']
};

const KEYWORD_LINKS: Record<string, string> = {
  'LiDAR': '/technology/lidar',
  'photogrammetry': '/technology/photogrammetry',
  'AI': '/technology/ai',
  'autonomous': '/technology/autonomous',
  'thermal': '/technology/thermal',
  'sensors': '/technology/sensors',
};

export const SolutionDetail: React.FC = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start true to show skeleton immediately
  const [copySuccess, setCopySuccess] = useState(false);
  const data = type ? SOLUTION_DATA[type] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      const fetchImage = async () => {
        setIsLoading(true);
        // Reset image url to ensure skeleton shows on navigation change
        setImageUrl(null); 
        try {
          const url = await generateProductImage(data.title, data.imagePrompt);
          setImageUrl(url);
        } finally {
          setIsLoading(false);
        }
      };
      fetchImage();
    }
  }, [type, data]);

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const url = window.location.href;
    const text = `Check out ${data?.title} by Volatus Aerospace`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    }
  };

  const renderDescription = (text: string) => {
    // Escape special regex characters if needed, but for our simple alphanumeric keywords it's fine.
    const pattern = new RegExp(`\\b(${Object.keys(KEYWORD_LINKS).join('|')})\\b`, 'gi');
    const parts = text.split(pattern);

    return parts.map((part, i) => {
      const matchKey = Object.keys(KEYWORD_LINKS).find(k => k.toLowerCase() === part.toLowerCase());
      if (matchKey) {
        return (
          <Link
            key={i}
            to={KEYWORD_LINKS[matchKey]}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 hover:underline decoration-blue-500/30 underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-0.5 inline-flex items-center gap-0.5"
            aria-label={`Learn more about ${part}`}
          >
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  if (!data) {
    return <div className="pt-32 text-center text-slate-900 dark:text-white">Solution not found.</div>;
  }

  const relatedKeys = type && RELATED_MAP[type] ? RELATED_MAP[type] : [];
  const relatedSolutions = relatedKeys.map(k => ({ ...SOLUTION_DATA[k], id: k })).filter(Boolean);

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-slate-900 group">
        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="absolute inset-0 z-20 bg-slate-900">
             <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Sparkles className="text-slate-600 w-12 h-12 mb-4 animate-bounce" strokeWidth={1} />
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em] animate-pulse">Generating Visualization...</span>
                </div>
             </div>
          </div>
        ) : (
          /* Actual Image */
          <div className="absolute inset-0 animate-in fade-in duration-1000">
            <img 
              src={imageUrl || 'https://picsum.photos/1920/600?grayscale'} 
              alt={data.title} 
              className="w-full h-full object-cover opacity-60"
            />
            {/* AI Badge */}
            <div className="absolute bottom-6 right-6 bg-black/60 text-white/80 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-lg hidden md:block">
               Generated by Imagen
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative h-full flex flex-col justify-center z-10">
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-8 left-4 lg:left-8 flex items-center gap-2 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-2 py-1"
            aria-label="Go Back"
          >
             <ArrowLeft size={20} />
             <span className="font-medium">Back</span>
          </button>
          
          <div className="max-w-4xl animate-in slide-in-from-bottom-4 duration-700 fade-in">
            <span className="text-sky-400 font-bold tracking-wider uppercase mb-3 block text-sm md:text-base">{data.subtitle}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight shadow-black drop-shadow-lg">{data.title}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Overview</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              {renderDescription(data.description)}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                className="bg-[#2563eb] text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-600 transition-all hover:shadow-lg hover:shadow-blue-500/20 active:transform active:scale-95 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950"
              >
                Request Consultation <ArrowRight size={18} />
              </button>
              
              {/* Social Share */}
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1.5 px-3">
                 <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-2">Share:</span>
                 <button 
                   onClick={() => handleShare('linkedin')}
                   className="p-2 text-slate-400 hover:text-[#0077b5] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                   aria-label="Share on LinkedIn"
                 >
                   <Linkedin size={18} />
                 </button>
                 <button 
                   onClick={() => handleShare('twitter')}
                   className="p-2 text-slate-400 hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                   aria-label="Share on Twitter"
                 >
                   <Twitter size={18} />
                 </button>
                 <button 
                   onClick={() => handleShare('copy')}
                   className="p-2 text-slate-400 hover:text-green-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors relative focus:outline-none focus:ring-2 focus:ring-blue-500"
                   aria-label="Copy Link"
                 >
                   {copySuccess ? <Check size={18} /> : <LinkIcon size={18} />}
                   {copySuccess && (
                     <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                       Copied!
                     </span>
                   )}
                 </button>
              </div>
            </div>

            {/* Related Solutions */}
            {relatedSolutions.length > 0 && (
                <div className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Related Solutions</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {relatedSolutions.map((related) => (
                             <Link 
                                key={related.id} 
                                to={`/solutions/${related.id}`}
                                className="group block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                             >
                                <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 flex items-center gap-2">
                                    {related.title}
                                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                    {related.description}
                                </p>
                             </Link>
                        ))}
                    </div>
                </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles className="text-blue-500" size={20} />
                Key Capabilities
              </h3>
              <div className="space-y-4">
                {data.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 group hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
                    <div className="bg-green-500/10 p-1.5 rounded-full mt-0.5 shrink-0 group-hover:bg-blue-500/10 transition-colors">
                      <Check size={16} className="text-green-500 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-200 font-medium text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Why Choose Volatus?</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Global Compliance
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Enterprise-Grade Security
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> 24/7 Operations Support
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};