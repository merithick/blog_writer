import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EditorHeader = ({ 
  title, 
  onTitleChange, 
  autoSaveStatus, 
  onSave, 
  onPreview, 
  onPublish,
  onSettings,
  isDarkMode,
  onThemeToggle 
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const getAutoSaveStatusColor = () => {
    switch (autoSaveStatus) {
      case 'saving': return 'text-warning';
      case 'saved': return 'text-success';
      case 'error': return 'text-error';
      default: return 'text-text-muted';
    }
  };

  const getAutoSaveText = () => {
    switch (autoSaveStatus) {
      case 'saving': return 'Saving...';
      case 'saved': return 'All changes saved';
      case 'error': return 'Save failed';
      default: return 'Draft';
    }
  };

  return (
    <header className="sticky top-0 z-navigation bg-card border-b border-border shadow-editorial">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left Section - Back & Title */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <Link 
            to="/dashboard" 
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface transition-editorial focus-ring"
          >
            <Icon name="ArrowLeft" size={20} />
          </Link>
          
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Untitled Post"
              className="w-full bg-transparent text-lg font-heading font-semibold text-text-primary placeholder-text-muted border-none outline-none focus:ring-0 p-0"
            />
            <div className={`flex items-center space-x-2 mt-1 text-sm ${getAutoSaveStatusColor()}`}>
              {autoSaveStatus === 'saving' && (
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>{getAutoSaveText()}</span>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" onClick={onSave} iconName="Save" size="sm">
              Save
            </Button>
            <Button variant="outline" onClick={onPreview} iconName="Eye" size="sm">
              Preview
            </Button>
            <Button variant="primary" onClick={onPublish} iconName="Send" size="sm">
              Publish
            </Button>
          </div>

          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            onClick={onThemeToggle}
            className="hidden sm:flex"
          >
            <Icon name={isDarkMode ? "Sun" : "Moon"} size={18} />
          </Button>

          {/* Settings Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <Icon name="MoreVertical" size={20} />
            </Button>

            {isSettingsOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-editorial-lg z-dropdown animate-fade-in">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onSettings();
                      setIsSettingsOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-editorial"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Editor Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      onThemeToggle();
                      setIsSettingsOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-editorial sm:hidden"
                  >
                    <Icon name={isDarkMode ? "Sun" : "Moon"} size={16} />
                    <span>Toggle Theme</span>
                  </button>
                  <div className="border-t border-border-muted mt-1 pt-1">
                    <button
                      onClick={() => {
                        // Version history functionality
                        setIsSettingsOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-editorial"
                    >
                      <Icon name="History" size={16} />
                      <span>Version History</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Action Bar */}
      <div className="md:hidden border-t border-border-muted px-4 py-2">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onSave} iconName="Save" size="sm">
            Save
          </Button>
          <Button variant="outline" onClick={onPreview} iconName="Eye" size="sm">
            Preview
          </Button>
          <Button variant="primary" onClick={onPublish} iconName="Send" size="sm">
            Publish
          </Button>
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;