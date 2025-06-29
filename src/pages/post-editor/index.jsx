import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditorHeader from './components/EditorHeader';
import RichTextEditor from './components/RichTextEditor';
import MetadataPanel from './components/MetadataPanel';
import PublishModal from './components/PublishModal';
import PreviewModal from './components/PreviewModal';

const PostEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [autoSaveStatus, setAutoSaveStatus] = useState('draft');
  const [isMetadataPanelOpen, setIsMetadataPanelOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const [metadata, setMetadata] = useState({
    title: '',
    excerpt: '',
    category: '',
    tags: [],
    featuredImage: '',
    seoTitle: '',
    metaDescription: '',
    focusKeyword: '',
    socialTitle: '',
    socialDescription: '',
    socialImage: '',
    publishDate: new Date().toISOString().slice(0, 16),
    author: 'John Doe',
    status: 'draft',
    allowComments: true,
    featured: false
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (title || content) {
        handleAutoSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [title, content, metadata]);

  // Update metadata title when main title changes
  useEffect(() => {
    setMetadata(prev => ({
      ...prev,
      title: title,
      seoTitle: title || prev.seoTitle,
      socialTitle: title || prev.socialTitle
    }));
  }, [title]);

  const handleAutoSave = async () => {
    setAutoSaveStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const postData = {
        title,
        content,
        metadata,
        lastModified: new Date().toISOString()
      };
      
      // Save to localStorage as backup
      localStorage.setItem('blog-draft', JSON.stringify(postData));
      
      setAutoSaveStatus('saved');
      setLastSaved(new Date());
      
      setTimeout(() => {
        setAutoSaveStatus('draft');
      }, 3000);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setAutoSaveStatus('error');
      
      setTimeout(() => {
        setAutoSaveStatus('draft');
      }, 3000);
    }
  };

  const handleSave = async () => {
    await handleAutoSave();
  };

  const handlePreview = () => {
    setIsPreviewModalOpen(true);
  };

  const handlePublish = () => {
    setIsPublishModalOpen(true);
  };

  const handlePublishConfirm = async () => {
    try {
      const postData = {
        title,
        content,
        metadata: {
          ...metadata,
          status: 'published',
          publishDate: new Date().toISOString()
        }
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Publishing post:', postData);
      
      // Clear draft from localStorage
      localStorage.removeItem('blog-draft');
      
      // Navigate to published blog view
      navigate('/published-blog-view');
    } catch (error) {
      console.error('Publishing failed:', error);
      throw error;
    }
  };

  const handleSchedule = async (scheduledDateTime) => {
    try {
      const postData = {
        title,
        content,
        metadata: {
          ...metadata,
          status: 'scheduled',
          publishDate: scheduledDateTime.toISOString()
        }
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Scheduling post:', postData);
      
      // Navigate to post management
      navigate('/post-management');
    } catch (error) {
      console.error('Scheduling failed:', error);
      throw error;
    }
  };

  const handleSettings = () => {
    setIsMetadataPanelOpen(true);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would update the global theme
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleImageUpload = (file) => {
    // In a real app, this would upload to a server
    console.log('Uploading image:', file);
  };

  const handleFeaturedImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMetadata(prev => ({
          ...prev,
          featuredImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('blog-draft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setTitle(draftData.title || '');
        setContent(draftData.content || '');
        setMetadata(draftData.metadata || metadata);
        setLastSaved(new Date(draftData.lastModified));
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey)) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'p':
            e.preventDefault();
            handlePreview();
            break;
          case 'Enter':
            if (e.shiftKey) {
              e.preventDefault();
              handlePublish();
            }
            break;
          case ',':
            e.preventDefault();
            handleSettings();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <EditorHeader
        title={title}
        onTitleChange={setTitle}
        autoSaveStatus={autoSaveStatus}
        onSave={handleSave}
        onPreview={handlePreview}
        onPublish={handlePublish}
        onSettings={handleSettings}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
      />

      <div className="flex-1 flex relative">
        <RichTextEditor
          content={content}
          onChange={setContent}
          onImageUpload={handleImageUpload}
        />

        <MetadataPanel
          isOpen={isMetadataPanelOpen}
          onClose={() => setIsMetadataPanelOpen(false)}
          metadata={metadata}
          onMetadataChange={setMetadata}
          onFeaturedImageUpload={handleFeaturedImageUpload}
        />
      </div>

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublish={handlePublishConfirm}
        onSchedule={handleSchedule}
        metadata={metadata}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title={title}
        content={content}
        metadata={metadata}
      />

      {/* Status Bar */}
      {lastSaved && (
        <div className="hidden lg:block fixed bottom-4 right-4 bg-popover border border-border rounded-lg px-3 py-2 text-xs text-text-muted shadow-editorial">
          Last saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default PostEditor;