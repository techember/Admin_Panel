// import React, { useState } from 'react';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { 
//   MagnifyingGlassIcon, 
//   ArrowPathIcon, 
//   ArrowDownTrayIcon,
//   FunnelIcon
// } from '@heroicons/react/24/outline';
// import { mockTransactions } from '@/mocks/data';

// export const TransactionManagement = () => {
//   const [transactions, setTransactions] = useState(mockTransactions);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [serviceFilter, setServiceFilter] = useState('all');

//   const filteredTransactions = transactions.filter(transaction => {
//     const matchesSearch = 
//       transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       transaction.service.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
//     const matchesService = serviceFilter === 'all' || transaction.type === serviceFilter;
    
//     return matchesSearch && matchesStatus && matchesService;
//   });

//   const updateStatus = (transactionId: string, newStatus: string) => {
//     setTransactions(transactions.map(transaction =>
//       transaction.id === transactionId 
//         ? { ...transaction, status: newStatus }
//         : transaction
//     ));
//   };

//   const initiateRefund = (transactionId: string) => {
//     setTransactions(transactions.map(transaction =>
//       transaction.id === transactionId 
//         ? { ...transaction, status: 'refunded' }
//         : transaction
//     ));
//   };

//   const getStatusBadge = (status: string) => {
//     const badges = {
//       success: 'badge-success',
//       pending: 'badge-warning',
//       failed: 'badge-error',
//       refunded: 'badge-neutral'
//     };
//     return badges[status as keyof typeof badges] || 'badge-neutral';
//   };

//   const exportTransactions = () => {
//     console.log('Exporting transactions...', filteredTransactions);
//   };

//   return (
//     <AdminLayout title="Transaction Management">
//       <div className="p-6">
//         <div className="admin-card">
//           {/* Header with Filters */}
//           <div className="p-6 border-b border-border">
//             <div className="flex flex-col lg:flex-row gap-4">
//               {/* Search */}
//               <div className="relative flex-1 max-w-md">
//                 <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//                 <input
//                   type="text"
//                   placeholder="Search transactions..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
//                 />
//               </div>

//               {/* Filters */}
//               <div className="flex gap-3">
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="success">Success</option>
//                   <option value="pending">Pending</option>
//                   <option value="failed">Failed</option>
//                   <option value="refunded">Refunded</option>
//                 </select>

//                 <select
//                   value={serviceFilter}
//                   onChange={(e) => setServiceFilter(e.target.value)}
//                   className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                 >
//                   <option value="all">All Services</option>
//                   <option value="recharge">Recharge</option>
//                   <option value="bill_payment">Bill Payment</option>
//                   <option value="travel">Travel</option>
//                 </select>

