// import React, { useState } from 'react';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { 
//   MagnifyingGlassIcon, 
//   EyeIcon, 
//   ArrowDownTrayIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ClipboardDocumentIcon,
//   PlusIcon
// } from '@heroicons/react/24/outline';
// import { mockUsers } from '@/mocks/data';
// import { saveAs } from 'file-saver';
// import Papa from 'papaparse';
// import { Switch } from '@/components/ui/switch';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { useToast } from '@/hooks/use-toast';

// export const UserManagement = () => {
//   const [users, setUsers] = useState(mockUsers);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchFilter, setSearchFilter] = useState('name');
//   const [sortFilter, setSortFilter] = useState('none');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [visibleMpin, setVisibleMpin] = useState<Record<string, boolean>>({});
//   const [referralModalOpen, setReferralModalOpen] = useState(false);
//   const [selectedUserForReferral, setSelectedUserForReferral] = useState<string | null>(null);
//   const [referralInput, setReferralInput] = useState('');
//   const { toast } = useToast();

//   // Filter and sort users based on search term and selected filters
//   const filteredUsers = users.filter(user => {
//     // First apply search filter
//     let matchesSearch = true;
//     if (searchTerm) {
//       switch (searchFilter) {
//         case 'name':
//           matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
//           break;
//         case 'id':
//           matchesSearch = user.id.toLowerCase().includes(searchTerm.toLowerCase());
//           break;
//         case 'email':
//           matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
//           break;
//         case 'phone':
//           matchesSearch = user.mobile.includes(searchTerm);
//           break;
//         default:
//           matchesSearch = true;
//       }
//     }

//     // Then apply status filter (for active/inactive)
//     let matchesStatus = true;
//     if (sortFilter === 'active') {
//       matchesStatus = user.status === 'active';
//     } else if (sortFilter === 'inactive') {
//       matchesStatus = user.status !== 'active';
//     }

//     return matchesSearch && matchesStatus;
//   }).sort((a, b) => {
//     // Apply sorting for oldest/latest
//     switch (sortFilter) {
//       case 'oldest':
//         return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//       case 'latest':
//         return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//       default:
//         return 0;
//     }
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentUsers = filteredUsers.slice(startIndex, endIndex);

//   const handleStatusChange = (userId: string, newStatus: string) => {
//     setUsers(users.map(user => 
//       user.id === userId ? { ...user, status: newStatus } : user
//     ));
//   };

//   const copyToClipboard = (text: string, label: string) => {
//     navigator.clipboard.writeText(text);
//     toast({
//       title: "Copied to clipboard",
//       description: `${label} copied successfully`,
//     });
//   };

//   const toggleMpinVisibility = (userId: string) => {
//     setVisibleMpin(prev => ({
//       ...prev,
//       [userId]: !prev[userId]
//     }));
//   };

//   const handleAddReferral = (userId: string) => {
//     setSelectedUserForReferral(userId);
//     setReferralInput('');
//     setReferralModalOpen(true);
//   };

//   const saveReferral = () => {
//     if (!selectedUserForReferral || !referralInput.trim()) return;
    
//     setUsers(users.map(user => 
//       user.id === selectedUserForReferral 
//         ? { ...user, referredBy: referralInput.trim() }
//         : user
//     ));
    
//     toast({
//       title: "Referral added",
//       description: "Referrer has been successfully assigned",
//     });
    
