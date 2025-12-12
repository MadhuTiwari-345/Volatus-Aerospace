export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
  icon?: string;
}

export interface Division {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  features: string[];
}

export interface SearchResult {
  text: string;
  relatedSection?: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  dept: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}