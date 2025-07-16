import React, { useState, useEffect, useRef } from "react";
import type { SkillCategory } from "../types/skillCategory";
import type { Skill } from "../types/skill";
import { Code, Database, Server, Wrench ,Workflow} from "lucide-react";
import TerminalPrompt from "../shared/TerminalPrompt";

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: <Code size={20} />,
    color: "cyan",
    skills: [
      {
        name: "React/Next.js",
        level: 80,
        category: "frontend",
      },
      {
        name: "Angular",
        level: 75,
        category: "frontend",
      },
      {
        name: "TypeScript",
        level: 70,
        category: "frontend",
      },
      {
        name: "Tailwind CSS",
        level: 75,
        category: "frontend",
      },
      {
        name: "JavaScript ES6+",
        level: 80,
        category: "frontend",
      },
    ],
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: <Server size={20} />,
    color: "emerald",
    skills: [
      {
        name: "Node.js",
        level: 80,
        category: "backend",
      },
      {
        name: "Express.js",
        level: 75,
        category: "backend",
      },
      {
        name: "FastApi",
        level: 80,
        category: "backend",
      },
      {
        name: "REST APIs",
        level: 80,
        category: "backend",
      },
      {
        name: "Python",
        level: 90,
        category: "backend",
      },
    ],
  },
  {
    id: "database",
    name: "Database & Storage",
    icon: <Database size={20} />,
    color: "purple",
    skills: [
      {
        name: "PostgreSQL",
        level: 88,
        category: "database",
      },
      {
        name: "MongoDB",
        level: 75,
        category: "database",
      },
      {
        name: "MySQL",
        level: 80,
        category: "database",
      },
    ],
  },
  {
    id: "devops",
    name: "DevOps & Tools",
    icon: <Wrench size={20} />,
    color: "orange",
    skills: [
      { name: "Docker", level: 60, category: "devops" },
      { name: "CI/CD", level: 60, category: "devops" },
      {
        name: "Git/GitHub",
        level: 85,
        category: "devops",
      },
    ],
  },
  {
    id: "automation",
    name: "Automation & AI",
    icon: <Workflow size={20} />,
    color: "pink",
    skills: [
      { name: "n8n", level: 85, category: "workflow" },
    ],
  }
];

interface SkillBarProps {
  skill: Skill;
  isVisible: boolean;
  delay: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, isVisible, delay }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedLevel(skill.level);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.level, delay]);

  const getColorClasses = (level: number) => {
    if (level >= 90) return "from-emerald-400 to-cyan-400";
    if (level >= 80) return "from-cyan-400 to-blue-400";
    if (level >= 70) return "from-blue-400 to-purple-400";
    return "from-purple-400 to-pink-400";
  };

  return (
    <div className="mb-4 group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
        <div className="flex items-center gap-2">
          {/* <span className="text-xs text-gray-500">{skill.experience}</span> */}
          <span className="text-cyan-400 text-sm font-mono">
            {animatedLevel}%
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getColorClasses(
            skill.level
          )} transition-all duration-1000 ease-out relative`}
          style={{ width: `${animatedLevel}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>
    </div>
  );
};

interface SkillCategoryProps {
  category: SkillCategory;
  isActive: boolean;
  onClick: () => void;
  isVisible: boolean;
}

