// import React, { useState } from 'react';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { BellIcon, PaperAirplaneIcon, CalendarIcon } from '@heroicons/react/24/outline';

// export const NotificationManagement = () => {
//   const [notification, setNotification] = useState({
//     title: '',
//     message: '',
//     type: 'push' as 'push' | 'sms' | 'email',
//     audience: 'all' as 'all' | 'segment' | 'single',
//     targetUser: '',
//     scheduled: false,
//     scheduleDate: '',
//     scheduleTime: ''
//   });

//   const sendNotification = () => {
//     console.log('Sending notification:', notification);
//     // Reset form
//     setNotification({
//       title: '',
//       message: '',
//       type: 'push',
//       audience: 'all',
//       targetUser: '',
//       scheduled: false,
//       scheduleDate: '',
//       scheduleTime: ''
//     });
//   };

//   return (
//     <AdminLayout title="Notification Management">
//       <div className="p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="admin-card p-6">
//             <div className="flex items-center gap-3 mb-6">
//               <BellIcon className="h-6 w-6 text-primary" />
//               <h2 className="text-xl font-semibold">Send Notification</h2>
//             </div>

//             <div className="space-y-6">
//               {/* Notification Type */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">Notification Type</label>
//                 <div className="grid grid-cols-3 gap-3">
//                   {(['push', 'sms', 'email'] as const).map((type) => (
//                     <button
//                       key={type}
//                       onClick={() => setNotification({ ...notification, type })}
//                       className={`p-3 rounded-lg border text-center capitalize ${
//                         notification.type === type
//                           ? 'border-primary bg-primary/10 text-primary'
//                           : 'border-border hover:bg-accent'
//                       }`}
//                     >
//                       {type} Notification
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">Title</label>
//                 <input
//                   type="text"
//                   value={notification.title}
//                   onChange={(e) => setNotification({ ...notification, title: e.target.value })}
//                   placeholder="Enter notification title..."
//                   className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                 />
//               </div>

//               {/* Message */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">Message</label>
//                 <textarea
//                   value={notification.message}
//                   onChange={(e) => setNotification({ ...notification, message: e.target.value })}
//                   placeholder="Enter notification message..."
//                   className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary h-32 resize-none"
//                 />
//               </div>

//               {/* Audience */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">Target Audience</label>
//                 <div className="grid grid-cols-3 gap-3 mb-4">
//                   {(['all', 'segment', 'single'] as const).map((audience) => (
//                     <button
//                       key={audience}
//                       onClick={() => setNotification({ ...notification, audience })}
//                       className={`p-3 rounded-lg border text-center capitalize ${
//                         notification.audience === audience
//                           ? 'border-primary bg-primary/10 text-primary'
//                           : 'border-border hover:bg-accent'
//                       }`}
//                     >
//                       {audience === 'all' ? 'All Users' : audience === 'segment' ? 'User Segment' : 'Single User'}
//                     </button>
//                   ))}
//                 </div>
                
//                 {notification.audience === 'single' && (
//                   <input
//                     type="text"
//                     value={notification.targetUser}
//                     onChange={(e) => setNotification({ ...notification, targetUser: e.target.value })}
//                     placeholder="Enter user ID or phone number..."
//                     className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                   />
//                 )}
//               </div>

//               {/* Schedule */}
//               <div className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   id="scheduled"
//                   checked={notification.scheduled}
//                   onChange={(e) => setNotification({ ...notification, scheduled: e.target.checked })}
//                   className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
//                 />
//                 <label htmlFor="scheduled" className="text-sm font-medium flex items-center gap-2">
//                   <CalendarIcon className="h-4 w-4" />
//                   Schedule for later
//                 </label>
//               </div>

//               {notification.scheduled && (
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Date</label>
//                     <input
//                       type="date"
//                       value={notification.scheduleDate}
//                       onChange={(e) => setNotification({ ...notification, scheduleDate: e.target.value })}
//                       className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Time</label>
//                     <input
//                       type="time"
//                       value={notification.scheduleTime}
//                       onChange={(e) => setNotification({ ...notification, scheduleTime: e.target.value })}
//                       className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Send Button */}
//               <button
//                 onClick={sendNotification}
//                 disabled={!notification.title || !notification.message}
//                 className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <PaperAirplaneIcon className="h-4 w-4" />
//                 {notification.scheduled ? 'Schedule Notification' : 'Send Now'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { BellIcon, PaperAirplaneIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface Notification {
  title: string;
  message: string;
  type: 'push' | 'sms' | 'email';
  audience: 'all' | 'segment' | 'single';
  targetUser: string;
  scheduled: boolean;
  scheduleDate: string;
  scheduleTime: string;
}

