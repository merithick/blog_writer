import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LoginScreen from "pages/login-screen";
import RegistrationScreen from "pages/registration-screen";
import Dashboard from "pages/dashboard";
import PostEditor from "pages/post-editor";
import PublishedBlogView from "pages/published-blog-view";
import PostManagement from "pages/post-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/registration-screen" element={<RegistrationScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-editor" element={<PostEditor />} />
        <Route path="/published-blog-view" element={<PublishedBlogView />} />
        <Route path="/post-management" element={<PostManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;