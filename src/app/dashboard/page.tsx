'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// The main /dashboard route redirects to the appropriate flow.
// Guardian users land at /dashboard/guardian
// Institute users land at /dashboard/institute
export default function DashboardRoot() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/auth');
  }, [router]);
  return (
    <div className="min-h-screen bg-hero flex items-center justify-center text-white">
      <span className="text-gray-500 text-sm tracking-widest">Redirecting...</span>
    </div>
  );
}
