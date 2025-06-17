import React from "react";
import Timeline from "./Timeline";

const ExperiencesSection: React.FC = () => {
  return (
    <section
      id="experiences"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-20"
    >
      <div className="container mx-auto">
        <Timeline />
      </div>
    </section>
  );
};

export default ExperiencesSection;
