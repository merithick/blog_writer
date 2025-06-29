import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ onCategoryChange, selectedCategory = 'all' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { id: 'all', label: 'All Posts', count: 124, color: 'bg-secondary-100 text-text-secondary' },
    { id: 'technology', label: 'Technology', count: 45, color: 'bg-blue-100 text-blue-600' },
    { id: 'design', label: 'Design', count: 32, color: 'bg-purple-100 text-purple-600' },
    { id: 'business', label: 'Business', count: 28, color: 'bg-green-100 text-green-600' },
    { id: 'lifestyle', label: 'Lifestyle', count: 19, color: 'bg-pink-100 text-pink-600' },
    { id: 'development', label: 'Development', count: 35, color: 'bg-indigo-100 text-indigo-600' },
    { id: 'marketing', label: 'Marketing', count: 22, color: 'bg-orange-100 text-orange-600' },
    { id: 'productivity', label: 'Productivity', count: 16, color: 'bg-teal-100 text-teal-600' }
  ];

  const visibleCategories = isExpanded ? categories : categories.slice(0, 5);

  const handleCategoryClick = (categoryId) => {
    onCategoryChange?.(categoryId);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          Browse by Category
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex items-center justify-between p-3 rounded-lg border transition-editorial hover:shadow-editorial ${
              selectedCategory === category.id
                ? 'border-primary bg-primary-50 shadow-editorial'
                : 'border-border bg-card hover:border-primary-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${category.color.split(' ')[0]}`}></div>
              <span className={`text-sm font-medium ${
                selectedCategory === category.id ? 'text-primary-600' : 'text-text-primary'
              }`}>
                {category.label}
              </span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              selectedCategory === category.id 
                ? 'bg-primary-100 text-primary-600' :'bg-secondary-100 text-text-muted'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-muted">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="FileText" size={16} />
            <span>Total: {categories.reduce((sum, cat) => sum + cat.count, 0)} posts</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={16} />
            <span>Updated daily</span>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" iconName="Filter">
          Advanced Filters
        </Button>
      </div>
    </div>
  );
};

export default CategoryFilter;