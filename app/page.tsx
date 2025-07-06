import Navigation from "./components/Navigation";
import ThemeToggle from "./components/ThemeToggle";
import NotificationButtons from "./components/NotificationButtons";
import CacheManager from "./components/CacheManager";
import OptimizedImage from "./components/OptimizedImage";
import ImageGallery from "./components/ImageGallery";
import PerformanceMonitor from "./components/PerformanceMonitor";
import AccessibilityProvider from "./components/AccessibilityProvider";
import AccessibilityControls from "./components/AccessibilityControls";
import AnimatedDemo from "./components/AnimatedDemo";

export default function Home() {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Skip to main content link */}
        <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
          Skip to main content
        </a>
        
        <Navigation />
        <ThemeToggle />
        <AccessibilityControls />
              <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-4xl" role="main">
                    {/* Header */}
          <header className="text-center mb-6 sm:mb-8 lg:mb-12 animate-fade-in" role="banner">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
              Simple PWA
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              A beautiful image with descriptive text
            </p>
          </header>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Optimized Image Section */}
          <div className="relative animate-scale-in">
            <div className="aspect-video sm:aspect-[16/10] lg:aspect-[16/9] bg-gray-200 dark:bg-gray-700 rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl hover-lift">
              <OptimizedImage
                src="/next.svg"
                alt="Sample image for the PWA"
                fill
                className="object-contain dark:invert p-4 sm:p-6 lg:p-8"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
                quality={85}
              />
            </div>
          </div>

          {/* Text Content */}
          <section className="space-y-4 sm:space-y-6 animate-slide-in-left" aria-labelledby="welcome-heading">
            <h2 id="welcome-heading" className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
              Welcome to Our PWA
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                This is a simple Progressive Web App that demonstrates how to display 
                beautiful images with descriptive text. The app is designed to work 
                seamlessly across all devices and provides an excellent user experience 
                with dark mode support.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-400">
                The layout is fully responsive and optimized for both mobile and desktop 
                viewing. You can install this PWA on your device for offline access and 
                a native app-like experience.
              </p>
            </div>
          </section>

          {/* Notification Buttons */}
          <div className="pt-6 sm:pt-8 animate-slide-in-right">
            <NotificationButtons />
          </div>

          {/* Cache Manager */}
          <div className="pt-6 sm:pt-8 animate-fade-in stagger-1">
            <CacheManager />
          </div>

          {/* Call to Action */}
          <div className="text-center pt-4 sm:pt-6 animate-bounce">
            <button 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-sm sm:text-base hover-lift"
              aria-label="Learn more about this Progressive Web App"
            >
              Learn More
            </button>
          </div>

          {/* Image Gallery Section */}
          <div className="pt-8 sm:pt-12 animate-fade-in stagger-2">
            <ImageGallery />
          </div>

          {/* Animation Demo Section */}
          <div className="pt-8 sm:pt-12 animate-fade-in stagger-3">
            <AnimatedDemo />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 lg:mt-16 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400" role="contentinfo">
          <p>Built with Next.js and Tailwind CSS</p>
        </footer>
      </main>

      {/* Performance Monitor */}
      <PerformanceMonitor />
    </div>
    </AccessibilityProvider>
  );
}
