import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo/Name */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Junior Osiris
          </h1>
          <p className="text-cyan-400">Full-Stack Developer</p>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <p className="text-gray-400 text-lg">
            Loading portfolio{dots}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="text-cyan-400 text-sm mt-2 font-mono">
            {Math.round(Math.min(progress, 100))}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;