//     setReferralModalOpen(false);
//     setSelectedUserForReferral(null);
//     setReferralInput('');
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   const getInitials = (name: string) => {
//     return name.split(' ').map(n => n[0]).join('').toUpperCase();
//   };

//   const exportToCSV = () => {
//     const csv = Papa.unparse(filteredUsers);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     saveAs(blob, `users_${new Date().toISOString().split('T')[0]}.csv`);
//   };

//   const getStatusBadge = (status: string) => {
//     const badges = {
//       active: 'badge-success',
//       suspended: 'badge-error',
//       pending: 'badge-warning'
//     };
//     return badges[status as keyof typeof badges] || 'badge-neutral';
//   };

//   const getKYCStatusBadge = (status: string) => {
//     const badges = {
//       verified: 'badge-success',
//       pending: 'badge-warning',
//       rejected: 'badge-error'
//     };
//     return badges[status as keyof typeof badges] || 'badge-neutral';
//   };

//   return (
//     <AdminLayout title="User Management">
//       <div className="p-6">
//         <div className="admin-card">
//           {/* Header */}
//           <div className="p-6 border-b border-border">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <h2 className="text-xl font-semibold">Users</h2>
              
//               <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                 {/* Search with Filter */}
//                 <div className="flex gap-2">
//                   <Select value={searchFilter} onValueChange={setSearchFilter}>
//                     <SelectTrigger className="w-32">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="name">Name</SelectItem>
//                       <SelectItem value="id">ID</SelectItem>
//                       <SelectItem value="email">Email</SelectItem>
//                       <SelectItem value="phone">Phone</SelectItem>
//                     </SelectContent>
//                   </Select>
                  
//                   <div className="relative">
//                     <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       type="text"
//                       placeholder={`Search by ${searchFilter}...`}
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10 w-full sm:w-64"
//                     />
//                   </div>

//                   <Select value={sortFilter} onValueChange={setSortFilter}>
//                     <SelectTrigger className="w-40">
//                       <SelectValue placeholder="Sort/Filter..." />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="none">No Sort/Filter</SelectItem>
//                       <SelectItem value="oldest">Oldest First</SelectItem>
//                       <SelectItem value="latest">Latest First</SelectItem>
//                       <SelectItem value="active">Active Only</SelectItem>
//                       <SelectItem value="inactive">Inactive Only</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
                
//                 {/* Export Button */}
//                 <Button
//                   onClick={exportToCSV}
//                   variant="outline"
//                   className="flex items-center gap-2 whitespace-nowrap"
//                 >
//                   <ArrowDownTrayIcon className="h-4 w-4" />
//                   Export CSV
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Phone</th>
//                   <th>Email</th>
//                   <th>Referred By</th>
//                   <th>Registration Date/Time</th>
//                   <th>IP Address</th>
//                   <th>Address</th>
//                   <th>Status</th>
//                   <th>MPIN</th>
//                   <th>Balance</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentUsers.map((user) => (
//                   <tr key={user.id}>
//                     <td className="text-center">
//                       <button
//                         onClick={() => copyToClipboard(user.id, 'User ID')}
//                         className="p-2 text-muted-foreground hover:text-primary rounded mx-auto"
//                         title="Copy User ID"
//                       >
//                         <ClipboardDocumentIcon className="h-5 w-5" />
//                       </button>
//                     </td>
//                     <td>
//                       <span className="font-medium">{user.name}</span>
//                     </td>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         <span>{user.mobile}</span>
//                         <button
//                           onClick={() => copyToClipboard(user.mobile, 'Phone number')}
//                           className="p-1 text-muted-foreground hover:text-primary rounded"
//                           title="Copy Phone"
//                         >
//                           <ClipboardDocumentIcon className="h-3 w-3" />
//                         </button>
//                       </div>
//                     </td>
//                     <td>{user.email}</td>
//                     <td>
//                       {user.referredBy ? (
//                         <div className="flex items-center gap-2">
//                           <span className="font-mono text-sm">{user.referredBy}</span>
//                           <button 
//                             onClick={() => copyToClipboard(user.referredBy!, 'Referrer ID')}
//                             className="p-1 text-muted-foreground hover:text-primary rounded"
//                             title="Copy Referrer ID"
//                           >
//                             <ClipboardDocumentIcon className="h-3 w-3" />
//                           </button>
//                         </div>
//                       ) : (
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => handleAddReferral(user.id)}
//                           className="h-6 px-2 text-xs"
//                         >
//                           <PlusIcon className="h-3 w-3 mr-1" />
//                           Add
//                         </Button>
//                       )}
//                     </td>
//                     <td className="text-sm">{formatDate(user.createdAt)}</td>
//                     <td className="font-mono text-sm">{user.ipAddress}</td>
//                     <td className="text-sm max-w-xs truncate" title={user.address}>
//                       {user.address}
//                     </td>
//                     <td>
//                       <Switch
//                         checked={user.status === 'active'}
//                         onCheckedChange={(checked) => 
//                           handleStatusChange(user.id, checked ? 'active' : 'suspended')
//                         }
//                         className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
//                       />
//                     </td>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         <span className="font-mono text-sm">
//                           {visibleMpin[user.id] ? user.mpin : '****'}
//                         </span>
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           onClick={() => toggleMpinVisibility(user.id)}
//                           className="h-6 px-2 text-xs"
//                         >
//                           <EyeIcon className="h-3 w-3" />
//                         </Button>
//                       </div>
//                     </td>
//                     <td className="font-mono">₹{user.walletBalance.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="p-6 border-t border-border">
//               <div className="flex items-center justify-between">
//                 <p className="text-sm text-muted-foreground">
//                   Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} results
//                 </p>
                
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                     disabled={currentPage === 1}
//                     className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronLeftIcon className="h-4 w-4" />
//                   </button>
                  
//                   <span className="text-sm font-medium px-3">
//                     {currentPage} of {totalPages}
//                   </span>
                  
