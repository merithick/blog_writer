import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BlogCard = ({ post, variant = 'default' }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (variant === 'featured') {
    return (
      <article className="group bg-card rounded-xl border border-border shadow-editorial hover:shadow-editorial-lg transition-layout overflow-hidden">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-layout"
            onError={(e) => {
              e.target.src = '/assets/images/no_image.png';
            }}
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-50 text-primary-600">
              {post.category}
            </span>
            <span className="text-sm text-text-muted font-caption">
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <h2 className="font-heading text-xl font-semibold text-text-primary mb-3 line-clamp-2 group-hover:text-primary transition-editorial">
            {post.title}
          </h2>

          <p className="text-text-secondary font-body mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary-100">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary font-caption">
                  {post.author.name}
                </p>
                <p className="text-xs text-text-muted font-caption">
                  {post.readTime} min read
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Icon name="Heart" size={16} />
                <span className="ml-1 text-xs">{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="MessageCircle" size={16} />
                <span className="ml-1 text-xs">{post.comments}</span>
              </Button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-card rounded-lg border border-border shadow-editorial hover:shadow-editorial-lg transition-layout overflow-hidden">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-layout"
          onError={(e) => {
            e.target.src = '/assets/images/no_image.png';
          }}
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-secondary-100 text-text-secondary">
            {post.category}
          </span>
          <span className="text-xs text-text-muted font-caption">
            {formatDate(post.publishedAt)}
          </span>
        </div>

        <h3 className="font-heading text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-editorial">
          {post.title}
        </h3>

        <p className="text-sm text-text-secondary font-body mb-3 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-secondary-100">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            <span className="text-xs font-medium text-text-primary font-caption">
              {post.author.name}
            </span>
            <span className="text-xs text-text-muted font-caption">
              • {post.readTime}m
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Icon name="Heart" size={14} />
              <span className="ml-1 text-xs">{post.likes}</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Share2" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;