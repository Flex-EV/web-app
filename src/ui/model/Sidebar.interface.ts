import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  name: string;
  icon: LucideIcon;
  path: string;
}

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () =>       void;
}
