'use client';

import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  imageCount: number;
  cachedImages: number;
  totalSize: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    imageCount: 0,
    cachedImages: 0,
    totalSize: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Measure page load time
    if (typeof window !== 'undefined') {
      const loadTime = performance.now();
      setMetrics(prev => ({ ...prev, loadTime }));

      // Count images on page
      const images = document.querySelectorAll('img');
      setMetrics(prev => ({ 
        ...prev, 
        imageCount: images.length 
      }));

      // Check cached images
      let cachedCount = 0;
      images.forEach(img => {
        if (img.complete) {
          cachedCount++;
        }
      });
      setMetrics(prev => ({ 
        ...prev, 
        cachedImages: cachedCount 
      }));

      // Estimate total size (rough calculation)
      const estimatedSize = images.length * 50; // Rough estimate in KB
      setMetrics(prev => ({ 
        ...prev, 
        totalSize: estimatedSize 
      }));
    }
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isClient) {
    return null;
  }

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg z-50"
        title="Show Performance Metrics"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 w-64 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Performance Metrics
        </h3>
        <button
          onClick={toggleVisibility}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Load Time:</span>
          <span className="text-gray-900 dark:text-white font-mono">
            {metrics.loadTime.toFixed(1)}ms
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Images:</span>
          <span className="text-gray-900 dark:text-white font-mono">
            {metrics.imageCount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Cached:</span>
          <span className="text-gray-900 dark:text-white font-mono">
            {metrics.cachedImages}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Est. Size:</span>
          <span className="text-gray-900 dark:text-white font-mono">
            {metrics.totalSize}KB
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {metrics.loadTime < 1000 ? '🚀 Fast' : metrics.loadTime < 3000 ? '⚡ Good' : '🐌 Slow'}
        </div>
      </div>
    </div>
  );
} 