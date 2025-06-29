import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ 
  selectedFilters, 
  onFilterChange, 
  onClearAll,
  searchQuery,
  onSearchChange 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Posts' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Drafts' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'archived', label: 'Archived' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Design', label: 'Design' },
    { value: 'Business', label: 'Business' },
    { value: 'Lifestyle', label: 'Lifestyle' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'views', label: 'Most Views' },
    { value: 'updated', label: 'Recently Updated' }
  ];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedFilters.status !== 'all') count++;
    if (selectedFilters.category !== 'all') count++;
    if (selectedFilters.sort !== 'newest') count++;
    if (searchQuery) count++;
    return count;
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...selectedFilters,
      [filterType]: value
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-primary">Status:</span>
            <div className="flex flex-wrap gap-1">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('status', option.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-editorial ${
                    selectedFilters.status === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200 hover:text-text-primary'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-primary">Category:</span>
            <div className="flex flex-wrap gap-1">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange('category', option.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-editorial ${
                    selectedFilters.category === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200 hover:text-text-primary'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sort and Clear */}
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-text-muted" />
            <select
              value={selectedFilters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="bg-card border border-border rounded-md px-3 py-1 text-sm text-text-primary focus-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              iconName="X"
              iconPosition="left"
              className="text-text-secondary hover:text-text-primary"
            >
              Clear ({getActiveFiltersCount()})
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      {getActiveFiltersCount() > 0 && (
        <div className="mt-3 pt-3 border-t border-border-muted">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-text-muted">Active filters:</span>
            
            {selectedFilters.status !== 'all' && (
              <span className="bg-primary-100 text-primary-600 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <span>Status: {statusOptions.find(o => o.value === selectedFilters.status)?.label}</span>
                <button
                  onClick={() => handleFilterChange('status', 'all')}
                  className="hover:bg-primary-200 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {selectedFilters.category !== 'all' && (
              <span className="bg-accent-100 text-accent-600 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <span>Category: {selectedFilters.category}</span>
                <button
                  onClick={() => handleFilterChange('category', 'all')}
                  className="hover:bg-accent-200 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {searchQuery && (
              <span className="bg-secondary-100 text-text-secondary px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                <span>Search: "{searchQuery}"</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="hover:bg-secondary-200 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterChips;