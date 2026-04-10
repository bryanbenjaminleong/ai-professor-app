'use client';

import React from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { SimulationPlayer } from '@/components/simulation/SimulationPlayer';
import { useParams } from 'next/navigation';

export default function SimulationPlayPage() {
  const params = useParams();
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Please sign in to access simulations.</p>
          <a href="/auth/signin" className="text-amber-400 hover:underline">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <main>
      <SimulationPlayer simulationId={params.id as string} userId={user.id} />
    </main>
  );
}
