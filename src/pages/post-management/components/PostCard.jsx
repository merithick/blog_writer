import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostCard = ({ 
  post, 
  isSelected, 
  onSelect, 
  onEdit, 
  onDelete, 
  onPreview,
  onToggleStatus 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-success-100 text-success-600';
      case 'draft': return 'bg-secondary-100 text-secondary-600';
      case 'scheduled': return 'bg-accent-100 text-accent-600';
      case 'archived': return 'bg-error-100 text-error-600';
      default: return 'bg-secondary-100 text-secondary-600';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-600',
      'Design': 'bg-purple-100 text-purple-600',
      'Business': 'bg-green-100 text-green-600',
      'Lifestyle': 'bg-pink-100 text-pink-600',
      'Travel': 'bg-orange-100 text-orange-600'
    };
    return colors[category] || 'bg-secondary-100 text-secondary-600';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-editorial hover:shadow-editorial-lg transition-all duration-300 ${isSelected ? 'ring-2 ring-primary border-primary' : ''}`}>
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(post.id, e.target.checked)}
          className="w-4 h-4 text-primary border-border rounded focus-ring"
        />
      </div>

      {/* Post Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        {/* Category and Date */}
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
          <span className="text-xs text-text-muted">
            {formatDate(post.publishedAt || post.updatedAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-xs text-text-muted">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>{formatViews(post.views)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={14} />
              <span>{post.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={14} />
              <span>{post.likes}</span>
            </div>
          </div>
          <span className="text-xs text-text-muted">
            {post.readTime} min read
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPreview(post)}
              iconName="Eye"
              className="text-text-secondary hover:text-text-primary"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(post)}
              iconName="Edit3"
              className="text-text-secondary hover:text-text-primary"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(post)}
              iconName="Trash2"
              className="text-error hover:text-error hover:bg-error-50"
            />
          </div>
          
          {post.status === 'draft' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onToggleStatus(post)}
              iconName="Send"
            >
              Publish
            </Button>
          )}
          
          {post.status === 'published' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleStatus(post)}
              iconName="Archive"
            >
              Archive
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;