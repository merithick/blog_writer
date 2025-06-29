import React, { useState } from 'react';
import BlogCard from './BlogCard';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BlogGrid = ({ selectedCategory = 'all' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const postsPerPage = 9;

  const allPosts = [
    {
      id: 1,
      title: "Building Modern React Applications with TypeScript",
      excerpt: `Learn how to leverage TypeScript's powerful type system to build more robust and maintainable React applications. This comprehensive guide covers best practices, common patterns, and advanced techniques.\n\nDiscover how to set up your development environment, configure TypeScript for React, and implement type-safe components that scale with your application.`,
      author: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-01-20T14:30:00Z",
      readTime: 12,
      category: "Technology",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=800&h=600&fit=crop",
      likes: 89,
      comments: 23,
      tags: ["React", "TypeScript", "Frontend"]
    },
    {
      id: 2,
      title: "The Art of Minimalist Web Design",
      excerpt: `Explore the principles of minimalist design and how to apply them to create clean, effective web interfaces. Less is more when done right.\n\nThis guide walks through real-world examples and provides actionable tips for creating designs that focus on what truly matters.`,
      author: {
        name: "Emma Thompson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-01-18T10:15:00Z",
      readTime: 8,
      category: "Design",
      image: "https://images.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg?w=800&h=600&fit=crop",
      likes: 156,
      comments: 34,
      tags: ["Design", "UI/UX", "Minimalism"]
    },
    {
      id: 3,
      title: "Scaling Your Startup: Lessons from the Trenches",
      excerpt: `Real-world insights from entrepreneurs who've successfully scaled their startups from idea to IPO. Learn from their mistakes and victories.\n\nThis comprehensive guide covers everything from team building and fundraising to product development and market expansion strategies.`,
      author: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-01-16T16:45:00Z",
      readTime: 15,
      category: "Business",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
      likes: 203,
      comments: 67,
      tags: ["Business", "Startup", "Entrepreneurship"]
    },
    {
      id: 4,
      title: "Mastering CSS Grid: A Complete Guide",
      excerpt: `CSS Grid revolutionized web layout. Master this powerful tool with practical examples and real-world use cases that will transform your frontend skills.\n\nFrom basic grid concepts to advanced techniques, this guide provides everything you need to become proficient with CSS Grid.`,
      author: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-01-14T09:20:00Z",
      readTime: 10,
      category: "Technology",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?w=800&h=600&fit=crop",
      likes: 127,
      comments: 19,
      tags: ["CSS", "Web Development", "Frontend"]
    },
    {
      id: 5,
      title: "The Psychology of Color in Digital Design",
      excerpt: `Understanding how colors affect user behavior and emotions can dramatically improve your design effectiveness. Dive deep into color psychology.\n\nLearn how to choose the right color palettes for different industries, audiences, and design goals to create more impactful user experiences.`,
      author: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-01-12T13:10:00Z",
      readTime: 7,
      category: "Design",
      image: "https://images.pixabay.com/photo/2017/05/10/19/29/color-2301118_1280.jpg?w=800&h=600&fit=crop",
      likes: 94,
      comments: 28,
      tags: ["Design", "Psychology", "Color Theory"]
    },
    {
      id: 6,
      title: "Building a Personal Brand in Tech",
      excerpt: `Your personal brand is your most valuable asset in the tech industry. Learn how to build, maintain, and leverage it for career growth.\n\nThis guide covers everything from social media presence and content creation to networking and thought leadership in the tech community.`,
      author: {
        name: "Lisa Garcia",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-01-10T11:30:00Z",
      readTime: 9,
      category: "Business",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop",
      likes: 178,
      comments: 45,
      tags: ["Career", "Personal Branding", "Tech"]
    },
    {
      id: 7,
      title: "The Future of Remote Work Culture",
      excerpt: `Remote work is here to stay. Explore how companies are adapting their culture and processes for a distributed workforce.\n\nDiscover best practices for remote team management, communication tools, and maintaining company culture in a virtual environment.`,
      author: {
        name: "James Miller",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-01-08T15:45:00Z",
      readTime: 11,
      category: "Lifestyle",
      image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?w=800&h=600&fit=crop",
      likes: 142,
      comments: 52,
      tags: ["Remote Work", "Culture", "Productivity"]
    },
    {
      id: 8,
      title: "API Design Best Practices for 2024",
      excerpt: `Building APIs that developers love requires careful planning and attention to detail. Learn the latest best practices and standards.\n\nThis comprehensive guide covers REST, GraphQL, authentication, versioning, and documentation strategies for modern API development.`,
      author: {
        name: "Rachel Kim",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-01-06T12:20:00Z",
      readTime: 13,
      category: "Technology",
      image: "https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.jpg?w=800&h=600&fit=crop",
      likes: 165,
      comments: 31,
      tags: ["API", "Backend", "Development"]
    },
    {
      id: 9,
      title: "Sustainable Living in the Digital Age",
      excerpt: `How can we reduce our environmental impact while embracing technology? Practical tips for eco-friendly digital habits.\n\nExplore ways to minimize your digital carbon footprint, choose sustainable tech products, and build environmentally conscious habits.`,
      author: {
        name: "Tom Anderson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-01-04T08:15:00Z",
      readTime: 6,
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
      likes: 87,
      comments: 16,
      tags: ["Sustainability", "Environment", "Technology"]
    },
    {
      id: 10,
      title: "Advanced React Patterns and Performance",
      excerpt: `Take your React skills to the next level with advanced patterns, optimization techniques, and performance best practices.\n\nLearn about render props, higher-order components, custom hooks, and modern optimization strategies for large-scale applications.`,
      author: {
        name: "Kevin Zhang",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      publishedAt: "2024-01-02T14:00:00Z",
      readTime: 16,
      category: "Technology",
      image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?w=800&h=600&fit=crop",
      likes: 234,
      comments: 78,
      tags: ["React", "Performance", "Advanced"]
    }
  ];

  // Filter posts by category
  const filteredPosts = selectedCategory === 'all' 
    ? allPosts 
    : allPosts.filter(post => post.category.toLowerCase() === selectedCategory);

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.likes + b.comments) - (a.likes + a.comments);
      case 'oldest':
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      case 'latest':
      default:
        return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Header with Sort Options */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-text-primary">
            {selectedCategory === 'all' ? 'All Posts' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Posts`}
          </h2>
          <p className="text-text-secondary font-body">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-text-muted" />
            <span className="text-sm text-text-secondary font-caption">Sort by:</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-surface border border-border rounded-lg p-1">
            {[
              { value: 'latest', label: 'Latest' },
              { value: 'popular', label: 'Popular' },
              { value: 'oldest', label: 'Oldest' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-editorial ${
                  sortBy === option.value
                    ? 'bg-primary text-primary-foreground shadow-editorial'
                    : 'text-text-secondary hover:text-text-primary hover:bg-card'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post (First post on first page) */}
      {currentPage === 1 && currentPosts.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Star" size={20} className="text-accent" />
            <h3 className="font-heading text-lg font-semibold text-text-primary">Featured Article</h3>
          </div>
          <BlogCard post={currentPosts[0]} variant="featured" />
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.slice(currentPage === 1 ? 1 : 0).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Empty State */}
      {currentPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} className="text-text-muted" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
            No posts found
          </h3>
          <p className="text-text-secondary font-body mb-6">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Reset Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-8">
          <Button
            variant="ghost"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-editorial ${
                  currentPage === page
                    ? 'bg-primary text-primary-foreground shadow-editorial'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      )}

      {/* Load More Alternative */}
      {totalPages > 1 && currentPage < totalPages && (
        <div className="text-center pt-8 border-t border-border-muted">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            iconName="Plus"
            iconPosition="left"
            size="lg"
          >
            Load More Articles
          </Button>
          <p className="text-sm text-text-muted mt-2 font-caption">
            Showing {startIndex + currentPosts.length} of {filteredPosts.length} articles
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;