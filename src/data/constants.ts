import type { Experience } from '../types/experience';

export const experiences: Experience[] = [
   {
    id: 'exp-003',
    company: 'Freelance Web Developer',
    role: 'Web Developer',
    duration: 'Jan 2025 - April 2025',
    location: 'Remote',
    description: [
      'Developed the frontend and backend of the UFM Madagascar Website using ReactJs and ExpressJS',
      'Collaborated with clients to meet technical and functional requirements',
    ],
    technologies: ['ReactJs', 'Node.Js', 'PostgreSql' , 'Express'],
    
  },
  {
    id: 'exp-002',
    company: 'INNOV-T Madagascar',
    role: 'React Developer',
    duration: 'Jun 2024 - Nov 2024',
    location: 'Fianarantsoa',
    description: [
      'Developed and maintained internal applications for the company',
      'Designed and developed a platfrom for sharing training materials and courses',
    ],
    technologies: ['ReactJs', 'Node.Js', 'MongoDB' , 'Express' ,'NestJS'],
    
  },
  {
    id: 'exp-001',
    company: 'RELIA Consulting',
    role: 'Internship Angular Developer',
    duration: 'June 2023 - Oct 2023',
    location: 'Hybride',
    description: [
      'Collaborated with the development team to impliment new features',
      'Build a platform connecting students with companes to ease the job and internship search process',
      'Participated in UI/UX design using Figma'
    ],
    technologies: ['Angular', 'Boostrap', 'JAVA', 'Figma', 'Git'],
  }
];
export const skillsData = {
  Languages: {
    skills: ["JavaScript", "TypeScript", "PHP", "HTML", "CSS", "Python"],
    color: "cyan",
  },
  "Stacks & libraries": {
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Laravel",
      "Bootstrap",
      "Tailwind CSS",
    ],
    color: "green",
  },
  Databases: {
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
    color: "purple",
  },
  Tools: {
    skills: ["Git", "GitHub", "GitLab", "Docker", "Figma", "Postman"],
    color: "orange",
  },
  "Other Skills": {
    skills: [
      "UI/UX Design",
      "Web Design",
      "API Development",
      "Database Design",
    ],
    color: "pink",
  },
};

export const colorVariants = {
  cyan: {
    border: "border-cyan-400/50",
    text: "text-cyan-400",
    hover: "hover:bg-cyan-400/10 hover:border-cyan-400",
    glow: "hover:shadow-cyan-500/50",
  },
  green: {
    border: "border-green-400/50",
    text: "text-green-400",
    hover: "hover:bg-green-400/10 hover:border-green-400",
    glow: "hover:shadow-green-500/50",
  },
  purple: {
    border: "border-purple-400/50",
    text: "text-purple-400",
    hover: "hover:bg-purple-400/10 hover:border-purple-400",
    glow: "hover:shadow-purple-500/50",
  },
  orange: {
    border: "border-orange-400/50",
    text: "text-orange-400",
    hover: "hover:bg-orange-400/10 hover:border-orange-400",
    glow: "hover:shadow-orange-500/50",
  },
  pink: {
    border: "border-pink-400/50",
    text: "text-pink-400",
    hover: "hover:bg-pink-400/10 hover:border-pink-400",
    glow: "hover:shadow-pink-500/50",
  },
};