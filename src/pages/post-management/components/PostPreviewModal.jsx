import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostPreviewModal = ({ post, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !post) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-success-100 text-success-600';
      case 'draft': return 'bg-secondary-100 text-secondary-600';
      case 'scheduled': return 'bg-accent-100 text-accent-600';
      case 'archived': return 'bg-error-100 text-error-600';
      default: return 'bg-secondary-100 text-secondary-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-editorial-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Eye" size={20} className="text-primary" />
            <h2 className="font-heading font-semibold text-xl text-text-primary">
              Post Preview
            </h2>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => onEdit(post)}
              iconName="Edit3"
              iconPosition="left"
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <article className="p-6">
            {/* Featured Image */}
            {post.thumbnail && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Post Meta */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
                <span className="bg-primary-100 text-primary-600 px-2 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <span>{formatDate(post.publishedAt || post.updatedAt)}</span>
                <span>{post.readTime} min read</span>
              </div>

              <h1 className="font-heading font-bold text-3xl text-text-primary mb-4">
                {post.title}
              </h1>

              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                {post.excerpt}
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-border">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{post.author}</p>
                  <p className="text-sm text-text-secondary">Content Writer</p>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="prose-editorial max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-medium text-text-primary mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-secondary-100 text-text-secondary px-3 py-1 rounded-full text-sm hover:bg-secondary-200 transition-editorial cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Post Stats */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-text-secondary mb-1">
                    <Icon name="Eye" size={16} />
                    <span className="text-sm">Views</span>
                  </div>
                  <p className="font-semibold text-text-primary">{post.views.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-text-secondary mb-1">
                    <Icon name="Heart" size={16} />
                    <span className="text-sm">Likes</span>
                  </div>
                  <p className="font-semibold text-text-primary">{post.likes}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-text-secondary mb-1">
                    <Icon name="MessageCircle" size={16} />
                    <span className="text-sm">Comments</span>
                  </div>
                  <p className="font-semibold text-text-primary">{post.comments}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-text-secondary mb-1">
                    <Icon name="Share2" size={16} />
                    <span className="text-sm">Shares</span>
                  </div>
                  <p className="font-semibold text-text-primary">{post.shares || 0}</p>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-surface">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <span>Last updated: {formatDate(post.updatedAt)}</span>
            <span>•</span>
            <span>Word count: {post.wordCount || 'N/A'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => onDelete(post)}
              iconName="Trash2"
              className="text-error hover:text-error hover:bg-error-50"
            >
              Delete
            </Button>
            <Button
              variant="primary"
              onClick={() => onEdit(post)}
              iconName="Edit3"
              iconPosition="left"
            >
              Edit Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreviewModal;