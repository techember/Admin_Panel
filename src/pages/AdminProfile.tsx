// import React, { useState } from 'react';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { 
//   UserIcon, 
//   PencilIcon, 
//   CheckIcon, 
//   XMarkIcon,
//   KeyIcon,
//   ShieldCheckIcon,
//   ClockIcon,
//   DevicePhoneMobileIcon
// } from '@heroicons/react/24/outline';
// import { useAuth } from '@/contexts/AuthContext';
// import { PinInput } from '@/components/ui/pin-input';

// export const AdminProfile = () => {
//   const { user } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [showChangeMpin, setShowChangeMpin] = useState(false);
  
//   const [profileData, setProfileData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     phone: '+1 (555) 123-4567',
//     department: 'IT Administration',
//     employeeId: 'EMP001',
//     role: user?.role || 'admin',
//     lastLogin: '2024-01-18 10:30 AM',
//     accountCreated: '2023-06-15',
//     status: 'Active'
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const [newMpin, setNewMpin] = useState('');
//   const [confirmMpin, setConfirmMpin] = useState('');

//   const handleSaveProfile = () => {
//     console.log('Saving profile:', profileData);
//     setIsEditing(false);
//   };

//   const handleChangePassword = () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }
//     console.log('Changing password...');
//     setShowChangePassword(false);
//     setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
//   };

//   const handleChangeMpin = () => {
//     if (newMpin.length !== 4 || confirmMpin.length !== 4) {
//       alert('MPIN must be 4 digits');
//       return;
//     }
//     if (newMpin !== confirmMpin) {
//       alert('MPINs do not match');
//       return;
//     }
//     console.log('Changing MPIN...');
//     setShowChangeMpin(false);
//     setNewMpin('');
//     setConfirmMpin('');
//   };

//   const activityLogs = [
//     { action: 'Logged in', timestamp: '2024-01-18 10:30 AM', ip: '192.168.1.100' },
//     { action: 'Updated user status', timestamp: '2024-01-18 09:45 AM', ip: '192.168.1.100' },
//     { action: 'Exported transaction report', timestamp: '2024-01-17 04:20 PM', ip: '192.168.1.100' },
//     { action: 'Approved KYC document', timestamp: '2024-01-17 02:15 PM', ip: '192.168.1.100' },
//     { action: 'Logged in', timestamp: '2024-01-17 09:00 AM', ip: '192.168.1.100' }
//   ];

//   const permissions = [
//     { module: 'User Management', read: true, write: true, delete: true },
//     { module: 'KYC Management', read: true, write: true, delete: false },
//     { module: 'Wallet Management', read: true, write: true, delete: false },
//     { module: 'Transaction Management', read: true, write: true, delete: true },
//     { module: 'Commission Settings', read: true, write: true, delete: false },
//     { module: 'Service Control', read: true, write: true, delete: false },
//     { module: 'Reports', read: true, write: false, delete: false },
//     { module: 'Support Management', read: true, write: true, delete: false }
//   ];

//   return (
//     <AdminLayout title="Admin Profile">
//       <div className="p-6 space-y-6">
//         {/* Profile Header */}
//         <div className="admin-card p-6">
//           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//             <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
//               <UserIcon className="h-12 w-12 text-primary" />
//             </div>
            
//             <div className="flex-1">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
//                   <p className="text-muted-foreground">{profileData.email}</p>
//                   <div className="flex items-center gap-4 mt-2">
//                     <span className="badge-success">{profileData.status}</span>
//                     <span className="text-sm text-muted-foreground">
//                       ID: {profileData.employeeId}
//                     </span>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="btn-primary flex items-center gap-2"
//                 >
//                   <PencilIcon className="h-4 w-4" />
//                   Edit Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Profile Information */}
//           <div className="admin-card p-6">
//             <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
            
