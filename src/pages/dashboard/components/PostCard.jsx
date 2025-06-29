import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostCard = ({ post, onEdit, onDelete, onPreview }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: 'bg-success-100 text-success-700', icon: 'CheckCircle' },
      draft: { color: 'bg-warning-100 text-warning-700', icon: 'Clock' },
      scheduled: { color: 'bg-accent-100 text-accent-700', icon: 'Calendar' },
      archived: { color: 'bg-secondary-100 text-secondary-700', icon: 'Archive' }
    };

    const config = statusConfig[status] || statusConfig.draft;

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-editorial hover-scale transition-editorial">
      {/* Post Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          {getStatusBadge(post.status)}
        </div>
        <div className="absolute top-3 right-3">
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Icon name="MoreVertical" size={16} />
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-editorial-lg z-dropdown">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEdit(post.id);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-editorial"
                  >
                    <Icon name="Edit3" size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      onPreview(post.id);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-editorial"
                  >
                    <Icon name="Eye" size={16} />
                    <span>Preview</span>
                  </button>
                  <div className="border-t border-border-muted mt-1 pt-1">
                    <button
                      onClick={() => {
                        onDelete(post.id);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-editorial"
                    >
                      <Icon name="Trash2" size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xs text-text-muted">{formatDate(post.createdAt)}</span>
          <span className="text-text-muted">•</span>
          <span className="text-xs text-primary-600 font-medium">{post.category}</span>
        </div>

        <h3 className="font-heading font-semibold text-lg text-text-primary mb-2 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary-100 text-text-muted text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-text-muted">+{post.tags.length - 3} more</span>
            )}
          </div>
        )}

        {/* Post Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-border-muted">
          <div className="flex items-center space-x-4 text-sm text-text-muted">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={16} />
              <span>{formatViews(post.views)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={16} />
              <span>{post.comments || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={16} />
              <span>{post.likes || 0}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(post.id)}
              iconName="Edit3"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;