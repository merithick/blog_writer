import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const actions = [
    {
      title: 'Create New Post',
      description: 'Start writing your next blog post',
      icon: 'PenTool',
      variant: 'primary',
      to: '/post-editor',
      featured: true
    },
    {
      title: 'Import Content',
      description: 'Import posts from other platforms',
      icon: 'Upload',
      variant: 'ghost',
      to: '/post-management'
    },
    {
      title: 'View Analytics',
      description: 'Check your blog performance',
      icon: 'BarChart3',
      variant: 'ghost',
      to: '/dashboard'
    },
    {
      title: 'Manage Posts',
      description: 'Organize and edit your content',
      icon: 'Settings',
      variant: 'ghost',
      to: '/post-management'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-editorial">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-text-primary">Quick Actions</h2>
          <p className="text-text-secondary text-sm mt-1">Get started with your content creation</p>
        </div>
        <Icon name="Zap" size={24} className="text-accent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.to}
            className={`group block p-4 rounded-lg border transition-editorial hover-scale ${
              action.featured
                ? 'bg-primary-50 border-primary-200 hover:bg-primary-100' :'bg-surface border-border hover:bg-secondary-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                action.featured
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary-100 text-text-secondary group-hover:bg-secondary-200'
              }`}>
                <Icon name={action.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium text-sm ${
                  action.featured ? 'text-primary-700' : 'text-text-primary'
                }`}>
                  {action.title}
                </h3>
                <p className={`text-xs mt-1 ${
                  action.featured ? 'text-primary-600' : 'text-text-secondary'
                }`}>
                  {action.description}
                </p>
              </div>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className={`transition-transform group-hover:translate-x-1 ${
                  action.featured ? 'text-primary-600' : 'text-text-muted'
                }`} 
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border-muted">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Need help getting started?
          </div>
          <Button variant="ghost" size="sm" iconName="HelpCircle" iconPosition="left">
            View Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;