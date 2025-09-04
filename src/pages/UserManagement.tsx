import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { 
  MagnifyingGlassIcon, 
  EyeIcon, 
  NoSymbolIcon, 
  CheckCircleIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { mockUsers } from '@/mocks/data';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile.includes(searchTerm) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredUsers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `users_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'badge-success',
      suspended: 'badge-error',
      pending: 'badge-warning'
    };
    return badges[status as keyof typeof badges] || 'badge-neutral';
  };

  const getKYCStatusBadge = (status: string) => {
    const badges = {
      verified: 'badge-success',
      pending: 'badge-warning',
      rejected: 'badge-error'
    };
    return badges[status as keyof typeof badges] || 'badge-neutral';
  };

  return (
    <AdminLayout title="User Management">
      <div className="p-6">
        <div className="admin-card">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold">Users</h2>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-64"
                  />
                </div>
                
                {/* Export Button */}
                <button
                  onClick={exportToCSV}
                  className="btn-secondary flex items-center gap-2 whitespace-nowrap"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>KYC Status</th>
                  <th>Wallet Balance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="font-mono">{user.id}</td>
                    <td>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </td>
                    <td>{user.mobile}</td>
                    <td>
                      <span className={`${getKYCStatusBadge(user.kycStatus)} capitalize`}>
                        {user.kycStatus}
                      </span>
                    </td>
                    <td className="font-mono">₹{user.walletBalance.toFixed(2)}</td>
                    <td>
                      <span className={`${getStatusBadge(user.status)} capitalize`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-primary hover:bg-primary/10 rounded">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        {user.status === 'active' ? (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'suspended')}
                            className="p-1 text-destructive hover:bg-destructive/10 rounded"
                            title="Suspend User"
                          >
                            <NoSymbolIcon className="h-4 w-4" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'active')}
                            className="p-1 text-success hover:bg-success/10 rounded"
                            title="Activate User"
                          >
                            <CheckCircleIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} results
                </p>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </button>
                  
                  <span className="text-sm font-medium px-3">
                    {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};