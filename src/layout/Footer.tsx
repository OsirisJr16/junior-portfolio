
import { Github } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <motion.div
        className="fixed bottom-8 left-8 flex flex-col space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-slate-400 font-code text-sm">© 2024 All rights reserved</p>
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
    </>
  );
};

export default Footer;