// ✅ Read flag from .env
const useMock = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export const NotificationManagement = () => {
  const [notification, setNotification] = useState<Notification>({
    title: '',
    message: '',
    type: 'push',
    audience: 'all',
    targetUser: '',
    scheduled: false,
    scheduleDate: '',
    scheduleTime: ''
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // ✅ Fetch existing notifications from backend (or mock)
  useEffect(() => {
    if (useMock) {
      setNotifications([]); // No mock notifications added
    } else {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/notifications`)
        .then(res => res.json())
        .then(data => setNotifications(data))
        .catch(err => console.error('Failed to fetch notifications', err));
    }
  }, []);

  // ✅ Send notification
  const sendNotification = () => {
    if (useMock) {
      console.log('Sending notification (mock):', notification);
      setNotifications(prev => [...prev, notification]); // update local list in mock mode
    } else {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notification)
      })
        .then(res => res.json())
        .then(data => {
          console.log('Notification sent:', data);
          setNotifications(prev => [...prev, data]);
        })
        .catch(err => console.error('Failed to send notification', err));
    }

    // Reset form
    setNotification({
      title: '',
      message: '',
      type: 'push',
      audience: 'all',
      targetUser: '',
      scheduled: false,
      scheduleDate: '',
      scheduleTime: ''
    });
  };

  return (
    <AdminLayout title="Notification Management">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="admin-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <BellIcon className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Send Notification</h2>
            </div>

            <div className="space-y-6">
              {/* Notification Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Notification Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['push', 'sms', 'email'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNotification({ ...notification, type })}
                      className={`p-3 rounded-lg border text-center capitalize ${
                        notification.type === type
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:bg-accent'
                      }`}
                    >
                      {type} Notification
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={notification.title}
                  onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                  placeholder="Enter notification title..."
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={notification.message}
                  onChange={(e) => setNotification({ ...notification, message: e.target.value })}
                  placeholder="Enter notification message..."
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary h-32 resize-none"
                />
              </div>

              {/* Audience */}
              <div>
                <label className="block text-sm font-medium mb-2">Target Audience</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {(['all', 'segment', 'single'] as const).map((audience) => (
                    <button
                      key={audience}
                      onClick={() => setNotification({ ...notification, audience })}
                      className={`p-3 rounded-lg border text-center capitalize ${
                        notification.audience === audience
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:bg-accent'
                      }`}
                    >
                      {audience === 'all' ? 'All Users' : audience === 'segment' ? 'User Segment' : 'Single User'}
                    </button>
                  ))}
                </div>

                {notification.audience === 'single' && (
                  <input
                    type="text"
                    value={notification.targetUser}
                    onChange={(e) => setNotification({ ...notification, targetUser: e.target.value })}
                    placeholder="Enter user ID or phone number..."
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                )}
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="scheduled"
                  checked={notification.scheduled}
                  onChange={(e) => setNotification({ ...notification, scheduled: e.target.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor="scheduled" className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Schedule for later
                </label>
              </div>

              {notification.scheduled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      value={notification.scheduleDate}
                      onChange={(e) => setNotification({ ...notification, scheduleDate: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <input
                      type="time"
                      value={notification.scheduleTime}
                      onChange={(e) => setNotification({ ...notification, scheduleTime: e.target.value })}
                      className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={sendNotification}
                disabled={!notification.title || !notification.message}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
                {notification.scheduled ? 'Schedule Notification' : 'Send Now'}
              </button>
            </div>
          </div>

          {/* Optionally show list of notifications */}
          {notifications.length > 0 && (
            <div className="admin-card p-6 mt-6">
              <h3 className="font-semibold mb-4">Sent Notifications</h3>
              <ul className="space-y-2">
                {notifications.map((n, idx) => (
                  <li key={idx} className="p-3 border border-border rounded-lg">
                    <strong>{n.title}</strong> ({n.type}) - {n.audience}  
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
