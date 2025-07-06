'use client';

import { useState } from 'react';
import SimpleImage from './SimpleImage';

const sampleImages = [
  {
    src: '/20454632.jpg',
    alt: 'neon',
    title: 'Neon'
  },
  {
    src: '/1473685.jpg',
    alt: 'code Logo',
    title:'Code tag'
  },
  {
    src: '/xZwm2z.jpg',
    alt: 'norway Icon',
    title: 'Norway'
  },
  {
    src: '/iceland.jpg',
    alt: 'Iceland',
    title: 'Iceland'
  }
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Optimized Image Gallery
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Demonstrating lazy loading and optimization techniques
        </p>
      </div>

      {/* Main featured image */}
      <div className="relative">
        <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
          {selectedImage !== null ? (
            <div className="w-full h-full">
              <SimpleImage
                src={sampleImages[selectedImage].src}
                alt={sampleImages[selectedImage].alt}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">Select an image below</p>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {sampleImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 ${
              selectedImage === index ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <SimpleImage
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center z-10">
              {image.title}
            </div>
          </button>
        ))}
      </div>

      {/* Image info */}
      {selectedImage !== null && (
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
            {sampleImages[selectedImage].title}
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Optimized with lazy loading and responsive sizing
          </p>
        </div>
      )}
    </div>
  );
} 