import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RichTextEditor = ({ content, onChange, onImageUpload }) => {
  const [showToolbar, setShowToolbar] = useState(true);
  const [selectedText, setSelectedText] = useState('');
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const toolbarItems = [
    { name: 'Bold', icon: 'Bold', command: 'bold', shortcut: 'Ctrl+B' },
    { name: 'Italic', icon: 'Italic', command: 'italic', shortcut: 'Ctrl+I' },
    { name: 'Underline', icon: 'Underline', command: 'underline', shortcut: 'Ctrl+U' },
    { type: 'separator' },
    { name: 'Heading 1', icon: 'Heading1', command: 'formatBlock', value: 'h1' },
    { name: 'Heading 2', icon: 'Heading2', command: 'formatBlock', value: 'h2' },
    { name: 'Heading 3', icon: 'Heading3', command: 'formatBlock', value: 'h3' },
    { type: 'separator' },
    { name: 'Bullet List', icon: 'List', command: 'insertUnorderedList' },
    { name: 'Numbered List', icon: 'ListOrdered', command: 'insertOrderedList' },
    { name: 'Quote', icon: 'Quote', command: 'formatBlock', value: 'blockquote' },
    { type: 'separator' },
    { name: 'Link', icon: 'Link', command: 'createLink' },
    { name: 'Image', icon: 'Image', command: 'insertImage' },
    { name: 'Code', icon: 'Code', command: 'formatBlock', value: 'pre' },
  ];

  const executeCommand = (command, value = null) => {
    if (command === 'createLink') {
      const url = prompt('Enter URL:');
      if (url) {
        document.execCommand(command, false, url);
      }
    } else if (command === 'insertImage') {
      fileInputRef.current?.click();
    } else {
      document.execCommand(command, false, value);
    }
    editorRef.current?.focus();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        document.execCommand('insertImage', false, imageUrl);
        onImageUpload?.(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e) => {
    // Handle markdown shortcuts
    if (e.key === ' ') {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const textContent = range.startContainer.textContent;
      const cursorPosition = range.startOffset;
      const lineStart = textContent.lastIndexOf('\n', cursorPosition - 1) + 1;
      const lineText = textContent.substring(lineStart, cursorPosition);

      // Markdown shortcuts
      if (lineText === '#') {
        e.preventDefault();
        executeCommand('formatBlock', 'h1');
      } else if (lineText === '##') {
        e.preventDefault();
        executeCommand('formatBlock', 'h2');
      } else if (lineText === '###') {
        e.preventDefault();
        executeCommand('formatBlock', 'h3');
      } else if (lineText === '-' || lineText === '*') {
        e.preventDefault();
        executeCommand('insertUnorderedList');
      } else if (lineText === '1.') {
        e.preventDefault();
        executeCommand('insertOrderedList');
      } else if (lineText === '>') {
        e.preventDefault();
        executeCommand('formatBlock', 'blockquote');
      }
    }

    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          executeCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          executeCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          executeCommand('underline');
          break;
        case 'k':
          e.preventDefault();
          executeCommand('createLink');
          break;
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          document.execCommand('insertImage', false, imageUrl);
          onImageUpload?.(file);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0 && !selection.isCollapsed) {
        setSelectedText(selection.toString());
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setToolbarPosition({
          top: rect.top - 50,
          left: rect.left + (rect.width / 2)
        });
      } else {
        setSelectedText('');
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Floating Toolbar for Selection */}
      {selectedText && (
        <div
          className="fixed z-50 bg-popover border border-border rounded-lg shadow-editorial-lg p-2 flex items-center space-x-1 animate-fade-in"
          style={{
            top: `${toolbarPosition.top}px`,
            left: `${toolbarPosition.left}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <Button variant="ghost" size="sm" onClick={() => executeCommand('bold')}>
            <Icon name="Bold" size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => executeCommand('italic')}>
            <Icon name="Italic" size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => executeCommand('createLink')}>
            <Icon name="Link" size={16} />
          </Button>
        </div>
      )}

      {/* Main Toolbar */}
      {showToolbar && (
        <div className="border-b border-border bg-surface p-3">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {toolbarItems.map((item, index) => {
              if (item.type === 'separator') {
                return <div key={index} className="w-px h-6 bg-border mx-2" />;
              }
              
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => executeCommand(item.command, item.value)}
                  title={`${item.name} ${item.shortcut ? `(${item.shortcut})` : ''}`}
                  className="flex-shrink-0"
                >
                  <Icon name={item.icon} size={16} />
                </Button>
              );
            })}
            
            <div className="flex-1" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowToolbar(false)}
              title="Hide toolbar"
            >
              <Icon name="ChevronUp" size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Show Toolbar Button */}
      {!showToolbar && (
        <div className="border-b border-border bg-surface p-2 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowToolbar(true)}
            title="Show toolbar"
          >
            <Icon name="ChevronDown" size={16} />
          </Button>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 relative">
        <div
          ref={editorRef}
          contentEditable
          className="w-full h-full p-6 lg:p-12 outline-none prose prose-lg max-w-none font-body text-text-primary bg-background"
          style={{ minHeight: 'calc(100vh - 200px)' }}
          onInput={(e) => onChange(e.target.innerHTML)}
          onKeyDown={handleKeyDown}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          dangerouslySetInnerHTML={{ __html: content }}
          data-placeholder="Start writing your story..."
        />
        
        {/* Floating Action Button for Media */}
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            variant="primary"
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 rounded-full shadow-editorial-lg hover-scale"
          >
            <Icon name="Plus" size={24} />
          </Button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Keyboard Shortcuts Help */}
      <div className="hidden lg:block fixed bottom-4 left-4 bg-popover border border-border rounded-lg p-3 text-xs text-text-muted max-w-xs">
        <h4 className="font-medium text-text-primary mb-2">Keyboard Shortcuts</h4>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Bold</span>
            <kbd className="bg-surface px-1 rounded">Ctrl+B</kbd>
          </div>
          <div className="flex justify-between">
            <span>Italic</span>
            <kbd className="bg-surface px-1 rounded">Ctrl+I</kbd>
          </div>
          <div className="flex justify-between">
            <span>Link</span>
            <kbd className="bg-surface px-1 rounded">Ctrl+K</kbd>
          </div>
          <div className="flex justify-between">
            <span>Heading</span>
            <kbd className="bg-surface px-1 rounded"># + Space</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;