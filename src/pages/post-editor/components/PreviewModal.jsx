import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PreviewModal = ({ isOpen, onClose, title, content, metadata }) => {
  if (!isOpen) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimatedReadTime = Math.ceil(content.replace(/<[^>]*>/g, '').split(' ').length / 200);

  return (
    <div className="fixed inset-0 z-modal bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border shadow-editorial">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onClose}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="font-heading font-semibold text-text-primary">Preview</h1>
                <p className="text-sm text-text-secondary">How your post will appear to readers</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Smartphone" size={16} />
                <span className="hidden sm:inline ml-2">Mobile</span>
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Monitor" size={16} />
                <span className="hidden sm:inline ml-2">Desktop</span>
              </Button>
              <Button variant="primary" onClick={onClose}>
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-card rounded-lg shadow-editorial border border-border overflow-hidden">
          {/* Featured Image */}
          {metadata.featuredImage && (
            <div className="aspect-video w-full overflow-hidden">
              <Image
                src={metadata.featuredImage}
                alt={title || 'Featured image'}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <div className="p-6 lg:p-8">
            {/* Category & Tags */}
            {(metadata.category || metadata.tags.length > 0) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {metadata.category && (
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {metadata.category}
                  </span>
                )}
                {metadata.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-secondary-100 text-text-secondary rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
                {metadata.tags.length > 3 && (
                  <span className="text-sm text-text-muted">
                    +{metadata.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4 leading-tight">
              {title || 'Untitled Post'}
            </h1>

            {/* Excerpt */}
            {metadata.excerpt && (
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                {metadata.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex items-center justify-between py-4 border-t border-b border-border-muted">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">
                      {metadata.author || 'John Doe'}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {formatDate(metadata.publishDate || new Date())}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} />
                  <span>{estimatedReadTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={16} />
                  <span>0 views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-6 lg:px-8 pb-8">
            <div 
              className="prose prose-lg max-w-none font-body text-text-primary"
              dangerouslySetInnerHTML={{ __html: content || '<p>Start writing your content...</p>' }}
            />
          </div>

          {/* Article Footer */}
          <div className="px-6 lg:px-8 pb-6 border-t border-border-muted">
            <div className="flex items-center justify-between pt-6">
              {/* Social Sharing */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-primary">Share:</span>
                <Button variant="ghost" size="sm">
                  <Icon name="Twitter" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Facebook" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Linkedin" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Link" size={16} />
                </Button>
              </div>

              {/* Engagement */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Icon name="Heart" size={16} />
                  <span className="ml-1">0</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="MessageCircle" size={16} />
                  <span className="ml-1">0</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Bookmark" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section Preview */}
        {metadata.allowComments && (
          <div className="mt-8 bg-card rounded-lg shadow-editorial border border-border p-6 lg:p-8">
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
              Comments (0)
            </h3>
            <div className="text-center py-8 text-text-muted">
              <Icon name="MessageCircle" size={48} className="mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          </div>
        )}

        {/* Related Posts Preview */}
        <div className="mt-8 bg-card rounded-lg shadow-editorial border border-border p-6 lg:p-8">
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-6">
            Related Posts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-video bg-surface rounded-lg mb-3 flex items-center justify-center">
                  <Icon name="Image" size={32} className="text-text-muted" />
                </div>
                <h4 className="font-heading font-medium text-text-primary group-hover:text-primary transition-editorial mb-2">
                  Related Post Title {item}
                </h4>
                <p className="text-sm text-text-secondary line-clamp-2">
                  This is a preview of how related posts will appear at the bottom of your article.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;