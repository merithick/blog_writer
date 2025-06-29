import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PublishModal = ({ isOpen, onClose, onPublish, onSchedule, metadata }) => {
  const [publishType, setPublishType] = useState('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  if (!isOpen) return null;

  const handlePublish = async () => {
    setIsPublishing(true);
    
    try {
      if (publishType === 'now') {
        await onPublish();
      } else {
        const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
        await onSchedule(scheduledDateTime);
      }
      onClose();
    } catch (error) {
      console.error('Publishing failed:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const isScheduleValid = publishType === 'now' || (scheduledDate && scheduledTime);

  return (
    <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-editorial-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Ready to Publish?
          </h2>
          <Button variant="ghost" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Post Preview */}
          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="flex items-start space-x-3">
              {metadata.featuredImage && (
                <img
                  src={metadata.featuredImage}
                  alt="Featured"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-medium text-text-primary truncate">
                  {metadata.title || 'Untitled Post'}
                </h3>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                  {metadata.excerpt || 'No excerpt provided'}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  {metadata.category && (
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs">
                      {metadata.category}
                    </span>
                  )}
                  {metadata.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary-100 text-text-secondary rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {metadata.tags.length > 2 && (
                    <span className="text-xs text-text-muted">
                      +{metadata.tags.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Options */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">When do you want to publish?</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="publishType"
                  value="now"
                  checked={publishType === 'now'}
                  onChange={(e) => setPublishType(e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-primary"
                />
                <div>
                  <span className="font-medium text-text-primary">Publish Now</span>
                  <p className="text-sm text-text-secondary">Your post will be published immediately</p>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="publishType"
                  value="schedule"
                  checked={publishType === 'schedule'}
                  onChange={(e) => setPublishType(e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-primary"
                />
                <div className="flex-1">
                  <span className="font-medium text-text-primary">Schedule for Later</span>
                  <p className="text-sm text-text-secondary mb-2">Choose when to publish your post</p>
                  
                  {publishType === 'schedule' && (
                    <div className="flex space-x-2">
                      <Input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="flex-1"
                      />
                      <Input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Visibility Settings */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">Visibility</h4>
            <div className="bg-surface rounded-lg p-3 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-text-primary">Public</span>
                  <p className="text-sm text-text-secondary">Visible to everyone</p>
                </div>
                <Icon name="Globe" size={20} className="text-text-muted" />
              </div>
            </div>
          </div>

          {/* SEO Check */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">SEO Readiness</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={metadata.seoTitle ? "CheckCircle" : "AlertCircle"} 
                  size={16} 
                  className={metadata.seoTitle ? "text-success" : "text-warning"} 
                />
                <span className="text-sm text-text-secondary">SEO Title</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={metadata.metaDescription ? "CheckCircle" : "AlertCircle"} 
                  size={16} 
                  className={metadata.metaDescription ? "text-success" : "text-warning"} 
                />
                <span className="text-sm text-text-secondary">Meta Description</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={metadata.featuredImage ? "CheckCircle" : "AlertCircle"} 
                  size={16} 
                  className={metadata.featuredImage ? "text-success" : "text-warning"} 
                />
                <span className="text-sm text-text-secondary">Featured Image</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-surface/50">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              Save as Draft
            </Button>
            <Button
              variant="primary"
              onClick={handlePublish}
              disabled={!isScheduleValid || isPublishing}
              iconName={isPublishing ? undefined : (publishType === 'now' ? "Send" : "Clock")}
            >
              {isPublishing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Publishing...</span>
                </div>
              ) : (
                publishType === 'now' ? 'Publish Now' : 'Schedule Post'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;