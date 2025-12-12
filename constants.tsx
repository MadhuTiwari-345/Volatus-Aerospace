import { NavItem, Division, Job } from './types';
import React from 'react';
import { Plane, Shield, GraduationCap, Users, Anchor, Activity, Zap, BarChart, Camera, Search, Map, Eye, FileText, Info } from 'lucide-react';

export const NAVIGATION_STRUCTURE: NavItem[] = [
  {
    label: 'Products',
    href: '#/products',
  },
  {
    label: 'Solutions',
    href: '#/solutions',
    children: [
      { 
        label: 'Aerial Imaging', 
        href: '#/solutions/aerial-imaging', 
        description: 'Mapping, Thermal, and LiDAR scanning.',
        icon: 'Camera'
      },
      { 
        label: 'Infrastructure Inspection', 
        href: '#/solutions/infrastructure', 
        description: 'Energy, Utilities, and Telecom audits.',
        icon: 'Zap'
      },
      { 
        label: 'Security Solutions', 
        href: '#/solutions/security', 
        description: 'Perimeter security and Counter UAS.',
        icon: 'Shield'
      },
      { 
        label: 'Environmental', 
        href: '#/solutions/environmental', 
        description: 'Wildlife tracking and forestry management.',
        icon: 'Plane'
      },
      { 
        label: 'Emergency Response', 
        href: '#/solutions/emergency', 
        description: 'Search & Rescue and Disaster Assessment.',
        icon: 'Activity'
      },
    ]
  },
  {
    label: 'Services',
    href: '#/services',
  },
  {
    label: 'Company',
    href: '#/about',
    children: [
      { label: 'About Us', href: '#/about', description: 'Our history, mission, and team.', icon: 'Info' },
      { label: 'Careers', href: '#/company/careers', description: 'Join our growing team.', icon: 'Users' },
      { label: 'Investors', href: '#/company/investors', description: 'Financial reports and news.', icon: 'BarChart' },
    ]
  },
  {
    label: 'Resources',
    href: '#/resources/documentation',
    children: [
      { label: 'Documentation', href: '#/resources/documentation', description: 'Technical guides and manuals.', icon: 'FileText' },
      { label: 'Training Academy', href: '#/resources/training', description: 'Pilot certification programs.', icon: 'GraduationCap' },
    ]
  }
];

export const ICONS: Record<string, React.FC<any>> = {
  Shield, Plane, GraduationCap, Users, Anchor, Activity, Zap, BarChart, Camera, Search, Map, Eye, FileText, Info
};

// Keeping DIVISIONS for compatibility if used elsewhere, though strictly not needed for the new pages
export const DIVISIONS: Division[] = [
  {
    id: 'solutions',
    title: 'Aerial Services',
    description: 'End-to-end aerial intelligence and operations for enterprise and government.',
    image: 'https://picsum.photos/800/600?random=1',
    link: '#solutions',
    features: ['Infrastructure Inspection', 'Wildfire Suppression', 'Search & Rescue']
  },
  {
    id: 'products',
    title: 'Equipment Sales',
    description: 'Authorized dealer for the world\'s leading UAV manufacturers.',
    image: 'https://picsum.photos/800/600?random=2',
    link: '#products',
    features: ['DJI Enterprise', 'Teledyne FLIR', 'Parrot']
  },
  {
    id: 'training',
    title: 'Training Academy',
    description: 'Setting the standard for professional drone pilot education.',
    image: 'https://picsum.photos/800/600?random=3',
    link: '#training',
    features: ['Advanced BVLOS', 'Flight Reviews', 'SORA Consulting']
  }
];

