import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success-50 border-success-100 text-success-600';
      case 'warning':
        return 'bg-warning-50 border-warning-100 text-warning-600';
      case 'accent':
        return 'bg-accent-50 border-accent-100 text-accent-600';
      default:
        return 'bg-primary-50 border-primary-100 text-primary-600';
    }
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success-600';
    if (changeType === 'negative') return 'text-error-600';
    return 'text-text-muted';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-editorial hover-scale transition-editorial">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">{value}</h3>
        <p className="text-text-secondary text-sm font-medium">{title}</p>
      </div>
    </div>
  );
};

export default MetricsCard;