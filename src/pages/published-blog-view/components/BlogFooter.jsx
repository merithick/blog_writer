import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BlogFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    blog: [
      { label: 'All Posts', href: '/published-blog-view' },
      { label: 'Technology', href: '/published-blog-view?category=technology' },
      { label: 'Design', href: '/published-blog-view?category=design' },
      { label: 'Business', href: '/published-blog-view?category=business' },
      { label: 'Lifestyle', href: '/published-blog-view?category=lifestyle' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press Kit', href: '/press' }
    ],
    resources: [
      { label: 'Help Center', href: '/help' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' }
    ],
    writers: [
      { label: 'Writer Dashboard', href: '/dashboard' },
      { label: 'Create Post', href: '/post-editor' },
      { label: 'Manage Posts', href: '/post-management' },
      { label: 'Analytics', href: '/analytics' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com/blogwriter' },
    { name: 'Facebook', icon: 'Facebook', href: 'https://facebook.com/blogwriter' },
    { name: 'LinkedIn', icon: 'Linkedin', href: 'https://linkedin.com/company/blogwriter' },
    { name: 'Instagram', icon: 'Instagram', href: 'https://instagram.com/blogwriter' },
    { name: 'YouTube', icon: 'Youtube', href: 'https://youtube.com/blogwriter' },
    { name: 'RSS', icon: 'Rss', href: '/rss.xml' }
  ];

  return (
    <footer className="bg-surface border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-border-muted">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
              <Icon name="Mail" size={32} color="white" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">
              Stay in the Loop
            </h3>
            <p className="text-text-secondary font-body mb-8">
              Get the latest articles, insights, and updates delivered straight to your inbox. 
              Join our community of {(2840).toLocaleString()} readers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button variant="primary" size="lg">
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-text-muted mt-4 font-caption">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/published-blog-view" className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={24} color="white" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xl text-text-primary">
                    Blog Writer
                  </span>
                  <p className="text-sm text-text-secondary font-caption">
                    Insights & Stories
                  </p>
                </div>
              </Link>
              
              <p className="text-text-secondary font-body mb-6 leading-relaxed">
                A platform for writers and readers to share knowledge, insights, and stories. 
                Discover quality content across technology, design, business, and lifestyle.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:border-primary-200 hover:bg-primary-50 transition-editorial"
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Blog Links */}
            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-4">
                Blog
              </h4>
              <ul className="space-y-3">
                {footerLinks.blog.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-text-secondary hover:text-text-primary transition-editorial font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-text-secondary hover:text-text-primary transition-editorial font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-text-secondary hover:text-text-primary transition-editorial font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Writers Links */}
            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-4">
                For Writers
              </h4>
              <ul className="space-y-3">
                {footerLinks.writers.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-text-secondary hover:text-text-primary transition-editorial font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border-muted">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-6 text-sm text-text-muted">
              <p className="font-caption">
                © {currentYear} Blog Writer. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/privacy"
                  className="hover:text-text-primary transition-editorial"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="hover:text-text-primary transition-editorial"
                >
                  Terms
                </Link>
                <Link
                  to="/cookies"
                  className="hover:text-text-primary transition-editorial"
                >
                  Cookies
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-text-muted">
                <Icon name="Globe" size={16} />
                <span className="font-caption">English</span>
                <Icon name="ChevronDown" size={14} />
              </div>
              
              <Button variant="ghost" size="sm">
                <Icon name="Sun" size={16} />
                <span className="ml-2 font-caption">Theme</span>
              </Button>
            </div>
          </div>

          {/* Mobile Links */}
          <div className="md:hidden mt-4 pt-4 border-t border-border-muted">
            <div className="flex items-center justify-center space-x-6 text-sm text-text-muted">
              <Link
                to="/privacy"
                className="hover:text-text-primary transition-editorial font-caption"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="hover:text-text-primary transition-editorial font-caption"
              >
                Terms
              </Link>
              <Link
                to="/cookies"
                className="hover:text-text-primary transition-editorial font-caption"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BlogFooter;