export const JOBS_DATA: Job[] = [
  { 
    id: 'drone-pilot-part-107',
    title: 'Drone Pilot (Part 107)', 
    location: 'Remote / Field', 
    type: 'Full-time', 
    dept: 'Operations',
    description: 'We are seeking an experienced Part 107 Certified Drone Pilot to execute complex aerial data acquisition missions. The ideal candidate has experience with photogrammetry, LiDAR, and thermal imaging sensors.',
    responsibilities: [
      'Plan and execute autonomous and manual drone flight missions.',
      'Ensure compliance with all FAA regulations and company safety protocols.',
      'Perform field maintenance and troubleshooting of UAV equipment.',
      'Process and upload flight data to the cloud for processing.',
      'Collaborate with the data processing team to ensure quality deliverables.'
    ],
    qualifications: [
      'FAA Part 107 Remote Pilot Certificate.',
      'Minimum of 50 flight hours on enterprise platforms (DJI Matrice, etc.).',
      'Experience with flight planning software (DJI Pilot 2, UgCS).',
      'Valid driver\'s license and ability to travel to remote sites.',
      'Strong problem-solving skills and attention to detail.'
    ]
  },
  { 
    id: 'senior-software-engineer',
    title: 'Senior Software Engineer', 
    location: 'Toronto, ON', 
    type: 'Full-time', 
    dept: 'Engineering',
    description: 'Join our core engineering team to build the next generation of fleet management software. You will work on real-time telemetry systems, cloud-based data processing pipelines, and pilot interfaces.',
    responsibilities: [
      'Architect and implement scalable backend services using Node.js and Python.',
      'Develop responsive frontend interfaces using React and TypeScript.',
      'Integrate with drone SDKs for mission planning and control.',
      'Optimize database performance for large geospatial datasets.',
      'Mentor junior developers and conduct code reviews.'
    ],
    qualifications: [
      'BS/MS in Computer Science or equivalent experience.',
      '5+ years of experience with full-stack web development.',
      'Proficiency in TypeScript, React, and Node.js.',
      'Experience with cloud platforms (AWS, GCP) and containerization (Docker/Kubernetes).',
      'Familiarity with geospatial libraries (Mapbox, Leaflet, Cesium) is a plus.'
    ]
  },
  { 
    id: 'sales-account-executive',
    title: 'Sales Account Executive', 
    location: 'New York, NY', 
    type: 'Full-time', 
    dept: 'Sales',
    description: 'We are looking for a dynamic Sales Account Executive to drive revenue growth in our Enterprise Solutions division. You will be responsible for identifying new business opportunities and managing relationships with key clients.',
    responsibilities: [
      'Prospect and qualify leads in target industries (Energy, Construction, Public Safety).',
      'Conduct product demonstrations and presentations to C-level executives.',
      'Negotiate contracts and close deals to meet quarterly sales targets.',
      'Maintain accurate CRM records and sales forecasts.',
      'Attend industry conferences and trade shows.'
    ],
    qualifications: [
      '3+ years of B2B sales experience, preferably in technology or hardware.',
      'Proven track record of exceeding sales quotas.',
      'Excellent communication and presentation skills.',
      'Ability to understand technical concepts and translate them into business value.',
      'Willingness to travel up to 25%.'
    ]
  },
  { 
    id: 'avionics-technician',
    title: 'Avionics Technician', 
    location: 'Denver, CO', 
    type: 'Full-time', 
    dept: 'Maintenance',
    description: 'The Avionics Technician is responsible for the assembly, testing, and repair of our proprietary drone platforms. You will work closely with the engineering team to troubleshoot complex hardware issues.',
    responsibilities: [
      'Assemble and integrate avionics systems, including flight controllers, GPS, and sensors.',
      'Perform soldering, wiring, and cable harness fabrication.',
      'Conduct rigorous ground and flight testing of new builds.',
      'Troubleshoot and repair damaged drones from field operations.',
      'Maintain detailed documentation of all maintenance activities.'
    ],
    qualifications: [
      'Technical diploma or certification in electronics or avionics.',
      '2+ years of experience in electronics assembly or repair.',
      'Proficiency with soldering iron, multimeter, and oscilloscope.',
      'Experience with RC aircraft or drones is highly desirable.',
      'Ability to read and interpret schematics and technical drawings.'
    ]
  },
];