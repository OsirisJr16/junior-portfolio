import React, { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, ExternalLink, GitBranch } from "lucide-react";
import { experiences } from "../data/constants";
import type { Experience } from "../types/experience";
import TerminalPrompt from "../shared/TerminalPrompt";
interface TimelineItemProps {
  experience: Experience;
  index: number;
  isVisible: boolean;
}
const TimelineItem: React.FC<TimelineItemProps> = ({
  experience,
  index,
  isVisible,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => setShowDetails(true), 500);
      }, index * 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, index]);

  return (
    <div
      className={`relative transition-all duration-700 transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      }`}
    >
      {/* Timeline Line */}
      <div className="absolute left-6 top-8 w-0.5 h-full bg-gradient-to-b from-cyan-400 via-emerald-400 to-transparent opacity-30"></div>

      {/* Timeline Node */}
      <div
        className={`absolute left-4 top-6 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
          isTyping
            ? "bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50"
            : "bg-gray-700 border-gray-600"
        }`}
      >
        <div
          className={`absolute inset-0 rounded-full ${
            isTyping ? "animate-ping bg-cyan-400 opacity-20" : ""
          }`}
        ></div>
      </div>

      {/* Content */}
      <div className="ml-16 pb-12">
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300">
          {/* Command Header */}
          <div className="flex items-center gap-2 mb-4 text-sm">
            <span className="text-emerald-400">$</span>
            <span className="text-gray-400">cat</span>
            <span className="text-cyan-400">{experience.id}.sh</span>
            {isTyping && <span className="animate-pulse text-cyan-400">|</span>}
          </div>

          {/* Company and Role */}
          <div
            className={`transition-all duration-500 ${
              showDetails ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  <span className="text-emerald-400"># </span>
                  {experience.role}
                </h3>
                <div className="flex items-center gap-4 text-cyan-400">
                  <span className="flex items-center gap-1">
                    <GitBranch size={14} />
                    {experience.company}
                  </span>
                  {experience.link && (
                    <a
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {experience.duration}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {experience.location}
              </span>
            </div>

            {/* Description */}
            <div className="mb-4">
              <div className="text-emerald-400 text-sm mb-2">
                ## Description
              </div>
              <ul className="space-y-1">
                {experience.description.map((desc, i) => (
                  <li key={i} className="text-gray-300 text-sm flex">
                    <span className="text-cyan-400 mr-2">•</span>
                    {desc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-4">
              <div className="text-emerald-400 text-sm mb-2">## Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded border border-cyan-400/20 hover:border-cyan-400/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-emerald-400 text-xl">$</span>
          <span className="text-gray-400 text-xl">
            git log --oneline --graph
          </span>
          <span className="animate-pulse text-cyan-400 text-xl">|</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          <span className="text-cyan-400">&gt; </span>
          Professional Timeline
        </h2>
        <p className="text-gray-400">// Commit history of my career journey</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            data-index={index}
          >
            <TimelineItem
              experience={experience}
              index={index}
              isVisible={visibleItems.has(index)}
            />
          </div>
        ))}
      </div>

      {/* Terminal Prompt */}
      <div className="mt-12 p-4 bg-gray-900/30 border border-gray-700/30 rounded-lg">
        <TerminalPrompt section="experiences" />
      </div>
    </div>
  );
};

export default Timeline;
