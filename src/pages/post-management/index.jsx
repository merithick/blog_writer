import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManagementHeader from '../../components/ui/ManagementHeader';
import ContentActionBar from '../../components/ui/ContentActionBar';
import FilterChips from './components/FilterChips';
import FilterSidebar from './components/FilterSidebar';
import PostCard from './components/PostCard';
import PostTable from './components/PostTable';
import PostPreviewModal from './components/PostPreviewModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const PostManagement = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [previewPost, setPreviewPost] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    author: 'all',
    sort: 'newest',
    dateFrom: '',
    dateTo: '',
    quickFilter: ''
  });

  const [sortConfig, setSortConfig] = useState({
    key: 'publishedAt',
    direction: 'desc'
  });

  // Mock data for posts
  const mockPosts = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence in Web Development",
      excerpt: "Exploring how AI is revolutionizing the way we build and design websites, from automated code generation to intelligent user experiences.",
      content: `<p>Artificial Intelligence is transforming the landscape of web development in unprecedented ways. From automated code generation to intelligent user experience optimization, AI tools are becoming indispensable for modern developers.</p>

<h2>Key Areas of AI Impact</h2>
<p>AI is making significant contributions across multiple aspects of web development:</p>

<h3>1. Code Generation and Assistance</h3>
<p>Tools like GitHub Copilot and ChatGPT are helping developers write code faster and more efficiently. These AI assistants can generate entire functions, suggest optimizations, and even help debug complex issues.</p>

<h3>2. Design and User Experience</h3>
<p>AI-powered design tools are enabling developers to create more intuitive and personalized user experiences. Machine learning algorithms can analyze user behavior patterns to optimize layouts and content placement.</p>

<h3>3. Testing and Quality Assurance</h3>
<p>Automated testing powered by AI can identify potential issues before they reach production, significantly improving code quality and reducing development time.</p>

<p>As we move forward, the integration of AI in web development will only deepen, making it essential for developers to adapt and embrace these new technologies.</p>`,
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      status: 'published',
      category: 'Technology',
      author: 'John Doe',
      publishedAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      views: 2847,
      likes: 156,
      comments: 23,
      shares: 45,
      readTime: 8,
      wordCount: 1250,
      tags: ['AI', 'Web Development', 'Technology', 'Future']
    },
    {
      id: 2,
      title: "Mastering Modern CSS Grid Layout Techniques",
      excerpt: "A comprehensive guide to CSS Grid, covering advanced layout patterns and real-world applications for responsive web design.",
      content: `<p>CSS Grid has revolutionized how we approach web layouts, offering unprecedented control over both rows and columns. This comprehensive guide will take you through advanced techniques that will elevate your web design skills.</p>

<h2>Understanding Grid Fundamentals</h2>
<p>Before diving into advanced techniques, it's crucial to understand the core concepts of CSS Grid:</p>

<h3>Grid Container and Items</h3>
<p>The grid container is the parent element that establishes the grid context, while grid items are the direct children that get placed within the grid.</p>

<h3>Grid Lines and Areas</h3>
<p>Grid lines define the boundaries of grid tracks, and grid areas are rectangular spaces bounded by four grid lines.</p>

<h2>Advanced Layout Patterns</h2>
<p>Let's explore some sophisticated layout patterns that showcase the power of CSS Grid:</p>

<h3>1. Asymmetric Layouts</h3>
<p>Create visually interesting designs by breaking away from traditional symmetric layouts using fractional units and span keywords.</p>

<h3>2. Responsive Grid Systems</h3>
<p>Build flexible grid systems that adapt seamlessly across different screen sizes without media queries.</p>

<p>CSS Grid continues to evolve, and mastering these techniques will give you a significant advantage in creating modern, responsive web layouts.</p>`,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      status: 'draft',
      category: 'Design',
      author: 'Jane Smith',
      publishedAt: null,
      updatedAt: '2024-01-14T15:30:00Z',
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      readTime: 12,
      wordCount: 1850,
      tags: ['CSS', 'Grid', 'Layout', 'Responsive Design']
    },
    {
      id: 3,
      title: "Building Scalable React Applications with TypeScript",
      excerpt: "Learn best practices for structuring large-scale React applications using TypeScript for better maintainability and developer experience.",
      content: `<p>Building scalable React applications requires careful planning and the right tools. TypeScript has emerged as the go-to solution for adding type safety and improving developer experience in React projects.</p>

<h2>Why TypeScript for React?</h2>
<p>TypeScript brings several advantages to React development:</p>

<h3>Type Safety</h3>
<p>Catch errors at compile time rather than runtime, reducing bugs and improving code reliability.</p>

<h3>Better Developer Experience</h3>
<p>Enhanced IDE support with intelligent autocomplete, refactoring tools, and inline documentation.</p>

<h3>Self-Documenting Code</h3>
<p>Types serve as documentation, making it easier for team members to understand component interfaces.</p>

<h2>Project Structure Best Practices</h2>
<p>Organizing your TypeScript React project properly is crucial for long-term maintainability:</p>

<h3>1. Feature-Based Organization</h3>
<p>Group related components, hooks, and utilities by feature rather than by file type.</p>

<h3>2. Shared Type Definitions</h3>
<p>Create a centralized location for shared types and interfaces that are used across multiple components.</p>

<h3>3. Custom Hooks</h3>
<p>Extract complex logic into custom hooks with proper TypeScript typing for reusability.</p>

<p>By following these practices, you'll create React applications that are not only scalable but also maintainable and enjoyable to work with.</p>`,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      status: 'scheduled',category: 'Technology',author: 'Mike Johnson',publishedAt: '2024-01-20T09:00:00Z',updatedAt: '2024-01-13T11:45:00Z',
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      readTime: 15,
      wordCount: 2100,
      tags: ['React', 'TypeScript', 'Scalability', 'Best Practices']
    },
    {
      id: 4,
      title: "The Art of Minimalist Web Design",
      excerpt: "Discover how minimalist design principles can create powerful user experiences while improving website performance and accessibility.",
      content: `<p>Minimalist web design is more than just a trend—it's a philosophy that prioritizes user experience through simplicity and clarity. By removing unnecessary elements, we can create websites that are not only beautiful but also highly functional.</p>

<h2>Core Principles of Minimalist Design</h2>
<p>Understanding these fundamental principles will help you create effective minimalist designs:</p>

<h3>1. Less is More</h3>
<p>Every element on the page should serve a purpose. Remove anything that doesn't contribute to the user's goals.</p>

<h3>2. White Space is Your Friend</h3>
<p>Strategic use of white space improves readability and creates visual hierarchy without adding clutter.</p>

<h3>3. Typography as a Design Element</h3>
<p>In minimalist design, typography often carries the visual weight. Choose fonts carefully and use them consistently.</p>

<h2>Benefits of Minimalist Approach</h2>
<p>Adopting minimalist design principles offers several advantages:</p>

<h3>Improved Performance</h3>
<p>Fewer elements mean faster loading times and better performance across all devices.</p>

<h3>Enhanced Accessibility</h3>
<p>Simple layouts are easier to navigate for users with disabilities and assistive technologies.</p>

<h3>Timeless Appeal</h3>
<p>Minimalist designs age well and require fewer updates to stay current.</p>

<p>Remember, minimalism doesn't mean boring. It means intentional—every design decision should be purposeful and contribute to the overall user experience.</p>`,
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop",
      status: 'published',category: 'Design',author: 'Sarah Wilson',publishedAt: '2024-01-12T14:20:00Z',updatedAt: '2024-01-12T14:20:00Z',
      views: 1923,
      likes: 89,
      comments: 15,
      shares: 32,
      readTime: 10,
      wordCount: 1450,
      tags: ['Minimalism', 'Web Design', 'UX', 'Performance']
    },
    {
      id: 5,
      title: "Digital Marketing Strategies for Small Businesses",
      excerpt: "Effective digital marketing tactics that small businesses can implement on a budget to compete with larger competitors.",
      content: `<p>Small businesses face unique challenges in the digital marketing landscape. With limited budgets and resources, it's crucial to focus on strategies that deliver maximum impact and measurable results.</p>

<h2>Foundation: Understanding Your Audience</h2>
<p>Before implementing any marketing strategy, you must understand your target audience:</p>

<h3>Customer Personas</h3>
<p>Create detailed profiles of your ideal customers, including demographics, pain points, and preferred communication channels.</p>

<h3>Competitive Analysis</h3>
<p>Study your competitors to identify gaps in the market and opportunities for differentiation.</p>

<h2>Cost-Effective Digital Marketing Strategies</h2>
<p>Here are proven strategies that small businesses can implement without breaking the bank:</p>

<h3>1. Content Marketing</h3>
<p>Create valuable, relevant content that addresses your audience's needs and establishes your expertise.</p>

<h3>2. Social Media Marketing</h3>
<p>Focus on platforms where your audience is most active rather than trying to be everywhere.</p>

<h3>3. Email Marketing</h3>
<p>Build and nurture relationships with your audience through targeted email campaigns.</p>

<h3>4. Local SEO</h3>
<p>Optimize your online presence for local searches to attract nearby customers.</p>

<h2>Measuring Success</h2>
<p>Track key metrics that align with your business goals:</p>
<ul>
<li>Website traffic and engagement</li>
<li>Lead generation and conversion rates</li>
<li>Customer acquisition cost</li>
<li>Return on investment (ROI)</li>
</ul>

<p>Remember, digital marketing is a marathon, not a sprint. Consistency and patience are key to building a strong online presence that drives business growth.</p>`,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      status: 'published',category: 'Business',author: 'David Chen',publishedAt: '2024-01-10T16:00:00Z',updatedAt: '2024-01-10T16:00:00Z',
      views: 3156,
      likes: 201,
      comments: 34,
      shares: 67,
      readTime: 11,
      wordCount: 1650,
      tags: ['Digital Marketing', 'Small Business', 'SEO', 'Social Media']
    },
    {
      id: 6,
      title: "Sustainable Living: Simple Changes for a Better Tomorrow",
      excerpt: "Practical tips and lifestyle changes that anyone can adopt to reduce their environmental impact and live more sustainably.",
      content: `<p>Living sustainably doesn't require drastic lifestyle changes or significant financial investment. Small, consistent actions can make a meaningful difference for our planet while often saving money and improving quality of life.</p>

<h2>Starting Your Sustainable Journey</h2>
<p>The key to sustainable living is starting small and building habits gradually:</p>

<h3>Assess Your Current Impact</h3>
<p>Understanding your current environmental footprint helps identify areas for improvement.</p>

<h3>Set Realistic Goals</h3>
<p>Choose achievable targets that fit your lifestyle and circumstances.</p>

<h2>Simple Changes with Big Impact</h2>
<p>Here are practical changes you can implement immediately:</p>

<h3>1. Reduce Energy Consumption</h3>
<p>Switch to LED bulbs, unplug devices when not in use, and optimize your home's heating and cooling.</p>

<h3>2. Minimize Waste</h3>
<p>Embrace the 3 R's: Reduce, Reuse, and Recycle. Focus on reducing consumption first.</p>

<h3>3. Choose Sustainable Transportation</h3>
<p>Walk, bike, use public transport, or carpool when possible. Consider electric or hybrid vehicles for your next purchase.</p>

<h3>4. Support Sustainable Brands</h3>
<p>Research companies' environmental practices and choose brands that align with your values.</p>

<h2>The Ripple Effect</h2>
<p>Your sustainable choices inspire others and contribute to larger environmental movements. Share your journey and encourage friends and family to join you.</p>

<p>Remember, perfection isn't the goal—progress is. Every small action contributes to a more sustainable future for all.</p>`,
      thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
      status: 'archived',
      category: 'Lifestyle',
      author: 'Emma Rodriguez',
      publishedAt: '2024-01-08T12:30:00Z',
      updatedAt: '2024-01-08T12:30:00Z',
      views: 1456,
      likes: 78,
      comments: 19,
      shares: 28,
      readTime: 9,
      wordCount: 1320,
      tags: ['Sustainability', 'Environment', 'Lifestyle', 'Green Living']
    }
  ];

  // Filter and sort posts
  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filters.status === 'all' || post.status === filters.status;
    const matchesCategory = filters.category === 'all' || post.category === filters.category;
    
    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => {
    switch (filters.sort) {
      case 'oldest':
        return new Date(a.publishedAt || a.updatedAt) - new Date(b.publishedAt || b.updatedAt);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'views':
        return b.views - a.views;
      case 'updated':
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      default: // newest
        return new Date(b.publishedAt || b.updatedAt) - new Date(a.publishedAt || a.updatedAt);
    }
  });

  // Pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Handlers
  const handleSelectPost = (postId, isSelected) => {
    if (isSelected) {
      setSelectedPosts([...selectedPosts, postId]);
    } else {
      setSelectedPosts(selectedPosts.filter(id => id !== postId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedPosts(currentPosts.map(post => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleBulkDelete = () => {
    console.log('Bulk delete posts:', selectedPosts);
    setSelectedPosts([]);
  };

  const handleBulkPublish = () => {
    console.log('Bulk publish posts:', selectedPosts);
    setSelectedPosts([]);
  };

  const handleBulkArchive = () => {
    console.log('Bulk archive posts:', selectedPosts);
    setSelectedPosts([]);
  };

  const handleExport = () => {
    console.log('Export posts:', selectedPosts.length > 0 ? selectedPosts : 'all');
  };

  const handleEditPost = (post) => {
    navigate('/post-editor', { state: { post } });
  };

  const handleDeletePost = (post) => {
    console.log('Delete post:', post.id);
  };

  const handlePreviewPost = (post) => {
    setPreviewPost(post);
    setIsPreviewModalOpen(true);
  };

  const handleToggleStatus = (post) => {
    console.log('Toggle status for post:', post.id);
  };

  const handleSort = (column) => {
    const direction = sortConfig.key === column && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key: column, direction });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      author: 'all',
      sort: 'newest',
      dateFrom: '',
      dateTo: '',
      quickFilter: ''
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <ManagementHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading font-bold text-3xl text-text-primary mb-2">
                Post Management
              </h1>
              <p className="text-text-secondary">
                Manage all your blog posts, drafts, and published content in one place
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => setIsFilterSidebarOpen(true)}
                iconName="Filter"
                iconPosition="left"
                className="lg:hidden"
              >
                Filters
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/post-editor')}
                iconName="Plus"
                iconPosition="left"
              >
                New Post
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search and View Controls */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search posts, titles, tags..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-10 pr-4"
                    />
                    <Icon
                      name="Search"
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">
                    {totalPosts} posts
                  </span>
                  <div className="flex items-center bg-surface border border-border rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="px-3"
                    >
                      <Icon name="Grid3X3" size={16} />
                    </Button>
                    <Button
                      variant={viewMode === 'table' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className="px-3"
                    >
                      <Icon name="List" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <FilterChips
              selectedFilters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />

            {/* Content Action Bar */}
            <ContentActionBar
              selectedItems={selectedPosts}
              totalItems={currentPosts.length}
              onSelectAll={() => handleSelectAll(true)}
              onDeselectAll={() => setSelectedPosts([])}
              onBulkDelete={handleBulkDelete}
              onBulkPublish={handleBulkPublish}
              onBulkArchive={handleBulkArchive}
              onExport={handleExport}
              context="posts"
            />

            {/* Posts Display */}
            {currentPosts.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="FileText" size={48} className="mx-auto text-text-muted mb-4" />
                <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                  No posts found
                </h3>
                <p className="text-text-secondary mb-6">
                  {searchQuery || filters.status !== 'all' || filters.category !== 'all' ?'Try adjusting your search or filters' :'Get started by creating your first blog post'
                  }
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/post-editor')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create New Post
                </Button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {currentPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        isSelected={selectedPosts.includes(post.id)}
                        onSelect={handleSelectPost}
                        onEdit={handleEditPost}
                        onDelete={handleDeletePost}
                        onPreview={handlePreviewPost}
                        onToggleStatus={handleToggleStatus}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mb-8">
                    <PostTable
                      posts={currentPosts}
                      selectedPosts={selectedPosts}
                      onSelectPost={handleSelectPost}
                      onSelectAll={handleSelectAll}
                      onEdit={handleEditPost}
                      onDelete={handleDeletePost}
                      onPreview={handlePreviewPost}
                      onToggleStatus={handleToggleStatus}
                      sortConfig={sortConfig}
                      onSort={handleSort}
                    />
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-text-secondary">
                      Showing {startIndex + 1} to {Math.min(endIndex, totalPosts)} of {totalPosts} posts
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        iconName="ChevronLeft"
                      />
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? 'primary' : 'ghost'}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          );
                        })}
                        {totalPages > 5 && (
                          <>
                            <span className="text-text-muted">...</span>
                            <Button
                              variant={currentPage === totalPages ? 'primary' : 'ghost'}
                              size="sm"
                              onClick={() => setCurrentPage(totalPages)}
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        iconName="ChevronRight"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Post Preview Modal */}
      <PostPreviewModal
        post={previewPost}
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setPreviewPost(null);
        }}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />
    </div>
  );
};

export default PostManagement;