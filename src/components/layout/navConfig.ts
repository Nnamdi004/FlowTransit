import {
  AlertTriangle,
  Bell,
  Heart,
  History,
  LayoutDashboard,
  Map,
  Navigation,
  Route,
  UserCircle,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const appNavItems: NavItem[] = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/plan', label: 'Plan Trip', icon: Navigation },
  { to: '/app/routes', label: 'Routes', icon: Route },
  { to: '/app/map', label: 'Map', icon: Map },
  { to: '/app/incidents', label: 'Incidents', icon: AlertTriangle },
  { to: '/app/notifications', label: 'Notifications', icon: Bell },
  { to: '/app/favourites', label: 'Favourites', icon: Heart },
  { to: '/app/history', label: 'Trip History', icon: History },
  { to: '/app/profile', label: 'Profile', icon: UserCircle },
];

export const bottomNavItems: NavItem[] = [
  { to: '/app/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/app/plan', label: 'Plan', icon: Navigation },
  { to: '/app/map', label: 'Map', icon: Map },
  { to: '/app/incidents', label: 'Incidents', icon: AlertTriangle },
  { to: '/app/profile', label: 'Profile', icon: UserCircle },
];

export const adminNavItems: NavItem[] = [
  { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/incidents', label: 'Incidents', icon: AlertTriangle },
  { to: '/admin/routes', label: 'Routes', icon: Route },
];
