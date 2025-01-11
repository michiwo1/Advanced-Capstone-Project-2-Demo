'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navbar';

export function NavigationWrapper() {
  const pathname = usePathname();
  const showNavbar = pathname !== '/';

  return showNavbar ? <Navbar /> : null;
} 