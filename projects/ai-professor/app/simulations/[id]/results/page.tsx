'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { SimulationResults } from '@/components/simulation/SimulationResults';
import type { SimulationProgress } from '@/lib/simulation/types';

export default function SimulationResultsPage() {
  const params = useParams();
  const simulationId = params.id as string;

  const { data: simData, isLoading: simLoading } = useQuery({
    queryKey: ['simulation', simulationId],
    queryFn: async () => {
      const res = await fetch(`/api/simulations/${simulationId}`);
      const json = await res.json();
      return json.data?.simulation || json.simulation;
    },
  });

  const { data: progressData, isLoading: progLoading } = useQuery({
    queryKey: ['simulation-progress', simulationId],
    queryFn: async () => {
      const res = await fetch(`/api/simulations/${simulationId}/progress`);
      const json = await res.json();
      return json.data?.progress || json.progress;
    },
  });

  if (simLoading || progLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!simData || !progressData) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-500">Results not found.</p>
      </div>
    );
  }

  return (
    <SimulationResults
      simulationTitle={simData.title}
      progress={progressData as SimulationProgress}
    />
  );
}
