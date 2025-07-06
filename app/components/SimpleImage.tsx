'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SimpleImage({
  src,
  alt,
  className = '',
  ...props
}: SimpleImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error('Failed to load image:', src);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}>
        <div className="text-center p-4">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-400">Image failed to load</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
      )}
      
      {/* Simple image */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} object-cover`}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={src.startsWith('/')}
        {...props}
      />
    </div>
  );
} 