//                   <button
//                     onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                     disabled={currentPage === totalPages}
//                     className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronRightIcon className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Referral Modal */}
//         <Dialog open={referralModalOpen} onOpenChange={setReferralModalOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add Referrer</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium">Referrer ID or Email</label>
//                 <Input
//                   value={referralInput}
//                   onChange={(e) => setReferralInput(e.target.value)}
//                   placeholder="Enter referrer ID or email"
//                   className="mt-1"
//                 />
//               </div>
//               <div className="flex justify-end gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => setReferralModalOpen(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button onClick={saveReferral}>
//                   Save Referrer
//                 </Button>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </AdminLayout>
//   );
// };

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { 
  MagnifyingGlassIcon, 
  EyeIcon, 
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { mockUsers } from '@/mocks/data';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState('name');
  const [sortFilter, setSortFilter] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [visibleMpin, setVisibleMpin] = useState<Record<string, boolean>>({});
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [selectedUserForReferral, setSelectedUserForReferral] = useState<string | null>(null);
  const [referralInput, setReferralInput] = useState('');
  const { toast } = useToast();

  // ✅ Load users from mock or backend
  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (USE_MOCK) {
          setUsers(mockUsers);
        } else {
          const res = await fetch(`${API_BASE_URL}/users`, {
            headers: { 'Content-Type': 'application/json' },
          });
          if (!res.ok) throw new Error('Failed to fetch users');
          const data = await res.json();
          setUsers(data);
        }
      } catch (err) {
        console.error(err);
        toast({
          title: 'Error loading users',
          description: 'Could not load user data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Filter and sort users based on search term and selected filters
  const filteredUsers = users.filter(user => {
    let matchesSearch = true;
    if (searchTerm) {
      switch (searchFilter) {
        case 'name':
          matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
          break;
        case 'id':
          matchesSearch = user.id.toLowerCase().includes(searchTerm.toLowerCase());
          break;
        case 'email':
          matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
          break;
        case 'phone':
          matchesSearch = user.mobile.includes(searchTerm);
          break;
      }
    }
    let matchesStatus = true;
    if (sortFilter === 'active') matchesStatus = user.status === 'active';
    else if (sortFilter === 'inactive') matchesStatus = user.status !== 'active';
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortFilter) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'latest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: `${label} copied successfully` });
  };

  const toggleMpinVisibility = (userId: string) => {
    setVisibleMpin(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const handleAddReferral = (userId: string) => {
    setSelectedUserForReferral(userId);
    setReferralInput('');
    setReferralModalOpen(true);
  };

  const saveReferral = () => {
    if (!selectedUserForReferral || !referralInput.trim()) return;
    setUsers(users.map(user => 
      user.id === selectedUserForReferral 
        ? { ...user, referredBy: referralInput.trim() }
        : user
    ));
    toast({ title: "Referral added", description: "Referrer assigned" });
    setReferralModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredUsers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `users_${new Date().toISOString().split('T')[0]}.csv`);
  };

  if (loading) {
    return (
      <AdminLayout title="User Management">
        <div className="p-6">Loading users...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="User Management">
      <div className="p-6">
        {/* ---- Header (Search + Filters + Export) ---- */}
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Select value={searchFilter} onValueChange={setSearchFilter}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder={`Search by ${searchFilter}...`}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={sortFilter} onValueChange={setSortFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Sort/Filter</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="latest">Latest First</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
            <ArrowDownTrayIcon className="h-4 w-4" /> Export CSV
          </Button>
        </div>

        {/* ---- Table ---- */}
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Referred By</th>
                <th>Registered</th><th>IP</th><th>Address</th><th>Status</th><th>MPIN</th><th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <button onClick={() => copyToClipboard(user.id, 'User ID')}>
                      <ClipboardDocumentIcon className="h-5 w-5" />
                    </button>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.email}</td>
                  <td>{user.referredBy || (
                    <Button size="sm" variant="outline" onClick={() => handleAddReferral(user.id)}>Add</Button>
                  )}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{user.ipAddress}</td>
                  <td>{user.address}</td>
                  <td>
                    <Switch
                      checked={user.status === 'active'}
                      onCheckedChange={c => handleStatusChange(user.id, c ? 'active' : 'suspended')}
                    />
                  </td>
                  <td>
                    {visibleMpin[user.id] ? user.mpin : '****'}
                    <Button size="sm" variant="ghost" onClick={() => toggleMpinVisibility(user.id)}>
                      <EyeIcon className="h-3 w-3" />
                    </Button>
                  </td>
                  <td>₹{user.walletBalance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---- Pagination ---- */}
        {totalPages > 1 && (
          <div className="flex justify-between mt-4">
            <p>Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}</p>
            <div className="flex gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <span>{currentPage} / {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---- Referral Modal ---- */}
        <Dialog open={referralModalOpen} onOpenChange={setReferralModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Referrer</DialogTitle>
            </DialogHeader>
            <Input value={referralInput} onChange={e => setReferralInput(e.target.value)} placeholder="Enter referrer ID/email" />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setReferralModalOpen(false)}>Cancel</Button>
              <Button onClick={saveReferral}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};
