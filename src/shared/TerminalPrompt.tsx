import React from "react";

interface TerminalPromptProps {
  section?: string;
}
const TerminalPrompt: React.FC<TerminalPromptProps> = ({ section }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-emerald-400">
        junior-osiris@portfolio:~/{section}$
      </span>
      <span className="animate-pulse text-cyan-400">_</span>
    </div>
  );
};

export default TerminalPrompt;
