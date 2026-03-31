'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

const ADMIN_EMAILS = ['bryanbleong@gmail.com'];

export function AdminLink({ isCollapsed }: { isCollapsed?: boolean }) {
  const pathname = usePathname();

  // Read user from localStorage (auth-storage, zustand persist)
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('auth-storage');
      if (raw) {
        const parsed = JSON.parse(raw);
        const email = parsed?.state?.user?.email;
        if (email && ADMIN_EMAILS.includes(email.toLowerCase())) {
          setIsAdmin(true);
        }
      }
    } catch {
      // not logged in
    }
  }, []);

  if (!isAdmin) return null;

  const isActive = pathname === '/admin';

  return (
    <Link
      href="/admin"
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
        'text-gray-700 dark:text-gray-300',
        isActive
          ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Crown className="w-5 h-5 flex-shrink-0 text-amber-500" />
      {!isCollapsed && <span className="font-medium">Admin Dashboard</span>}
    </Link>
  );
}
