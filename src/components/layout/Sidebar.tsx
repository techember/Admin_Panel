import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  DocumentCheckIcon,
  WalletIcon,
  CreditCardIcon,
  CogIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  BellIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapsed: () => void;
  className?: string;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'User Management', href: '/users', icon: UsersIcon },
  { name: 'KYC Management', href: '/kyc', icon: DocumentCheckIcon },
  { name: 'Wallet Management', href: '/wallet', icon: WalletIcon },
  { name: 'Transactions', href: '/transactions', icon: CreditCardIcon },
  { name: 'Commission Settings', href: '/commission', icon: CogIcon },
  { name: 'Service Control', href: '/services', icon: WrenchScrewdriverIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Referral & Cashback', href: '/referral', icon: UserPlusIcon },
  { name: 'Support & Feedback', href: '/support', icon: ChatBubbleLeftRightIcon },
  { name: 'CMS Management', href: '/cms', icon: DocumentTextIcon },
  { name: 'Notifications', href: '/notifications', icon: BellIcon },
  { name: 'Admin Profile', href: '/profile', icon: UserIcon }
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  isCollapsed, 
  onClose, 
  onToggleCollapsed, 
  className = '' 
}) => {
  const location = useLocation();
  const { logout } = useAuth();
  const focusTrapRef = useFocusTrap(isOpen);

  const handleLogout = () => {
    logout();
  };

  // Mobile overlay
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <div
        ref={focusTrapRef}
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-primary text-primary-foreground transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${className}`}
        id="sidebar"
      >
        <SidebarContent onItemClick={onClose} isCollapsed={false} onToggleCollapsed={onToggleCollapsed} />
      </div>
    </>
  );

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div
      className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 bg-primary text-primary-foreground transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-72'
      } ${className}`}
      id="sidebar"
    >
      <SidebarContent onItemClick={() => {}} isCollapsed={isCollapsed} onToggleCollapsed={onToggleCollapsed} />
    </div>
  );

  const SidebarContent = ({ 
    onItemClick, 
    isCollapsed, 
    onToggleCollapsed 
  }: { 
    onItemClick: () => void; 
    isCollapsed: boolean; 
    onToggleCollapsed: () => void; 
  }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary-foreground/10">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">A</span>
            </div>
            <span className="ml-2 text-xl font-bold">Admin Panel</span>
          </div>
        )}
        
        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapsed}
          className="hidden lg:flex p-1.5 rounded-md hover:bg-primary-hover transition-colors"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto admin-scrollbar p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onItemClick}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary-foreground/10 text-primary-foreground'
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/5 hover:text-primary-foreground'
                  }`
                }
              >
                <item.icon 
                  className={`h-5 w-5 flex-shrink-0 ${
                    isCollapsed ? '' : 'mr-3'
                  } ${isActive ? 'text-primary-foreground' : 'text-primary-foreground/70'}`} 
                />
                {!isCollapsed && (
                  <span className="truncate">{item.name}</span>
                )}
                {isCollapsed && (
                  <span className="sr-only">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-primary-foreground/10">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/5 hover:text-primary-foreground transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon 
            className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} 
          />
          {!isCollapsed && <span>Logout</span>}
          {isCollapsed && <span className="sr-only">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  );
};