import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';
import Button from './Button';

const PublicBlogNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const location = useLocation();

  const categories = [
    { id: 'all', label: 'All Posts', count: 124 },
    { id: 'technology', label: 'Technology', count: 45 },
    { id: 'design', label: 'Design', count: 32 },
    { id: 'business', label: 'Business', count: 28 },
    { id: 'lifestyle', label: 'Lifestyle', count: 19 },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-navigation bg-card border-b border-border shadow-editorial">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link to="/published-blog-view" className="flex items-center space-x-3 hover-scale">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={20} color="white" />
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-text-primary">
                  Blog Writer
                </span>
                <p className="text-xs text-text-secondary font-caption hidden sm:block">
                  Insights & Stories
                </p>
              </div>
            </Link>

            {/* Desktop Categories */}
            <nav className="hidden lg:flex items-center space-x-1">
              {categories.slice(0, 4).map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-editorial ${
                    selectedCategory === category.id
                      ? 'bg-primary-50 text-primary-600 border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <span>{category.label}</span>
                  <span className="text-xs bg-secondary-100 text-text-muted px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4"
                    autoFocus
                    onBlur={() => !searchQuery && setIsSearchOpen(false)}
                  />
                  <Icon
                    name="Search"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                  />
                </form>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center space-x-2 text-text-secondary hover:text-text-primary"
                >
                  <Icon name="Search" size={16} />
                  <span className="text-sm">Search</span>
                </Button>
              )}
            </div>

            {/* Mobile Search */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Subscribe */}
            <Button
              variant="primary"
              size="sm"
              iconName="Mail"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Subscribe
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" className="hidden sm:flex">
              <Icon name="Sun" size={18} />
            </Button>

            {/* RSS Feed */}
            <Button variant="ghost" className="hidden sm:flex">
              <Icon name="Rss" size={18} />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-border-muted">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4"
                autoFocus
              />
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
              />
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border-muted animate-slide-in">
            {/* Categories */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-text-primary mb-2 px-3">Categories</h3>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-editorial ${
                      selectedCategory === category.id
                        ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }`}
                  >
                    <span>{category.label}</span>
                    <span className="text-xs bg-secondary-100 text-text-muted px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Mobile Actions */}
            <div className="border-t border-border-muted pt-4 space-y-2">
              <Button
                variant="primary"
                fullWidth
                iconName="Mail"
                iconPosition="left"
              >
                Subscribe to Newsletter
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" fullWidth>
                  <Icon name="Sun" size={18} />
                  <span className="ml-2">Theme</span>
                </Button>
                <Button variant="ghost" fullWidth>
                  <Icon name="Rss" size={18} />
                  <span className="ml-2">RSS</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter Bar (Desktop) */}
      <div className="hidden lg:block border-t border-border-muted bg-surface/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-6">
              <span className="text-sm font-medium text-text-primary">Browse by topic:</span>
              <div className="flex items-center space-x-2">
                {categories.slice(1).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-editorial ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200 hover:text-text-primary'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>Latest articles</span>
              <Button variant="ghost" size="sm">
                <Icon name="Filter" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicBlogNavigation;