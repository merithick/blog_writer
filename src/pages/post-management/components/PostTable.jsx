import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostTable = ({ 
  posts, 
  selectedPosts, 
  onSelectPost, 
  onSelectAll, 
  onEdit, 
  onDelete, 
  onPreview,
  onToggleStatus,
  sortConfig,
  onSort 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-success-100 text-success-600';
      case 'draft': return 'bg-secondary-100 text-secondary-600';
      case 'scheduled': return 'bg-accent-100 text-accent-600';
      case 'archived': return 'bg-error-100 text-error-600';
      default: return 'bg-secondary-100 text-secondary-600';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-600',
      'Design': 'bg-purple-100 text-purple-600',
      'Business': 'bg-green-100 text-green-600',
      'Lifestyle': 'bg-pink-100 text-pink-600',
      'Travel': 'bg-orange-100 text-orange-600'
    };
    return colors[category] || 'bg-secondary-100 text-secondary-600';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = selectedPosts.length === posts.length && posts.length > 0;
  const isIndeterminate = selectedPosts.length > 0 && selectedPosts.length < posts.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-editorial overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus-ring"
                />
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-text-primary">
                <button
                  onClick={() => onSort('title')}
                  className="flex items-center space-x-1 hover:text-primary transition-editorial"
                >
                  <span>Post</span>
                  <Icon name={getSortIcon('title')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-text-primary">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-1 hover:text-primary transition-editorial"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-text-primary">
                <button
                  onClick={() => onSort('category')}
                  className="flex items-center space-x-1 hover:text-primary transition-editorial"
                >
                  <span>Category</span>
                  <Icon name={getSortIcon('category')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-text-primary">
                <button
                  onClick={() => onSort('publishedAt')}
                  className="flex items-center space-x-1 hover:text-primary transition-editorial"
                >
                  <span>Date</span>
                  <Icon name={getSortIcon('publishedAt')} size={14} />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-text-primary">
                <button
                  onClick={() => onSort('views')}
                  className="flex items-center space-x-1 hover:text-primary transition-editorial"
                >
                  <span>Views</span>
                  <Icon name={getSortIcon('views')} size={14} />
                </button>
              </th>
              <th className="text-right px-4 py-3 text-sm font-medium text-text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-surface transition-editorial">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={(e) => onSelectPost(post.id, e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus-ring"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-text-primary truncate">
                        {post.title}
                      </h4>
                      <p className="text-sm text-text-secondary truncate">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-text-secondary">
                  {formatDate(post.publishedAt || post.updatedAt)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-1 text-sm text-text-secondary">
                    <Icon name="Eye" size={14} />
                    <span>{formatViews(post.views)}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPreview(post)}
                      iconName="Eye"
                      className="text-text-secondary hover:text-text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(post)}
                      iconName="Edit3"
                      className="text-text-secondary hover:text-text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(post)}
                      iconName="Trash2"
                      className="text-error hover:text-error hover:bg-error-50"
                    />
                    {post.status === 'draft' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleStatus(post)}
                        iconName="Send"
                        className="text-success hover:text-success hover:bg-success-50"
                      />
                    )}
                    {post.status === 'published' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleStatus(post)}
                        iconName="Archive"
                        className="text-accent hover:text-accent hover:bg-accent-50"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostTable;