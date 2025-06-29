import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BlogSidebar = () => {
  const popularPosts = [
    {
      id: 1,
      title: "10 Essential React Hooks Every Developer Should Know",
      readTime: 5,
      views: 2840,
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Building Scalable APIs with Node.js and Express",
      readTime: 8,
      views: 1920,
      image: "https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.jpg?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use Which",
      readTime: 6,
      views: 1650,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "JavaScript Performance Optimization Techniques",
      readTime: 7,
      views: 1420,
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?w=300&h=200&fit=crop"
    }
  ];

  const tags = [
    { name: 'React', count: 45 },
    { name: 'JavaScript', count: 38 },
    { name: 'CSS', count: 32 },
    { name: 'Node.js', count: 28 },
    { name: 'Web Development', count: 52 },
    { name: 'Frontend', count: 41 },
    { name: 'Backend', count: 25 },
    { name: 'API', count: 19 },
    { name: 'Performance', count: 16 },
    { name: 'Design', count: 23 }
  ];

  const author = {
    name: "Sarah Chen",
    role: "Senior Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: `Passionate about creating beautiful, functional web experiences. 5+ years of experience in React, TypeScript, and modern web technologies.\n\nLoves sharing knowledge through writing and mentoring junior developers.`,
    stats: {
      posts: 47,
      followers: 1240,
      following: 89
    },
    social: {
      twitter: "@sarahchen_dev",
      github: "sarahchen",
      linkedin: "sarahchen-dev"
    }
  };

  const newsletter = {
    subscribers: 2840,
    frequency: "Weekly"
  };

  return (
    <aside className="space-y-8">
      {/* Author Bio */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-editorial">
        <div className="text-center mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 bg-secondary-100">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
          </div>
          <h3 className="font-heading text-lg font-semibold text-text-primary">
            {author.name}
          </h3>
          <p className="text-sm text-text-secondary font-caption">
            {author.role}
          </p>
        </div>

        <p className="text-sm text-text-secondary font-body mb-4 leading-relaxed">
          {author.bio.split('\n')[0]}
        </p>

        <div className="flex justify-center space-x-6 mb-4 text-sm">
          <div className="text-center">
            <p className="font-semibold text-text-primary">{author.stats.posts}</p>
            <p className="text-text-muted font-caption">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-text-primary">{author.stats.followers}</p>
            <p className="text-text-muted font-caption">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-text-primary">{author.stats.following}</p>
            <p className="text-text-muted font-caption">Following</p>
          </div>
        </div>

        <div className="flex justify-center space-x-3">
          <Button variant="ghost" size="sm">
            <Icon name="Twitter" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Github" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Linkedin" size={16} />
          </Button>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100 rounded-lg p-6">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Mail" size={24} color="white" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-text-primary">
            Stay Updated
          </h3>
          <p className="text-sm text-text-secondary font-body">
            Get the latest posts delivered right to your inbox
          </p>
        </div>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button variant="primary" fullWidth size="sm">
            Subscribe
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-text-muted">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{newsletter.subscribers} subscribers</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>{newsletter.frequency}</span>
          </div>
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-editorial">
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="TrendingUp" size={20} className="mr-2" />
          Popular Posts
        </h3>
        
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <div key={post.id} className="flex space-x-3 group cursor-pointer">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs font-semibold">
                  {index + 1}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-editorial line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center space-x-3 mt-1 text-xs text-text-muted">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{post.readTime}m</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{post.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" fullWidth size="sm" className="mt-4">
          View All Popular Posts
        </Button>
      </div>

      {/* Tags Cloud */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-editorial">
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Tag" size={20} className="mr-2" />
          Popular Tags
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.name}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-text-secondary hover:bg-primary-100 hover:text-primary-600 transition-editorial"
            >
              #{tag.name}
              <span className="ml-1 text-text-muted">({tag.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Archive */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-editorial">
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Archive" size={20} className="mr-2" />
          Archive
        </h3>
        
        <div className="space-y-2">
          {[
            { month: 'January 2024', count: 8 },
            { month: 'December 2023', count: 12 },
            { month: 'November 2023', count: 10 },
            { month: 'October 2023', count: 15 },
            { month: 'September 2023', count: 9 }
          ].map((archive) => (
            <button
              key={archive.month}
              className="flex items-center justify-between w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-editorial"
            >
              <span>{archive.month}</span>
              <span className="text-xs bg-secondary-100 text-text-muted px-2 py-1 rounded-full">
                {archive.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;