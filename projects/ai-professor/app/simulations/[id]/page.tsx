'use client';

import React from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { SimulationPlayer } from '@/components/simulation/SimulationPlayer';
import { useParams } from 'next/navigation';

export default function SimulationPlayPage() {
  const params = useParams();
  const user = useAuthStore((s) => s.user);

  return (
    <main>
      <SimulationPlayer
        simulationId={params.id as string}
        userId={user?.id || user?.email || 'anonymous'}
      />
    </main>
  );
}
