import React from 'react';
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  title: string;
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, onSidebarToggle, sidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-primary text-primary-foreground flex items-center justify-between px-4 lg:px-6 shadow-lg relative z-30">
      {/* Left - Profile Avatar (Sidebar Toggle) */}
      <div className="flex items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          aria-label="Toggle sidebar menu"
        >
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full border-2 border-primary-foreground/20"
          />
        </button>
        
        {/* Page Title */}
        <h1 className="text-xl font-semibold hidden sm:block">{title}</h1>
      </div>

      {/* Center - Page Title (Mobile) */}
      <div className="flex-1 text-center sm:hidden">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Right - Search & Notifications */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-primary-foreground/60" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 rounded-lg bg-primary-hover text-primary-foreground placeholder-primary-foreground/60 border border-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 focus:border-transparent"
          />
        </div>

        {/* Mobile Search */}
        <button className="md:hidden p-2 rounded-lg hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground/20">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-lg hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground/20">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-warning text-warning-foreground rounded-full text-xs font-semibold flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};