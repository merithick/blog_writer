import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Posts', count: 124 },
    { value: 'published', label: 'Published', count: 89 },
    { value: 'draft', label: 'Drafts', count: 23 },
    { value: 'scheduled', label: 'Scheduled', count: 8 },
    { value: 'archived', label: 'Archived', count: 4 }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories', count: 124 },
    { value: 'Technology', label: 'Technology', count: 45 },
    { value: 'Design', label: 'Design', count: 32 },
    { value: 'Business', label: 'Business', count: 28 },
    { value: 'Lifestyle', label: 'Lifestyle', count: 19 }
  ];

  const authorOptions = [
    { value: 'all', label: 'All Authors', count: 124 },
    { value: 'john-doe', label: 'John Doe', count: 67 },
    { value: 'jane-smith', label: 'Jane Smith', count: 34 },
    { value: 'mike-johnson', label: 'Mike Johnson', count: 23 }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status !== 'all') count++;
    if (filters.category !== 'all') count++;
    if (filters.author !== 'all') count++;
    if (filters.dateFrom || filters.dateTo) count++;
    return count;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:sticky top-16 left-0 h-full lg:h-auto w-80 bg-card border-r border-border shadow-editorial-lg lg:shadow-none z-50 lg:z-auto transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={20} className="text-primary" />
              <h3 className="font-heading font-semibold text-lg text-text-primary">
                Filters
              </h3>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-text-secondary hover:text-text-primary"
              >
                Clear
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="lg:hidden"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          {/* Status Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-text-primary mb-3">Status</h4>
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <label key={option.value} className="flex items-center justify-between cursor-pointer hover:bg-surface rounded-md p-2 transition-editorial">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={filters.status === option.value}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-4 h-4 text-primary border-border focus-ring"
                    />
                    <span className="text-sm text-text-primary">{option.label}</span>
                  </div>
                  <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded-full">
                    {option.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-text-primary mb-3">Category</h4>
            <div className="space-y-2">
              {categoryOptions.map((option) => (
                <label key={option.value} className="flex items-center justify-between cursor-pointer hover:bg-surface rounded-md p-2 transition-editorial">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="category"
                      value={option.value}
                      checked={filters.category === option.value}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-4 h-4 text-primary border-border focus-ring"
                    />
                    <span className="text-sm text-text-primary">{option.label}</span>
                  </div>
                  <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded-full">
                    {option.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Author Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-text-primary mb-3">Author</h4>
            <div className="space-y-2">
              {authorOptions.map((option) => (
                <label key={option.value} className="flex items-center justify-between cursor-pointer hover:bg-surface rounded-md p-2 transition-editorial">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="author"
                      value={option.value}
                      checked={filters.author === option.value}
                      onChange={(e) => handleFilterChange('author', e.target.value)}
                      className="w-4 h-4 text-primary border-border focus-ring"
                    />
                    <span className="text-sm text-text-primary">{option.label}</span>
                  </div>
                  <span className="text-xs text-text-muted bg-secondary-100 px-2 py-1 rounded-full">
                    {option.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-text-primary mb-3">Date Range</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-text-secondary mb-1">From</label>
                <Input
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">To</label>
                <Input
                  type="date"
                  value={filters.dateTo || ''}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mb-6">
            <h4 className="font-medium text-text-primary mb-3">Quick Filters</h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                fullWidth
                onClick={() => handleFilterChange('quickFilter', 'trending')}
                className="justify-start text-text-secondary hover:text-text-primary"
              >
                <Icon name="TrendingUp" size={16} className="mr-2" />
                Trending Posts
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => handleFilterChange('quickFilter', 'recent')}
                className="justify-start text-text-secondary hover:text-text-primary"
              >
                <Icon name="Clock" size={16} className="mr-2" />
                Recently Updated
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => handleFilterChange('quickFilter', 'popular')}
                className="justify-start text-text-secondary hover:text-text-primary"
              >
                <Icon name="Heart" size={16} className="mr-2" />
                Most Liked
              </Button>
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="primary"
              fullWidth
              onClick={onClose}
              iconName="Check"
              iconPosition="left"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;