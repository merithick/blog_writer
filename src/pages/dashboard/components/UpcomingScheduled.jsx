import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingScheduled = () => {
  const scheduledPosts = [
    {
      id: 1,
      title: 'Advanced React Patterns for 2024',
      scheduledDate: '2024-12-28T10:00:00Z',
      featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      category: 'Technology',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Building Scalable Web Applications',
      scheduledDate: '2024-12-30T14:30:00Z',
      featuredImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=400&h=200&fit=crop',
      category: 'Development',
      status: 'scheduled'
    },
    {
      id: 3,
      title: 'The Art of Technical Writing',
      scheduledDate: '2025-01-02T09:00:00Z',
      featuredImage: 'https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg?w=400&h=200&fit=crop',
      category: 'Writing',
      status: 'scheduled'
    }
  ];

  const formatScheduledDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatScheduledTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (scheduledPosts.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-editorial">
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="font-heading font-medium text-text-primary mb-2">No Scheduled Posts</h3>
          <p className="text-text-secondary text-sm mb-4">Schedule posts to publish them automatically</p>
          <Link to="/post-editor">
            <Button variant="primary" size="sm" iconName="Plus" iconPosition="left">
              Create Post
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-editorial">
      <div className="p-6 border-b border-border-muted">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-xl text-text-primary">Upcoming Posts</h2>
            <p className="text-text-secondary text-sm mt-1">{scheduledPosts.length} posts scheduled</p>
          </div>
          <Icon name="Calendar" size={24} className="text-primary" />
        </div>
      </div>

      <div className="divide-y divide-border-muted">
        {scheduledPosts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-surface transition-editorial">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary text-sm line-clamp-2 mb-1">
                  {post.title}
                </h3>
                
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs text-primary-600 font-medium">{post.category}</span>
                  <span className="text-text-muted">•</span>
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">
                    <Icon name="Clock" size={10} />
                    <span>Scheduled</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-text-muted">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatScheduledDate(post.scheduledDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{formatScheduledTime(post.scheduledDate)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Edit3" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-border-muted bg-surface/50">
        <Link to="/post-management">
          <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium transition-editorial">
            Manage All Scheduled Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UpcomingScheduled;