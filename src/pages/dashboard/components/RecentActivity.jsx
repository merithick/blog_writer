import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'published',
      title: 'Published "The Future of Web Development"',
      description: 'Your post is now live and receiving views',
      timestamp: '2 hours ago',
      icon: 'CheckCircle',
      color: 'text-success-600'
    },
    {
      id: 2,
      type: 'draft',
      title: 'Saved draft "React Best Practices"',
      description: 'Auto-saved your progress',
      timestamp: '4 hours ago',
      icon: 'Save',
      color: 'text-accent-600'
    },
    {
      id: 3,
      type: 'comment',
      title: 'New comment on "JavaScript Tips"',
      description: 'Sarah Johnson left a comment',
      timestamp: '6 hours ago',
      icon: 'MessageCircle',
      color: 'text-primary-600'
    },
    {
      id: 4,
      type: 'view',
      title: 'Milestone reached: 1,000 views',
      description: 'Your blog reached 1k total views',
      timestamp: '1 day ago',
      icon: 'TrendingUp',
      color: 'text-success-600'
    },
    {
      id: 5,
      type: 'scheduled',
      title: 'Post scheduled for tomorrow',
      description: '"CSS Grid Layout Guide" will be published',
      timestamp: '2 days ago',
      icon: 'Calendar',
      color: 'text-accent-600'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-editorial">
      <div className="p-6 border-b border-border-muted">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-semibold text-xl text-text-primary">Recent Activity</h2>
            <p className="text-text-secondary text-sm mt-1">Stay updated with your latest actions</p>
          </div>
          <Icon name="Activity" size={24} className="text-primary" />
        </div>
      </div>

      <div className="divide-y divide-border-muted">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6 hover:bg-surface transition-editorial">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full bg-surface flex items-center justify-center ${activity.color}`}>
                <Icon name={activity.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary text-sm">
                  {activity.title}
                </h3>
                <p className="text-text-secondary text-sm mt-1">
                  {activity.description}
                </p>
                <div className="flex items-center mt-2 text-xs text-text-muted">
                  <Icon name="Clock" size={12} className="mr-1" />
                  <span>{activity.timestamp}</span>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="MoreHorizontal" size={16} className="text-text-muted hover:text-text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-border-muted bg-surface/50">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium transition-editorial">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;