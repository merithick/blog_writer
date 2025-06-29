import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const MetadataPanel = ({ 
  isOpen, 
  onClose, 
  metadata, 
  onMetadataChange,
  onFeaturedImageUpload 
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [tagInput, setTagInput] = useState('');

  const categories = [
    'Technology', 'Design', 'Business', 'Lifestyle', 'Travel', 
    'Food', 'Health', 'Education', 'Entertainment', 'Sports'
  ];

  const suggestedTags = [
    'react', 'javascript', 'web-development', 'tutorial', 'tips',
    'best-practices', 'coding', 'frontend', 'backend', 'mobile'
  ];

  const handleTagAdd = (tag) => {
    if (tag && !metadata.tags.includes(tag)) {
      onMetadataChange({
        ...metadata,
        tags: [...metadata.tags, tag]
      });
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    onMetadataChange({
      ...metadata,
      tags: metadata.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleTagAdd(tagInput.trim());
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: 'FileText' },
    { id: 'seo', label: 'SEO', icon: 'Search' },
    { id: 'social', label: 'Social', icon: 'Share2' },
    { id: 'advanced', label: 'Advanced', icon: 'Settings' }
  ];

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-card border-l border-border shadow-editorial-lg transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-text-primary">Post Settings</h2>
        <Button variant="ghost" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-editorial ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary-50/50' :'text-text-secondary hover:text-text-primary hover:bg-surface'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'general' && (
          <>
            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Featured Image
              </label>
              {metadata.featuredImage ? (
                <div className="relative group">
                  <Image
                    src={metadata.featuredImage}
                    alt="Featured image"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      variant="ghost"
                      onClick={() => onMetadataChange({ ...metadata, featuredImage: '' })}
                      className="text-white hover:bg-white hover:bg-opacity-20"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => document.getElementById('featured-image-input').click()}
                  className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary-50/50 transition-editorial"
                >
                  <Icon name="Upload" size={24} className="text-text-muted mb-2" />
                  <span className="text-sm text-text-muted">Click to upload image</span>
                </div>
              )}
              <input
                id="featured-image-input"
                type="file"
                accept="image/*"
                onChange={onFeaturedImageUpload}
                className="hidden"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category
              </label>
              <select
                value={metadata.category}
                onChange={(e) => onMetadataChange({ ...metadata, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tags
              </label>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Add tags (press Enter or comma to add)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                
                {/* Current Tags */}
                {metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {metadata.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleTagRemove(tag)}
                          className="hover:text-primary-900"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Suggested Tags */}
                <div>
                  <p className="text-xs text-text-muted mb-2">Suggested tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {suggestedTags
                      .filter(tag => !metadata.tags.includes(tag))
                      .slice(0, 6)
                      .map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagAdd(tag)}
                          className="px-2 py-1 text-xs bg-surface text-text-secondary rounded hover:bg-secondary-100 hover:text-text-primary transition-editorial"
                        >
                          {tag}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Excerpt
              </label>
              <textarea
                value={metadata.excerpt}
                onChange={(e) => onMetadataChange({ ...metadata, excerpt: e.target.value })}
                placeholder="Brief description of your post..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              />
              <p className="text-xs text-text-muted mt-1">
                {metadata.excerpt.length}/160 characters
              </p>
            </div>
          </>
        )}

        {activeTab === 'seo' && (
          <>
            {/* SEO Title */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                SEO Title
              </label>
              <Input
                type="text"
                value={metadata.seoTitle}
                onChange={(e) => onMetadataChange({ ...metadata, seoTitle: e.target.value })}
                placeholder="SEO optimized title..."
              />
              <p className="text-xs text-text-muted mt-1">
                {metadata.seoTitle.length}/60 characters
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Meta Description
              </label>
              <textarea
                value={metadata.metaDescription}
                onChange={(e) => onMetadataChange({ ...metadata, metaDescription: e.target.value })}
                placeholder="Meta description for search engines..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              />
              <p className="text-xs text-text-muted mt-1">
                {metadata.metaDescription.length}/160 characters
              </p>
            </div>

            {/* Focus Keyword */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Focus Keyword
              </label>
              <Input
                type="text"
                value={metadata.focusKeyword}
                onChange={(e) => onMetadataChange({ ...metadata, focusKeyword: e.target.value })}
                placeholder="Primary keyword for SEO..."
              />
            </div>
          </>
        )}

        {activeTab === 'social' && (
          <>
            {/* Social Title */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Social Media Title
              </label>
              <Input
                type="text"
                value={metadata.socialTitle}
                onChange={(e) => onMetadataChange({ ...metadata, socialTitle: e.target.value })}
                placeholder="Title for social media sharing..."
              />
            </div>

            {/* Social Description */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Social Media Description
              </label>
              <textarea
                value={metadata.socialDescription}
                onChange={(e) => onMetadataChange({ ...metadata, socialDescription: e.target.value })}
                placeholder="Description for social media sharing..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              />
            </div>

            {/* Social Image */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Social Media Image
              </label>
              <p className="text-xs text-text-muted mb-2">
                Recommended size: 1200x630px
              </p>
              {metadata.socialImage ? (
                <div className="relative group">
                  <Image
                    src={metadata.socialImage}
                    alt="Social media image"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      variant="ghost"
                      onClick={() => onMetadataChange({ ...metadata, socialImage: '' })}
                      className="text-white hover:bg-white hover:bg-opacity-20"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => document.getElementById('social-image-input').click()}
                  className="w-full h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary-50/50 transition-editorial"
                >
                  <Icon name="Upload" size={20} className="text-text-muted mb-1" />
                  <span className="text-xs text-text-muted">Upload social image</span>
                </div>
              )}
              <input
                id="social-image-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      onMetadataChange({ ...metadata, socialImage: event.target.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </div>
          </>
        )}

        {activeTab === 'advanced' && (
          <>
            {/* Publish Date */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Publish Date
              </label>
              <Input
                type="datetime-local"
                value={metadata.publishDate}
                onChange={(e) => onMetadataChange({ ...metadata, publishDate: e.target.value })}
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Author
              </label>
              <Input
                type="text"
                value={metadata.author}
                onChange={(e) => onMetadataChange({ ...metadata, author: e.target.value })}
                placeholder="Author name..."
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                value={metadata.status}
                onChange={(e) => onMetadataChange({ ...metadata, status: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="private">Private</option>
              </select>
            </div>

            {/* Allow Comments */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">
                Allow Comments
              </label>
              <input
                type="checkbox"
                checked={metadata.allowComments}
                onChange={(e) => onMetadataChange({ ...metadata, allowComments: e.target.checked })}
                className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Featured Post */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">
                Featured Post
              </label>
              <input
                type="checkbox"
                checked={metadata.featured}
                onChange={(e) => onMetadataChange({ ...metadata, featured: e.target.checked })}
                className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MetadataPanel;