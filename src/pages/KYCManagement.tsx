import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  EyeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { mockKycRequests } from '@/mocks/data';

type KYCStatus = 'pending' | 'verified' | 'rejected';

export const KYCManagement = () => {
  const [activeTab, setActiveTab] = useState<KYCStatus>('pending');
  const [requests, setRequests] = useState(mockKycRequests);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [comments, setComments] = useState('');

  const filteredRequests = requests.filter(request => request.status === activeTab);

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(request =>
      request.id === requestId 
        ? { ...request, status: 'verified', comments: 'KYC approved successfully' }
        : request
    ));
  };

  const handleReject = (requestId: string) => {
    setSelectedRequest(requestId);
    setShowCommentsModal(true);
  };

  const submitRejection = () => {
    if (selectedRequest && comments.trim()) {
      setRequests(requests.map(request =>
        request.id === selectedRequest 
          ? { ...request, status: 'rejected', comments }
          : request
      ));
      setShowCommentsModal(false);
      setSelectedRequest(null);
      setComments('');
    }
  };

  const getStatusColor = (status: KYCStatus) => {
    const colors = {
      pending: 'border-warning bg-warning/10 text-warning',
      verified: 'border-success bg-success/10 text-success',
      rejected: 'border-destructive bg-destructive/10 text-destructive'
    };
    return colors[status];
  };

  const tabs = [
    { key: 'pending' as KYCStatus, label: 'Pending', count: requests.filter(r => r.status === 'pending').length },
    { key: 'verified' as KYCStatus, label: 'Verified', count: requests.filter(r => r.status === 'verified').length },
    { key: 'rejected' as KYCStatus, label: 'Rejected', count: requests.filter(r => r.status === 'rejected').length }
  ];

  return (
    <AdminLayout title="KYC Management">
      <div className="p-6">
        <div className="admin-card">
          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-accent text-accent-foreground rounded-full px-2 py-1 text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  No {activeTab} KYC requests found.
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="border border-border rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Document Preview */}
                      <div className="flex-shrink-0">
                        <img
                          src={request.documentUrl}
                          alt="Document"
                          className="w-24 h-16 object-cover rounded border border-border"
                        />
                      </div>

                      {/* Request Details */}
                      <div className="flex-grow">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-foreground">{request.userName}</h4>
                            <p className="text-sm text-muted-foreground">ID: {request.userId}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {request.documentType}: {request.documentNumber}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Submitted: {new Date(request.submittedAt).toLocaleDateString()}
                            </p>
                            <div className="mt-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(request.status as KYCStatus)}`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </div>
                            {request.comments && (
                              <p className="text-sm text-muted-foreground mt-2">
                                <strong>Comments:</strong> {request.comments}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-row lg:flex-col gap-2">
                        <button className="btn-secondary flex items-center gap-2 text-sm">
                          <EyeIcon className="h-4 w-4" />
                          View
                        </button>
                        
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="bg-success hover:bg-success/90 text-success-foreground px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                            >
                              <XCircleIcon className="h-4 w-4" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comments Modal */}
        {showCommentsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                Rejection Comments
              </h3>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary h-32 resize-none"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowCommentsModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRejection}
                  disabled={!comments.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Rejection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};