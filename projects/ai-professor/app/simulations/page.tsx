import { Metadata } from 'next';
import { getSupabaseAdmin } from '@/lib/supabase';
import type { Simulation } from '@/lib/simulation/types';

export const metadata: Metadata = {
  title: 'Executive Education — Simulations | CXO Academy',
  description: 'Immersive executive decision-making simulations with AI Adversary Mode.',
};

export const dynamic = 'force-dynamic';

export default async function SimulationsPage() {
  let sims: Simulation[] = [];
  try {
    const admin = getSupabaseAdmin();
    const { data } = await admin
      .from('simulations')
      .select('*')
      .order('created_at', { ascending: true });
    sims = (data || []) as Simulation[];
  } catch {
    sims = [];
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Executive <span className="text-amber-400">Simulations</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Where theory meets the war room. Make decisions under pressure. Face the AI adversary. Get scored on your executive performance.
          </p>
        </div>

        {sims.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-semibold">Coming Soon</span>
            </div>
            <p className="text-gray-500">
              Simulations are being built. Join the waitlist to be notified.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sims.map((sim) => (
              <a
                key={sim.id}
                href={`/simulations/${sim.id}`}
                className="block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-amber-500/50 transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded">
                    {sim.scenario_type}
                  </span>
                  <span className="text-xs text-gray-600">{sim.estimated_minutes} min</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{sim.title}</h3>
                <p className="text-sm text-gray-500">{sim.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
