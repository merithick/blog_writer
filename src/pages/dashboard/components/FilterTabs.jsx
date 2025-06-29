import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterTabs = ({ activeFilter, onFilterChange, counts }) => {
  const filters = [
    { id: 'all', label: 'All Posts', icon: 'FileText', count: counts.all },
    { id: 'published', label: 'Published', icon: 'CheckCircle', count: counts.published },
    { id: 'drafts', label: 'Drafts', icon: 'Clock', count: counts.drafts },
    { id: 'scheduled', label: 'Scheduled', icon: 'Calendar', count: counts.scheduled }
  ];

  return (
    <div className="border-b border-border-muted">
      <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-editorial ${
              activeFilter === filter.id
                ? 'border-primary text-primary-600' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-200'
            }`}
          >
            <Icon name={filter.icon} size={16} />
            <span>{filter.label}</span>
            {filter.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                activeFilter === filter.id
                  ? 'bg-primary-100 text-primary-700' :'bg-secondary-100 text-text-muted'
              }`}>
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default FilterTabs;