//             <div className="space-y-4">
//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">Full Name</label>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={profileData.name}
//                     onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
//                     className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                   />
//                 ) : (
//                   <p className="p-3 bg-muted rounded-lg">{profileData.name}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">Email Address</label>
//                 {isEditing ? (
//                   <input
//                     type="email"
//                     value={profileData.email}
//                     onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
//                     className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                   />
//                 ) : (
//                   <p className="p-3 bg-muted rounded-lg">{profileData.email}</p>
//                 )}
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">Phone Number</label>
//                 {isEditing ? (
//                   <input
//                     type="tel"
//                     value={profileData.phone}
//                     onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
//                     className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                   />
//                 ) : (
//                   <p className="p-3 bg-muted rounded-lg">{profileData.phone}</p>
//                 )}
//               </div>

//               {/* Department */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">Department</label>
//                 {isEditing ? (
//                   <select
//                     value={profileData.department}
//                     onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
//                     className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                   >
//                     <option value="IT Administration">IT Administration</option>
//                     <option value="Finance">Finance</option>
//                     <option value="Operations">Operations</option>
//                     <option value="Customer Support">Customer Support</option>
//                   </select>
//                 ) : (
//                   <p className="p-3 bg-muted rounded-lg">{profileData.department}</p>
//                 )}
//               </div>

//               {isEditing && (
//                 <div className="flex gap-3 pt-4">
//                   <button onClick={handleSaveProfile} className="btn-primary flex items-center gap-2">
//                     <CheckIcon className="h-4 w-4" />
//                     Save Changes
//                   </button>
//                   <button onClick={() => setIsEditing(false)} className="btn-secondary flex items-center gap-2">
//                     <XMarkIcon className="h-4 w-4" />
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Security Settings */}
//           <div className="admin-card p-6">
//             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//               <ShieldCheckIcon className="h-5 w-5" />
//               Security Settings
//             </h3>
            
//             <div className="space-y-4">
//               {/* Change Password */}
//               <div className="p-4 border border-border rounded-lg">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center gap-2">
//                     <KeyIcon className="h-4 w-4 text-primary" />
//                     <span className="font-medium">Password</span>
//                   </div>
//                   <button
//                     onClick={() => setShowChangePassword(true)}
//                     className="btn-secondary text-sm"
//                   >
//                     Change
//                   </button>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   Last changed: December 15, 2023
//                 </p>
//               </div>

//               {/* Change MPIN */}
//               <div className="p-4 border border-border rounded-lg">
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center gap-2">
//                     <DevicePhoneMobileIcon className="h-4 w-4 text-primary" />
//                     <span className="font-medium">MPIN</span>
//                   </div>
//                   <button
//                     onClick={() => setShowChangeMpin(true)}
//                     className="btn-secondary text-sm"
//                   >
//                     Change
//                   </button>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   4-digit mobile PIN for secure access
//                 </p>
//               </div>

//               {/* Account Info */}
//               <div className="pt-4 border-t border-border">
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground">Role:</span>
//                     <p className="font-medium capitalize">{profileData.role}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">Last Login:</span>
//                     <p className="font-medium">{profileData.lastLogin}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">Account Created:</span>
//                     <p className="font-medium">{profileData.accountCreated}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground">Status:</span>
//                     <p className="font-medium text-success">{profileData.status}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Activity Logs & Permissions */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//           {/* Recent Activity */}
//           <div className="admin-card p-6">
//             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
//               <ClockIcon className="h-5 w-5" />
//               Recent Activity
//             </h3>
            
//             <div className="space-y-3">
//               {activityLogs.map((log, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
//                   <div>
//                     <p className="font-medium text-sm">{log.action}</p>
//                     <p className="text-xs text-muted-foreground">{log.timestamp}</p>
//                   </div>
//                   <div className="text-xs text-muted-foreground">
//                     {log.ip}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Permissions */}
//           <div className="admin-card p-6">
//             <h3 className="text-lg font-semibold mb-4">Access Permissions</h3>
            
//             <div className="space-y-3">
//               {permissions.map((permission, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
//                   <span className="font-medium text-sm">{permission.module}</span>
//                   <div className="flex gap-2">
//                     <span className={`text-xs px-2 py-1 rounded ${permission.read ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
//                       R
//                     </span>
//                     <span className={`text-xs px-2 py-1 rounded ${permission.write ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
//                       W
//                     </span>
//                     <span className={`text-xs px-2 py-1 rounded ${permission.delete ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}`}>
//                       D
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
            
