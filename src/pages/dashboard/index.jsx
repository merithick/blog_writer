import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ManagementHeader from '../../components/ui/ManagementHeader';
import MetricsCard from './components/MetricsCard';
import PostCard from './components/PostCard';
import FilterTabs from './components/FilterTabs';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import UpcomingScheduled from './components/UpcomingScheduled';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);

  // Mock data for dashboard metrics
  const metrics = [
    {
      title: 'Total Posts',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: 'FileText',
      color: 'primary'
    },
    {
      title: 'Published',
      value: '18',
      change: '+8%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      title: 'Drafts',
      value: '6',
      change: '+4',
      changeType: 'neutral',
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: 'Monthly Views',
      value: '12.5k',
      change: '+23%',
      changeType: 'positive',
      icon: 'Eye',
      color: 'accent'
    }
  ];

  // Mock data for recent posts
  const mockPosts = [
    {
      id: 1,
      title: 'Getting Started with React 18: A Comprehensive Guide',
      excerpt: 'Learn the latest features and improvements in React 18, including concurrent rendering, automatic batching, and new hooks.',
      featuredImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
      status: 'published',
      category: 'Technology',
      tags: ['react', 'javascript', 'frontend'],
      views: 2847,
      comments: 23,
      likes: 156,
      createdAt: '2024-12-20T10:30:00Z',
      publishedAt: '2024-12-20T14:00:00Z'
    },
    {
      id: 2,
      title: 'Building Scalable Web Applications with Modern Architecture',
      excerpt: 'Explore best practices for creating maintainable and scalable web applications using modern development patterns.',
      featuredImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=600&h=400&fit=crop',
      status: 'draft',
      category: 'Development',
      tags: ['architecture', 'scalability', 'web-development'],
      views: 0,
      comments: 0,
      likes: 0,
      createdAt: '2024-12-22T09:15:00Z'
    },
    {
      id: 3,
      title: 'The Future of CSS: New Features and Techniques',
      excerpt: 'Discover the latest CSS features that are changing how we style web applications, from container queries to cascade layers.',
      featuredImage: 'https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_960_720.jpg?w=600&h=400&fit=crop',
      status: 'scheduled',
      category: 'Design',
      tags: ['css', 'styling', 'web-design'],
      views: 0,
      comments: 0,
      likes: 0,
      createdAt: '2024-12-23T16:45:00Z',
      scheduledAt: '2024-12-28T10:00:00Z'
    },
    {
      id: 4,
      title: 'JavaScript Performance Optimization Tips',
      excerpt: 'Learn practical techniques to improve your JavaScript application performance and user experience.',
      featuredImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop',
      status: 'published',
      category: 'Performance',
      tags: ['javascript', 'performance', 'optimization'],
      views: 1923,
      comments: 18,
      likes: 89,
      createdAt: '2024-12-18T11:20:00Z',
      publishedAt: '2024-12-19T08:30:00Z'
    },
    {
      id: 5,
      title: 'Understanding TypeScript: From Basics to Advanced',
      excerpt: 'A complete guide to TypeScript covering everything from basic types to advanced patterns and best practices.',
      featuredImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?w=600&h=400&fit=crop',
      status: 'draft',
      category: 'Programming',
      tags: ['typescript', 'javascript', 'programming'],
      views: 0,
      comments: 0,
      likes: 0,
      createdAt: '2024-12-21T14:10:00Z'
    },
    {
      id: 6,
      title: 'Responsive Web Design Best Practices',
      excerpt: 'Master the art of creating websites that work perfectly across all devices and screen sizes.',
      featuredImage: 'https://images.pixabay.com/photo/2016/11/29/06/15/plans-1867745_960_720.jpg?w=600&h=400&fit=crop',
      status: 'published',
      category: 'Design',
      tags: ['responsive', 'css', 'mobile-first'],
      views: 3156,
      comments: 31,
      likes: 203,
      createdAt: '2024-12-15T13:25:00Z',
      publishedAt: '2024-12-16T09:00:00Z'
    }
  ];

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'published') return post.status === 'published';
    if (activeFilter === 'drafts') return post.status === 'draft';
    if (activeFilter === 'scheduled') return post.status === 'scheduled';
    return true;
  });

  const postCounts = {
    all: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    drafts: posts.filter(p => p.status === 'draft').length,
    scheduled: posts.filter(p => p.status === 'scheduled').length
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleEditPost = (postId) => {
    navigate(`/post-editor?id=${postId}`);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handlePreviewPost = (postId) => {
    navigate(`/published-blog-view?preview=${postId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <ManagementHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading text-3xl font-bold text-text-primary">
                Welcome back, John! 👋
              </h1>
              <p className="text-text-secondary mt-2">
                Here's what's happening with your blog today.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={handleRefresh}
                disabled={isRefreshing}
                iconName={isRefreshing ? "Loader2" : "RefreshCw"}
                iconPosition="left"
                className={isRefreshing ? "animate-spin" : ""}
              >
                Refresh
              </Button>
              
              <Link to="/post-editor">
                <Button
                  variant="primary"
                  iconName="Plus"
                  iconPosition="left"
                >
                  New Post
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              color={metric.color}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Posts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <QuickActions />

            {/* Posts Section */}
            <div className="bg-card border border-border rounded-lg shadow-editorial">
              <div className="p-6 border-b border-border-muted">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading font-semibold text-xl text-text-primary">Your Posts</h2>
                    <p className="text-text-secondary text-sm mt-1">
                      Manage and organize your content
                    </p>
                  </div>
                  <Link to="/post-management">
                    <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
                      Manage All
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Filter Tabs */}
              <FilterTabs
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={postCounts}
              />

              {/* Posts Grid */}
              <div className="p-6">
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.slice(0, 4).map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                        onPreview={handlePreviewPost}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
                    <h3 className="font-heading font-medium text-text-primary mb-2">
                      No posts found
                    </h3>
                    <p className="text-text-secondary text-sm mb-4">
                      {activeFilter === 'all' 
                        ? "Start creating your first blog post"
                        : `No ${activeFilter} posts available`
                      }
                    </p>
                    <Link to="/post-editor">
                      <Button variant="primary" iconName="Plus" iconPosition="left">
                        Create Your First Post
                      </Button>
                    </Link>
                  </div>
                )}

                {filteredPosts.length > 4 && (
                  <div className="mt-6 text-center">
                    <Link to="/post-management">
                      <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
                        View All {filteredPosts.length} Posts
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Scheduled Posts */}
            <UpcomingScheduled />
            
            {/* Recent Activity */}
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;