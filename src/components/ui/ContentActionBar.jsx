import React, { useState } from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const ContentActionBar = ({ 
  selectedItems = [], 
  totalItems = 0, 
  onSelectAll, 
  onDeselectAll, 
  onBulkDelete, 
  onBulkPublish, 
  onBulkArchive,
  onExport,
  context = 'posts' // 'posts', 'drafts', 'published'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const hasSelection = selectedItems.length > 0;
  const isAllSelected = selectedItems.length === totalItems && totalItems > 0;

  const handleSelectToggle = () => {
    if (isAllSelected) {
      onDeselectAll?.();
    } else {
      onSelectAll?.();
    }
  };

  const getContextActions = () => {
    const baseActions = [
      {
        label: 'Export',
        icon: 'Download',
        onClick: onExport,
        variant: 'ghost'
      }
    ];

    switch (context) {
      case 'drafts':
        return [
          {
            label: 'Publish',
            icon: 'Send',
            onClick: onBulkPublish,
            variant: 'primary'
          },
          {
            label: 'Delete',
            icon: 'Trash2',
            onClick: onBulkDelete,
            variant: 'ghost',
            className: 'text-error hover:text-error hover:bg-error-50'
          },
          ...baseActions
        ];
      
      case 'published':
        return [
          {
            label: 'Archive',
            icon: 'Archive',
            onClick: onBulkArchive,
            variant: 'ghost'
          },
          {
            label: 'Unpublish',
            icon: 'EyeOff',
            onClick: onBulkDelete,
            variant: 'ghost'
          },
          ...baseActions
        ];
      
      default:
        return [
          {
            label: 'Publish',
            icon: 'Send',
            onClick: onBulkPublish,
            variant: 'primary'
          },
          {
            label: 'Archive',
            icon: 'Archive',
            onClick: onBulkArchive,
            variant: 'ghost'
          },
          {
            label: 'Delete',
            icon: 'Trash2',
            onClick: onBulkDelete,
            variant: 'ghost',
            className: 'text-error hover:text-error hover:bg-error-50'
          },
          ...baseActions
        ];
    }
  };

  if (!isVisible || totalItems === 0) {
    return null;
  }

  return (
    <div className="sticky top-16 z-50 bg-surface border border-border rounded-lg shadow-editorial-lg mx-4 mb-4 animate-slide-in">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Selection Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectToggle}
              className="w-4 h-4 text-primary border-border rounded focus-ring"
            />
            <span className="text-sm font-medium text-text-primary">
              {hasSelection ? (
                <>
                  {selectedItems.length} of {totalItems} selected
                </>
              ) : (
                `Select all ${totalItems} items`
              )}
            </span>
          </div>

          {hasSelection && (
            <Button
              variant="ghost"
              onClick={onDeselectAll}
              className="text-xs text-text-secondary hover:text-text-primary"
            >
              Clear selection
            </Button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {hasSelection ? (
            <>
              {getContextActions().map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  onClick={action.onClick}
                  iconName={action.icon}
                  iconPosition="left"
                  size="sm"
                  className={action.className}
                >
                  {action.label}
                </Button>
              ))}
            </>
          ) : (
            <div className="flex items-center space-x-2 text-text-muted">
              <Icon name="Info" size={16} />
              <span className="text-sm">Select items to see available actions</span>
            </div>
          )}

          {/* Dismiss Button */}
          <Button
            variant="ghost"
            onClick={() => setIsVisible(false)}
            size="sm"
            className="ml-2"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      {hasSelection && (
        <div className="border-t border-border-muted px-4 py-2 bg-primary-50/50">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>
              {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-4">
              <span>Last updated: Just now</span>
              <span>•</span>
              <span>Ready for action</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentActionBar;