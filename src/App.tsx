import React from "react";
import { Navbar } from "./layout/NavBar";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./layout/Footer";
import HelloSection from "./components/HelloSection";
import SkillSections from "./components/SkillsSection";
import ExperiencesSection from "./components/ExperiencesSection";
import ProjectSections from "./components/ProjectSections";
import "./App.css";

function App() {
  const [loading, setLoading] = React.useState(true);
  const handleLoadingComplete = () => {
    setLoading(false);
  };
  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
      <Navbar />
      <main className="pt-12">
        <HelloSection />
        <SkillSections />
        <ExperiencesSection />
        <ProjectSections />
      </main>
      <Footer />
    </div>
  );
}

export default App;
