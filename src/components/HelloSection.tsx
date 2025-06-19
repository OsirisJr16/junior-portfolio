import React from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight ,Download} from "lucide-react";
import backgroundBlur from "../assets/background.png";
import SnakeGame from "./SnakeGame";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HelloSection: React.FC = () => {
  //const [showGame, setShowGame] = useState(false);

  return (
    <section
      id="hello"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="space-y-4">
              <motion.p
                className="text-slate-400 font-code text-lg"
                variants={fadeInUp}
              >
                Hi all. I am
              </motion.p>
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white font-code "
                variants={fadeInUp}
              >
                Junior Osiris 🔥 
              </motion.h1>
              <motion.div
                className="flex items-center space-x-2"
                variants={fadeInUp}
              >
                <span className="text-accent-cyan text-2xl md:text-3xl font-code">
                  {">"}
                </span>
                <p className="text-accent-cyan text-2xl md:text-3xl font-code">
                  Full-Stack developer
                </p>
              </motion.div>
            </div>

            <motion.div
              className="space-y-4 font-code text-slate-400"
              variants={fadeInUp}
            >
              <p className="text-sm md:text-base">
                // complete the game to continue
              </p>
              <p className="text-sm md:text-base">
                // find my profile on Github:
              </p>
              <div className="flex items-center space-x-2 text-xs md:text-lg">
                <span className="text-purple-400">const</span>
                <span className="text-accent-cyan">githubLink</span>
                <span className="text-white">=</span>
                <a
                  href="https://github.com/OsirisJr16"
                  className="text-accent-orange hover:text-orange-300 transition-colors underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/OsirisJr16
                </a>
              </div>
              <div className="flex items-center space-x-2 text-xs md:text-lg">
                <span className="text-purple-400">const</span>
                <span className="text-accent-cyan">cvLink</span>
                <span className="text-white">=</span>
                <a
                  href="/path/to/your-cv.pdf"
                  className="text-accent-orange hover:text-orange-300 transition-colors underline flex items-center space-x-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download size={16} />
                  <span>Download CV</span>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Game */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              backgroundImage: `url(${backgroundBlur})`,
              backgroundSize: "cover",
              width: "100%",
            }}
          >
            <div className="md:block hidden relative">
              <div className="bg-gradient-to-br from-teal-400/20 to-cyan-400/20 p-8 rounded-2xl backdrop-blur-sm border border-teal-400/30 shadow-2xl">
                <div className="bg-slate-800 rounded-lg p-6 relative overflow-hidden">
                  <SnakeGame />
                </div>

                {/* Game Controls */}
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-slate-300 font-code text-sm">
                      <p>// use keyboard</p>
                      <p>// arrows to play</p>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div></div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors"
                      >
                        <ArrowUp size={16} />
                      </motion.button>
                      <div></div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors"
                      >
                        <ArrowLeft size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors"
                      >
                        <ArrowDown size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-slate-300 hover:bg-slate-600 transition-colors"
                      >
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>
                  </div>

                  <div className="text-slate-300 font-code text-sm">
                    <p>// food left</p>
                    <div className="flex space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-accent-cyan rounded-full"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-4 right-4 bg-accent-orange hover:bg-orange-500 text-slate-900 px-4 py-2 rounded-lg font-code text-sm font-medium transition-colors"
              >
                start-game
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 font-code text-sm transition-colors"
              >
                skip
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HelloSection;
