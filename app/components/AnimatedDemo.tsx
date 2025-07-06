'use client';

import { useState, useEffect } from 'react';

export default function AnimatedDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState<string>('fade-in');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const animations = [
    { id: 'fade-in', name: 'Fade In', class: 'animate-fade-in' },
    { id: 'slide-left', name: 'Slide Left', class: 'animate-slide-in-left' },
    { id: 'slide-right', name: 'Slide Right', class: 'animate-slide-in-right' },
    { id: 'scale-in', name: 'Scale In', class: 'animate-scale-in' },
    { id: 'bounce', name: 'Bounce', class: 'animate-bounce' },
    { id: 'pulse', name: 'Pulse', class: 'animate-pulse' },
  ];

  const triggerAnimation = (animationId: string) => {
    setActiveAnimation(animationId);
    // Reset animation by removing and re-adding the class
    if (typeof window !== 'undefined') {
      const element = document.getElementById('demo-element');
      if (element) {
        element.classList.remove('animate-fade-in', 'animate-slide-in-left', 'animate-slide-in-right', 'animate-scale-in', 'animate-bounce', 'animate-pulse');
        setTimeout(() => {
          const animation = animations.find(a => a.id === animationId);
          if (animation) {
            element.classList.add(animation.class);
          }
        }, 10);
      }
    }
  };

  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Animation Demo
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Animation Demo
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click buttons to see different animations
        </p>
      </div>

      {/* Animation Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {animations.map((animation) => (
          <button
            key={animation.id}
            onClick={() => triggerAnimation(animation.id)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 hover-lift ${
              activeAnimation === animation.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
            }`}
          >
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {animation.name}
            </div>
          </button>
        ))}
      </div>

      {/* Demo Element */}
      <div className="flex justify-center">
        <div
          id="demo-element"
          className={`w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-lg ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          Demo
        </div>
      </div>

      {/* Animated Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Hover Lift', description: 'Lifts on hover', class: 'hover-lift' },
          { title: 'Hover Scale', description: 'Scales on hover', class: 'hover-scale' },
          { title: 'Shimmer Effect', description: 'Loading animation', class: 'animate-shimmer' },
        ].map((card, index) => (
          <div
            key={index}
            className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ${card.class} stagger-${index + 1}`}
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {card.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Loading Animation Demo */}
      <div className="text-center space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          Loading States
        </h4>
        <div className="flex justify-center space-x-4">
          <div className="loading-spinner"></div>
          <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-5 w-20 rounded"></div>
          <div className="animate-shimmer bg-gray-300 dark:bg-gray-600 h-5 w-20 rounded"></div>
        </div>
      </div>

      {/* Progress Bar Animation */}
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
          Progress Animation
        </h4>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  );
} 