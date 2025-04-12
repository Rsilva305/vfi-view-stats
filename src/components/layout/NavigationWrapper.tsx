'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

interface NavigationWrapperProps {
  children: React.ReactNode;
}

export default function NavigationWrapper({ children }: NavigationWrapperProps) {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <TopNav collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
} 