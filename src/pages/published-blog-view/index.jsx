import React, { useState, useEffect } from 'react';
import PublicBlogNavigation from '../../components/ui/PublicBlogNavigation';
import BlogHero from './components/BlogHero';
import CategoryFilter from './components/CategoryFilter';
import BlogGrid from './components/BlogGrid';
import BlogSidebar from './components/BlogSidebar';
import BlogFooter from './components/BlogFooter';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const PublishedBlogView = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // Smooth scroll to content area
    const contentElement = document.getElementById('blog-content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icon name="BookOpen" size={32} color="white" />
          </div>
          <h2 className="font-heading text-xl font-semibold text-text-primary mb-2">
            Loading Blog...
          </h2>
          <p className="text-text-secondary font-body">
            Preparing the latest articles for you
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <PublicBlogNavigation />

      {/* Hero Section */}
      <BlogHero />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <CategoryFilter 
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />

        {/* Content Grid */}
        <div id="blog-content" className="grid lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <BlogGrid selectedCategory={selectedCategory} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BlogSidebar />
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 lg:p-12 text-center border border-primary-100">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
              <Icon name="PenTool" size={32} color="white" />
            </div>
            <h3 className="font-heading text-2xl lg:text-3xl font-bold text-text-primary mb-4">
              Ready to Share Your Story?
            </h3>
            <p className="text-text-secondary font-body mb-8 leading-relaxed">
              Join our community of writers and share your insights with thousands of readers. 
              Our platform makes it easy to create, publish, and manage your content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                iconName="Edit3"
                iconPosition="left"
                className="hover-scale"
              >
                Start Writing
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Users"
                iconPosition="left"
              >
                Join Community
              </Button>
            </div>
            <p className="text-sm text-text-muted mt-6 font-caption">
              Free to start • No credit card required • Publish in minutes
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <BlogFooter />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          variant="primary"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-editorial-lg z-50 hover-scale"
          aria-label="Scroll to top"
        >
          <Icon name="ArrowUp" size={20} />
        </Button>
      )}

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface z-navigation">
        <div 
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{
            width: `${Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
          }}
        />
      </div>
    </div>
  );
};

export default PublishedBlogView;