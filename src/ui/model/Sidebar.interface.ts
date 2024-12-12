import React from 'react';

export interface MenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

export interface SidebarProps {
  menuItems: MenuItem[];
  onItemClick?: (item: MenuItem) => void;
  logo?: string;
  brandName?: string;
}
