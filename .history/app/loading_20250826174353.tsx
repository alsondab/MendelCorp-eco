import React, { useState, useEffect } from 'react';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');
  
  const loadingSteps = [
    'Initializing...',
    'Loading products...',
    'Connecting to servers...',
    'Optimizing experience...',
    'Almost ready...'
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingSteps.indexOf(prev);
        return loadingSteps[(currentIndex + 1) % loadingSteps.length];
      });
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Circuit board pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="animate-pulse">
            <defs>
              <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M0,25 L25,25 M25,0 L25,50 M25,25 L50,25" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                <circle cx="25" cy="25" r="2" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
      </div>

      {/* Main loading container */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full mx-4">
        {/* Logo/Brand area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">TechStore</h2>
          <p className="text-blue-200 text-sm">Premium IT Products</p>
        </div>

        {/* Central loading animation */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="w-24 h-24 border-4 border-blue-200/30 rounded-full animate-spin">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
            </div>
            
            {/* Inner pulsing circle */}
            <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-80"></div>
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-white animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-blue-200 mb-2">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-white text-lg font-medium animate-pulse">
            {loadingText}
          </p>
          <div className="flex justify-center mt-3 space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Tech specs animation */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {['CPU', 'GPU', 'RAM'].map((spec, i) => (
            <div key={spec} className="text-center">
              <div className="w-full bg-white/10 rounded h-1 mb-1 overflow-hidden">
                <div 
                  className="h-full bg-green-400 rounded transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${Math.min(100, progress + (i * 10))}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                ></div>
              </div>
              <span className="text-xs text-blue-200">{spec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom brand elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-4 text-blue-300">
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-8 bg-blue-400 rounded-full animate-pulse opacity-60"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
          <span className="text-sm font-medium">Powering Innovation</span>
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-8 bg-blue-400 rounded-full animate-pulse opacity-60"
                style={{ animationDelay: `${(i + 4) * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}