import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Code, Database, Globe, Calendar, MapPin } from "lucide-react";
import type { Project } from "../types/project";
import { projects } from "../data/constants";
import TerminalPrompt from "../shared/TerminalPrompt";
interface ProjectCardProps {
  project: Project;
  isVisible: boolean;
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isVisible, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 h-full">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-400/10 rounded-lg">
              <Code size={20} className="text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-gray-400">{project.role}</p>
            </div>
          </div>
          {project.featured && (
            <span className="px-2 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded-full border border-emerald-400/30">
              Featured
            </span>
          )}
        </div>

        {/* Company and Period */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Database size={14} />
            <span>{project.company}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{project.period}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{project.location}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">## Description</h4>
          <ul className="space-y-1">
            {project.description.map((desc, index) => (
              <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">## Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded border border-gray-700/50 hover:border-cyan-400/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        {project.links && (
          <div className="flex items-center gap-3 pt-4 border-t border-gray-700/50">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white text-sm rounded-lg border border-gray-700/50 hover:border-gray-600 transition-all"
              >
                <Github size={16} />
                <span>Code</span>
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 hover:text-cyan-300 text-sm rounded-lg border border-cyan-400/30 hover:border-cyan-400/50 transition-all"
              >
                <Globe size={16} />
                <span>Live Demo</span>
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 hover:text-emerald-300 text-sm rounded-lg border border-emerald-400/30 hover:border-emerald-400/50 transition-all"
              >
                <ExternalLink size={16} />
                <span>Demo</span>
              </a>
            )}
          </div>
        )}

        {/* Terminal Output */}
        <div className={`mt-4 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex items-center gap-2 text-xs mb-1">
            <span className="text-emerald-400">$</span>
            <span className="text-gray-400">git log --oneline -1</span>
          </div>
          <div className="text-emerald-400 text-xs">
            ✓ Project completed successfully
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const observerRef = useRef<IntersectionObserver | null>(null);

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
    if (visibleItems.has("projects-header")) {
      const timer = setTimeout(() => setIsTyping(true), 500);
      return () => clearTimeout(timer);
    }
  }, [visibleItems]);

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : activeFilter === "featured" 
    ? projects.filter(p => p.featured)
    : projects;

  return (
    <section
      id="projects"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-20"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className="max-w-6xl mx-auto mb-16 text-center"
          data-id="projects-header"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-emerald-400 text-xl">$</span>
            <span className="text-gray-400 text-xl">git log --oneline --graph</span>
            {isTyping && (
              <span className="animate-pulse text-cyan-400 text-xl">|</span>
            )}
          </div>
          <h2
            className={`text-3xl font-bold text-white mb-4 transition-all duration-700 ${
              visibleItems.has("projects-header")
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <span className="text-cyan-400">{">"} </span>
            Projects & Builds
          </h2>
          <p
            className={`text-gray-400 transition-all duration-700 delay-200 ${
              visibleItems.has("projects-header")
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            // A showcase of things I've built with code, curiosity, and creativity
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-emerald-400">$</span>
            <span className="text-gray-400 text-sm">git branch --list</span>
          </div>
          <div className="flex gap-3">
            {["all", "featured", "personal"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/50"
                    : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={project.id} data-id={`project-${project.id}`}>
                <ProjectCard
                  project={project}
                  isVisible={visibleItems.has(`project-${project.id}`)}
                  delay={index * 100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Prompt */}
        <div className="max-w-6xl mx-auto mt-12 p-4 bg-gray-900/30 border border-gray-700/30 rounded-lg">
          <TerminalPrompt section="projects" />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;