//             <div className="mt-4 text-xs text-muted-foreground">
//               <p>R = Read, W = Write, D = Delete</p>
//             </div>
//           </div>
//         </div>

//         {/* Change Password Modal */}
//         {showChangePassword && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-card p-6 rounded-xl max-w-md w-full mx-4">
//               <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Current Password</label>
//                   <input
//                     type="password"
//                     value={passwordData.currentPassword}
//                     onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
//                     className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">New Password</label>
//                   <input
//                     type="password"
//                     value={passwordData.newPassword}
//                     onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//                     className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Confirm New Password</label>
//                   <input
//                     type="password"
//                     value={passwordData.confirmPassword}
//                     onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//                     className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 mt-6">
//                 <button
//                   onClick={() => setShowChangePassword(false)}
//                   className="btn-secondary"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleChangePassword}
//                   className="btn-primary"
//                 >
//                   Update Password
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Change MPIN Modal */}
//         {showChangeMpin && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-card p-6 rounded-xl max-w-md w-full mx-4">
//               <h3 className="text-lg font-semibold mb-4">Change MPIN</h3>
              
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">New MPIN</label>
//                   <div className="flex justify-center">
//                     <PinInput
//                       length={4}
//                       onChange={setNewMpin}
//                       type="number"
//                     />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium mb-2">Confirm MPIN</label>
//                   <div className="flex justify-center">
//                     <PinInput
//                       length={4}
//                       onChange={setConfirmMpin}
//                       type="number"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 mt-6">
//                 <button
//                   onClick={() => setShowChangeMpin(false)}
//                   className="btn-secondary"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleChangeMpin}
//                   className="btn-primary"
//                 >
//                   Update MPIN
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </AdminLayout>
//   );
// };
import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { 
  UserIcon, PencilIcon, CheckIcon, XMarkIcon,
  KeyIcon, ShieldCheckIcon, ClockIcon, DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { PinInput } from '@/components/ui/pin-input';

const useMock = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  department: string;
  employeeId: string;
  role: string;
  lastLogin: string;
  accountCreated: string;
  status: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ActivityLog {
  action: string;
  timestamp: string;
  ip: string;
}

interface Permission {
  module: string;
  read: boolean;
  write: boolean;
  delete: boolean;
}

export const AdminProfile = () => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeMpin, setShowChangeMpin] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    department: '',
    employeeId: '',
    role: '',
    lastLogin: '',
    accountCreated: '',
    status: ''
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [newMpin, setNewMpin] = useState('');
  const [confirmMpin, setConfirmMpin] = useState('');
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  // Fetch profile, activity, and permissions from backend (or mock)
  useEffect(() => {
    if (useMock) {
      setProfileData({
        name: user?.name || 'Admin User',
        email: user?.email || 'admin@gmail.com',
        phone: '+1 (555) 123-4567',
        department: 'IT Administration',
        employeeId: 'EMP001',
        role: user?.role || 'admin',
        lastLogin: '2024-01-18 10:30 AM',
        accountCreated: '2023-06-15',
        status: 'Active'
      });
      setActivityLogs([
        { action: 'Logged in', timestamp: '2024-01-18 10:30 AM', ip: '192.168.1.100' },
        { action: 'Updated user status', timestamp: '2024-01-18 09:45 AM', ip: '192.168.1.100' },
        { action: 'Exported transaction report', timestamp: '2024-01-17 04:20 PM', ip: '192.168.1.100' },
      ]);
      setPermissions([
        { module: 'User Management', read: true, write: true, delete: true },
        { module: 'KYC Management', read: true, write: true, delete: false },
        { module: 'Wallet Management', read: true, write: true, delete: false },
      ]);
    } else {
      // Fetch profile
      fetch(`${import.meta.env.VITE_API_BASE_URL}/profile`)
        .then(res => res.json())
        .then(data => setProfileData(data))
        .catch(err => console.error('Failed to fetch profile', err));

      // Fetch activity logs
      fetch(`${import.meta.env.VITE_API_BASE_URL}/activity-logs`)
        .then(res => res.json())
        .then(data => setActivityLogs(data))
        .catch(err => console.error('Failed to fetch activity logs', err));

      // Fetch permissions
      fetch(`${import.meta.env.VITE_API_BASE_URL}/permissions`)
        .then(res => res.json())
        .then(data => setPermissions(data))
        .catch(err => console.error('Failed to fetch permissions', err));
    }
  }, [user]);

  const handleSaveProfile = () => {
    if (useMock) {
      console.log('Saving profile (mock):', profileData);
      setIsEditing(false);
    } else {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      })
        .then(res => res.json())
        .then(data => {
          setProfileData(data);
          setIsEditing(false);
        })
        .catch(err => console.error('Failed to save profile', err));
    }
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (useMock) {
      console.log('Changing password (mock):', passwordData);
      setShowChangePassword(false);
    } else {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData)
      })
        .then(() => setShowChangePassword(false))
        .catch(err => console.error('Failed to change password', err));
    }

    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleChangeMpin = () => {
    if (newMpin.length !== 4 || confirmMpin.length !== 4) {
      alert('MPIN must be 4 digits');
      return;
    }
    if (newMpin !== confirmMpin) {
      alert('MPINs do not match');
      return;
    }

    if (useMock) {
      console.log('Changing MPIN (mock):', newMpin);
      setShowChangeMpin(false);
    } else {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/change-mpin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mpin: newMpin })
      })
        .then(() => setShowChangeMpin(false))
        .catch(err => console.error('Failed to change MPIN', err));
    }

    setNewMpin('');
    setConfirmMpin('');
  };

  return (
    <AdminLayout title="Admin Profile">
      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <div className="admin-card p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <UserIcon className="h-12 w-12 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{profileData.name}</h2>
            <p className="text-muted-foreground">{profileData.email}</p>
            <p className="text-sm text-muted-foreground mt-1">Role: {profileData.role}</p>
            <p className="text-sm text-muted-foreground">Status: {profileData.status}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-primary flex items-center gap-2"
          >
            <PencilIcon className="h-4 w-4" />
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {/* Editable Profile Form */}
        {isEditing && (
          <div className="admin-card p-6 space-y-4">
            <label>Name</label>
            <input
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <label>Email</label>
            <input
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <label>Phone</label>
            <input
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <label>Department</label>
            <input
              value={profileData.department}
              onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button onClick={handleSaveProfile} className="btn-primary mt-2">
              Save Changes
            </button>
          </div>
        )}

        {/* Activity Logs */}
        <div className="admin-card p-6">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <ClockIcon className="h-5 w-5" /> Recent Activity
          </h3>
          {activityLogs.length === 0 && <p>No activity logs found.</p>}
          <ul className="mt-2 space-y-2">
            {activityLogs.map((log, i) => (
              <li key={i} className="p-2 border rounded flex justify-between">
                <span>{log.action}</span>
                <span className="text-sm text-muted-foreground">{log.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Permissions */}
        <div className="admin-card p-6">
          <h3 className="font-semibold text-lg">Permissions</h3>
          <ul className="mt-2 space-y-2">
            {permissions.map((perm, i) => (
              <li key={i} className="p-2 border rounded flex justify-between">
                <span>{perm.module}</span>
                <span className="flex gap-1">
                  <span className={perm.read ? 'text-green-600' : 'text-gray-400'}>R</span>
                  <span className={perm.write ? 'text-yellow-600' : 'text-gray-400'}>W</span>
                  <span className={perm.delete ? 'text-red-600' : 'text-gray-400'}>D</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modals for Password & MPIN */}
        {showChangePassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-xl max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <input
                type="password"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => setShowChangePassword(false)} className="btn-secondary">Cancel</button>
                <button onClick={handleChangePassword} className="btn-primary">Update</button>
              </div>
            </div>
          </div>
        )}

        {showChangeMpin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-xl max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Change MPIN</h3>
              <PinInput length={4} onChange={setNewMpin} type="number" />
              <PinInput length={4} onChange={setConfirmMpin} type="number" />
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => setShowChangeMpin(false)} className="btn-secondary">Cancel</button>
                <button onClick={handleChangeMpin} className="btn-primary">Update</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
