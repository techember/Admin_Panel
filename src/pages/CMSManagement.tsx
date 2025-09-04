import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { DocumentTextIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/outline';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const cmsPages = [
  { key: 'about', title: 'About Us', content: '<h2>About Our Company</h2><p>We provide reliable financial services...</p>' },
  { key: 'terms', title: 'Terms & Conditions', content: '<h2>Terms of Service</h2><p>Please read these terms carefully...</p>' },
  { key: 'privacy', title: 'Privacy Policy', content: '<h2>Privacy Policy</h2><p>Your privacy is important to us...</p>' },
  { key: 'refund', title: 'Refund Policy', content: '<h2>Refund Policy</h2><p>Refunds are processed within 3-5 business days...</p>' },
  { key: 'grievance', title: 'Grievance Policy', content: '<h2>Grievance Redressal</h2><p>For complaints, contact our support team...</p>' },
  { key: 'faq', title: 'FAQ', content: '<h2>Frequently Asked Questions</h2><p>Find answers to common questions...</p>' }
];

export const CMSManagement = () => {
  const [selectedPage, setSelectedPage] = useState('about');
  const [content, setContent] = useState(cmsPages.find(p => p.key === selectedPage)?.content || '');
  const [isEditing, setIsEditing] = useState(false);

  const handlePageSelect = (pageKey: string) => {
    setSelectedPage(pageKey);
    setContent(cmsPages.find(p => p.key === pageKey)?.content || '');
    setIsEditing(false);
  };

  const saveContent = () => {
    console.log(`Saving ${selectedPage}:`, content);
    setIsEditing(false);
  };

  const selectedPageData = cmsPages.find(p => p.key === selectedPage);

  return (
    <AdminLayout title="CMS Management">
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Page List */}
          <div className="admin-card p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5" />
              Pages
            </h3>
            <div className="space-y-2">
              {cmsPages.map((page) => (
                <button
                  key={page.key}
                  onClick={() => handlePageSelect(page.key)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedPage === page.key
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent'
                  }`}
                >
                  {page.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3 admin-card">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{selectedPageData?.title}</h3>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-primary flex items-center gap-2"
                    >
                      <PencilIcon className="h-4 w-4" />
                      Edit
                    </button>
                  ) : (
                    <>
                      <button onClick={saveContent} className="btn-primary flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        Save
                      </button>
                      <button onClick={() => setIsEditing(false)} className="btn-secondary">
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              {isEditing ? (
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  style={{ height: '400px', marginBottom: '50px' }}
                />
              ) : (
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};