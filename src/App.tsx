import { Suspense, lazy } from "react";
import { Navbar } from "./layout/NavBar";
import Footer from "./layout/Footer";
import HelloSection from "./components/HelloSection";
import "./App.css";

// Lazy-loaded components
const SkillSections = lazy(() => import("./components/SkillsSection"));
const ExperiencesSection = lazy(() => import("./components/ExperiencesSection"));
const ProjectSections = lazy(() => import("./components/ProjectSections"));

function App() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
      <Navbar />
      <main className="pt-12">
        <HelloSection />
        <Suspense fallback={<div className="text-white p-4">Loading skills...</div>}>
          <SkillSections />
          <ExperiencesSection />
          <ProjectSections />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