const SkillCategoryCard: React.FC<SkillCategoryProps> = ({
  category,
  isActive,
  onClick,
  isVisible,
}) => {
  const getColorClasses = (color: string) => {
    const colors = {
      cyan: "border-cyan-400/50 text-cyan-400 hover:border-cyan-400 hover:shadow-cyan-400/20",
      emerald:
        "border-emerald-400/50 text-emerald-400 hover:border-emerald-400 hover:shadow-emerald-400/20",
      purple:
        "border-purple-400/50 text-purple-400 hover:border-purple-400 hover:shadow-purple-400/20",
      orange:
        "border-orange-400/50 text-orange-400 hover:border-orange-400 hover:shadow-orange-400/20",
      pink: "border-pink-400/50 text-pink-400 hover:border-pink-400 hover:shadow-pink-400/20",
      indigo:
        "border-indigo-400/50 text-indigo-400 hover:border-indigo-400 hover:shadow-indigo-400/20",
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  const getActiveColorClasses = (color: string) => {
    const colors = {
      cyan: "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20",
      emerald:
        "border-emerald-400 bg-emerald-400/10 shadow-lg shadow-emerald-400/20",
      purple:
        "border-purple-400 bg-purple-400/10 shadow-lg shadow-purple-400/20",
      orange:
        "border-orange-400 bg-orange-400/10 shadow-lg shadow-orange-400/20",
      pink: "border-pink-400 bg-pink-400/10 shadow-lg shadow-pink-400/20",
      indigo:
        "border-indigo-400 bg-indigo-400/10 shadow-lg shadow-indigo-400/20",
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
        isActive
          ? getActiveColorClasses(category.color)
          : `bg-gray-900/50 ${getColorClasses(category.color)}`
      } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <div className="flex items-center gap-3 mb-2">
        {category.icon}
        <span className="font-semibold">{category.name}</span>
      </div>
      <div className="text-xs text-gray-400">
        {category.skills.length} skills
      </div>
    </button>
  );
};

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setVisibleItems((prev) => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-id]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (visibleItems.has("skills-header")) {
      const timer = setTimeout(() => setIsTyping(true), 500);
      return () => clearTimeout(timer);
    }
  }, [visibleItems]);

  const activeSkillCategory = skillCategories.find(
    (cat) => cat.id === activeCategory
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-20"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className="max-w-6xl mx-auto mb-16 text-center"
          data-id="skills-header"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-emerald-400 text-xl">$</span>
            <span className="text-gray-400 text-xl">cat /dev/skills</span>
            {isTyping && (
              <span className="animate-pulse text-cyan-400 text-xl">|</span>
            )}
          </div>
          <h2
            className={`text-3xl font-bold text-white mb-4 transition-all duration-700 ${
              visibleItems.has("skills-header")
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <span className="text-cyan-400">{">"} </span>
            Technical Skills
          </h2>
          <p
            className={`text-gray-400 transition-all duration-700 delay-200 ${
              visibleItems.has("skills-header")
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            // A comprehensive overview of my technical expertise
          </p>
        </div>

        {/* Skills Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-emerald-400">$</span>
                    <span className="text-gray-400 text-sm">
                      ls -la /skills/
                    </span>
                  </div>
                  <div className="space-y-3">
                    {skillCategories.map((category, index) => (
                      <div
                        key={category.id}
                        data-id={`category-${category.id}`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <SkillCategoryCard
                          category={category}
                          isActive={activeCategory === category.id}
                          onClick={() => setActiveCategory(category.id)}
                          isVisible={visibleItems.has(
                            `category-${category.id}`
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Display */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
                {activeSkillCategory && (
                  <>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700/50">
                      <div
                        className={`p-2 rounded-lg bg-${activeSkillCategory.color}-400/10 text-${activeSkillCategory.color}-400`}
                      >
                        {activeSkillCategory.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {activeSkillCategory.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {activeSkillCategory.skills.length} technologies
                        </p>
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-1">
                      {activeSkillCategory.skills.map((skill, index) => (
                        <SkillBar
                          key={skill.name}
                          skill={skill}
                          isVisible={visibleItems.has(
                            `category-${activeSkillCategory.id}`
                          )}
                          delay={index * 100}
                        />
                      ))}
                    </div>

                    {/* Terminal Output */}
                    <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <span className="text-emerald-400">$</span>
                        <span className="text-gray-400">
                          echo "Skills loaded successfully"
                        </span>
                      </div>
                      <div className="text-emerald-400 text-sm">
                        ✓ {activeSkillCategory.skills.length} skills initialized
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        Average proficiency:{" "}
                        {Math.round(
                          activeSkillCategory.skills.reduce(
                            (acc, skill) => acc + skill.level,
                            0
                          ) / activeSkillCategory.skills.length
                        )}
                        %
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Prompt */}
        <div className="max-w-6xl mx-auto mt-12 p-4 bg-gray-900/30 border border-gray-700/30 rounded-lg">
          <TerminalPrompt section="skills" />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
