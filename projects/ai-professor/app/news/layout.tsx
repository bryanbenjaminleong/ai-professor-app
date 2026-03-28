import { ReactNode } from 'react';

// Revalidate news pages every hour
export const revalidate = 3600;

interface NewsLayoutProps {
  children: ReactNode;
}

export default function NewsLayout({ children }: NewsLayoutProps) {
  return <>{children}</>;
}
