import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';
import Button from './Button';

const ManagementHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Post Editor', path: '/post-editor', icon: 'Edit3' },
    { label: 'Post Management', path: '/post-management', icon: 'FileText' },
    { label: 'Published Blog', path: '/published-blog-view', icon: 'Eye' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleCommandPalette = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsSearchOpen(true);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleCommandPalette);
    return () => document.removeEventListener('keydown', handleCommandPalette);
  }, []);

  const isActivePath = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-navigation bg-card border-b border-border shadow-editorial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-3 hover-scale">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="PenTool" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-xl text-text-primary">
                Blog Writer
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-editorial ${
                    isActivePath(item.path)
                      ? 'bg-primary-50 text-primary-600 border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
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
                    placeholder="Search posts, drafts..."
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
                  <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs font-mono bg-surface border border-border rounded">
                    ⌘K
                  </kbd>
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

            {/* Notifications */}
            <Button variant="ghost" className="relative">
              <Icon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>

            {/* Profile Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-primary)" />
                </div>
                <Icon name="ChevronDown" size={16} className="text-text-muted" />
              </Button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-editorial-lg z-dropdown animate-fade-in">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-border-muted">
                      <p className="text-sm font-medium text-text-primary">John Doe</p>
                      <p className="text-xs text-text-secondary">john@example.com</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-editorial"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </Link>
                    <Link
                      to="/help"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-editorial"
                    >
                      <Icon name="HelpCircle" size={16} />
                      <span>Help</span>
                    </Link>
                    <div className="border-t border-border-muted mt-1 pt-1">
                      <Link
                        to="/login-screen"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-error hover:bg-error-50 transition-editorial"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign out</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
                placeholder="Search posts, drafts..."
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
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-editorial ${
                    isActivePath(item.path)
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default ManagementHeader;