export interface Project {
  id: string;
  title: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  featured: boolean;
}