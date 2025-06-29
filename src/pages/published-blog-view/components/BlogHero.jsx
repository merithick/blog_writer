import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BlogHero = () => {
  const featuredPost = {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: `As we move deeper into 2024, the web development landscape continues to evolve at breakneck speed. From AI-powered development tools to revolutionary frameworks, discover the key trends that will shape how we build digital experiences.\n\nThis comprehensive guide explores emerging technologies, best practices, and the skills developers need to stay ahead in an increasingly competitive market.`,
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      role: "Senior Frontend Developer"
    },
    publishedAt: "2024-01-15T10:30:00Z",
    readTime: 8,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
    tags: ["Web Development", "Technology", "Frontend", "Trends"]
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
      <div className="absolute inset-0 bg-white/80"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                Featured
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-600">
                {featuredPost.category}
              </span>
            </div>

            <h1 className="font-heading text-3xl lg:text-5xl font-bold text-text-primary leading-tight">
              {featuredPost.title}
            </h1>

            <p className="text-lg text-text-secondary font-body leading-relaxed">
              {featuredPost.excerpt.split('\n')[0]}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-100">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium text-text-primary font-caption">
                    {featuredPost.author.name}
                  </p>
                  <p className="text-sm text-text-secondary font-caption">
                    {featuredPost.author.role}
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-border"></div>

              <div className="flex items-center space-x-4 text-sm text-text-secondary font-caption">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>{formatDate(featuredPost.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>{featuredPost.readTime} min read</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-6">
              <Button
                variant="primary"
                iconName="ArrowRight"
                iconPosition="right"
                className="hover-scale"
              >
                Read Full Article
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Heart" size={18} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Share2" size={18} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Bookmark" size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-editorial-lg hover-scale">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            
            {/* Floating Tags */}
            <div className="absolute -bottom-4 left-4 right-4">
              <div className="flex flex-wrap gap-2">
                {featuredPost.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-card border border-border shadow-editorial text-text-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;