import { Navbar } from "./layout/NavBar";
import Footer from "./layout/Footer";
import HelloSection from "./components/HelloSection";
import SkillSections from "./components/SkillsSection";
import ExperiencesSection from "./components/ExperiencesSection";
import ProjectSections from "./components/ProjectSections";
import ContactSection from "./components/ContactSection";
import "./App.css";

function App() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
      <Navbar />
      <main className="pt-12">
        <HelloSection />
        <SkillSections />
        <ExperiencesSection />
        <ProjectSections />
        <ContactSection/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
