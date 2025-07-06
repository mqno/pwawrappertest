'use client';

import { useState, useEffect, useCallback } from 'react';

export default function CacheManager() {
  const [cacheInfo, setCacheInfo] = useState<{
    staticCache: number;
    dynamicCache: number;
    totalSize: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const updateCacheInfo = useCallback(async () => {
    try {
      const staticCache = await caches.open('static-v2');
      const dynamicCache = await caches.open('dynamic-v2');
      
      const staticKeys = await staticCache.keys();
      const dynamicKeys = await dynamicCache.keys();
      
      // Estimate cache size (rough calculation)
      let totalSize = 0;
      const allKeys = [...staticKeys, ...dynamicKeys];
      
      for (const request of allKeys) {
        const response = await caches.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
      
      setCacheInfo({
        staticCache: staticKeys.length,
        dynamicCache: dynamicKeys.length,
        totalSize: formatBytes(totalSize)
      });
    } catch (error) {
      console.error('Error getting cache info:', error);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && 'caches' in window) {
      updateCacheInfo();
    }
  }, [updateCacheInfo]);

  const clearCache = async () => {
    setIsLoading(true);
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      await updateCacheInfo();
    } catch (error) {
      console.error('Error clearing cache:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isClient) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Cache Management
        </h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (typeof window === 'undefined' || !('caches' in window)) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Cache Management
      </h3>
      
      {cacheInfo && (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Static Cache:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {cacheInfo.staticCache} items
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Dynamic Cache:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {cacheInfo.dynamicCache} items
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Total Size:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {cacheInfo.totalSize}
            </span>
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={updateCacheInfo}
          className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm hover-lift"
        >
          Refresh
        </button>
        <button
          onClick={clearCache}
          disabled={isLoading}
          className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm disabled:cursor-not-allowed hover-lift"
        >
          {isLoading ? 'Clearing...' : 'Clear Cache'}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Cache helps the app work offline. Clear only if you&apos;re having issues.
      </p>
    </div>
  );
} 