import { Github } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerText = `© ${currentYear} All rights reserved`; 
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <motion.div
          className="fixed bottom-8 left-8 flex flex-col space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-slate-400 font-code text-sm">{footerText}</p>
        </motion.div>
        <motion.div
          className="fixed bottom-8 right-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <a
            href="https://github.com/OsirisJr16"
            className="flex items-center space-x-2 text-slate-400 hover:text-accent-cyan transition-colors font-code text-sm"
          >
            <span>@OsirisJr16</span>
            <Github size={20} />
          </a>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <motion.div
        className="md:hidden fixed bottom-4 left-4 right-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3">
          <p className="text-slate-400 font-code text-xs sm:text-sm text-center sm:text-left">
            {footerText}
          </p>
          <a
            href="https://github.com/OsirisJr16"
            className="flex items-center justify-center sm:justify-start space-x-2 text-slate-400 hover:text-accent-cyan transition-colors font-code text-xs sm:text-sm"
          >
            <span>@OsirisJr16</span>
            <Github size={16} />
          </a>
        </div>
      </motion.div>
    </>
  );
};

export default Footer;