//                 <button
//                   onClick={exportTransactions}
//                   className="btn-secondary flex items-center gap-2"
//                 >
//                   <ArrowDownTrayIcon className="h-4 w-4" />
//                   Export
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Transactions Table */}
//           <div className="overflow-x-auto">
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>Transaction ID</th>
//                   <th>User</th>
//                   <th>Service</th>
//                   <th>Amount</th>
//                   <th>Commission</th>
//                   <th>Status</th>
//                   <th>Date</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTransactions.map((transaction) => (
//                   <tr key={transaction.id}>
//                     <td className="font-mono">{transaction.id}</td>
//                     <td>
//                       <div>
//                         <div className="font-medium">{transaction.userName}</div>
//                         <div className="text-sm text-muted-foreground">{transaction.userId}</div>
//                       </div>
//                     </td>
//                     <td>
//                       <div>
//                         <div className="font-medium">{transaction.service}</div>
//                         <div className="text-sm text-muted-foreground capitalize">{transaction.type}</div>
//                       </div>
//                     </td>
//                     <td className="font-mono">₹{transaction.amount.toFixed(2)}</td>
//                     <td className="font-mono text-success">₹{transaction.commission.toFixed(2)}</td>
//                     <td>
//                       {transaction.status === 'pending' ? (
//                         <select
//                           value={transaction.status}
//                           onChange={(e) => updateStatus(transaction.id, e.target.value)}
//                           className="text-sm border border-border rounded px-2 py-1"
//                         >
//                           <option value="pending">Pending</option>
//                           <option value="success">Success</option>
//                           <option value="failed">Failed</option>
//                         </select>
//                       ) : (
//                         <span className={`${getStatusBadge(transaction.status)} capitalize`}>
//                           {transaction.status}
//                         </span>
//                       )}
//                     </td>
//                     <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         {(transaction.status === 'success' || transaction.status === 'failed') && (
//                           <button
//                             onClick={() => initiateRefund(transaction.id)}
//                             className="p-1 text-warning hover:bg-warning/10 rounded"
//                             title="Refund"
//                           >
//                             <ArrowPathIcon className="h-4 w-4" />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredTransactions.length === 0 && (
//             <div className="p-8 text-center text-muted-foreground">
//               <FunnelIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
//               No transactions found matching your filters.
//             </div>
//           )}
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { 
  MagnifyingGlassIcon, 
  ArrowPathIcon, 
  ArrowDownTrayIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { mockTransactions } from '@/mocks/data';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Transaction {
  id: string;
  userName: string;
  userId: string;
  service: string;
  type: string;
  amount: number;
  commission: number;
  status: string;
  createdAt: string;
}

export const TransactionManagement = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        if (USE_MOCK) {
          // ✅ Use mock data
          setTransactions(mockTransactions);
        } else {
          // ✅ Fetch from backend
          const res = await axios.get(`${API_BASE_URL}/transactions`);
          setTransactions(res.data);
        }

      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesService = serviceFilter === 'all' || transaction.type === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const updateStatus = (transactionId: string, newStatus: string) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === transactionId 
          ? { ...transaction, status: newStatus }
          : transaction
      )
    );
  };

  const initiateRefund = (transactionId: string) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === transactionId 
          ? { ...transaction, status: 'refunded' }
          : transaction
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      success: 'badge-success',
      pending: 'badge-warning',
      failed: 'badge-error',
      refunded: 'badge-neutral'
    };
    return badges[status as keyof typeof badges] || 'badge-neutral';
  };

  const exportTransactions = () => {
    console.log('Exporting transactions...', filteredTransactions);
  };

  return (
    <AdminLayout title="Transaction Management">
      <div className="p-6">
        <div className="admin-card">
          {/* Header with Filters */}
          <div className="p-6 border-b border-border">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>

                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="all">All Services</option>
                  <option value="recharge">Recharge</option>
                  <option value="bill_payment">Bill Payment</option>
                  <option value="travel">Travel</option>
                </select>

                <button
                  onClick={exportTransactions}
                  className="btn-secondary flex items-center gap-2"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>User</th>
                      <th>Service</th>
                      <th>Amount</th>
                      <th>Commission</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="font-mono">{transaction.id}</td>
                        <td>
                          <div>
                            <div className="font-medium">{transaction.userName}</div>
                            <div className="text-sm text-muted-foreground">{transaction.userId}</div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="font-medium">{transaction.service}</div>
                            <div className="text-sm text-muted-foreground capitalize">{transaction.type}</div>
                          </div>
                        </td>
                        <td className="font-mono">₹{transaction.amount.toFixed(2)}</td>
                        <td className="font-mono text-success">₹{transaction.commission.toFixed(2)}</td>
                        <td>
                          {transaction.status === 'pending' ? (
                            <select
                              value={transaction.status}
                              onChange={(e) => updateStatus(transaction.id, e.target.value)}
                              className="text-sm border border-border rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="success">Success</option>
                              <option value="failed">Failed</option>
                            </select>
                          ) : (
                            <span className={`${getStatusBadge(transaction.status)} capitalize`}>
                              {transaction.status}
                            </span>
                          )}
                        </td>
                        <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            {(transaction.status === 'success' || transaction.status === 'failed') && (
                              <button
                                onClick={() => initiateRefund(transaction.id)}
                                className="p-1 text-warning hover:bg-warning/10 rounded"
                                title="Refund"
                              >
                                <ArrowPathIcon className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredTransactions.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <FunnelIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  No transactions found matching your filters.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
