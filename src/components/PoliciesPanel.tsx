'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCityStore } from '@/lib/store';
import { initialPolicies } from '@/lib/config';
import { Check, X } from 'lucide-react';

export function PoliciesPanel() {
  const { recentEvents } = useCityStore();

  // Count policy violations in recent events
  const violations = recentEvents.filter((e) => e.event.includes('Schema') || e.event.includes('rejected')).length;

  return (
    <motion.div className="h-full w-full flex flex-col gap-4 p-6 overflow-y-auto">
      {/* Header */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }}>
        <h2 className="text-2xl font-bold text-neon-purple mb-1">GOVERNANCE & POLICIES</h2>
        <p className="text-sm text-gray-400">Rules that keep the city safe</p>
      </motion.div>

      {/* Policy Stats */}
      <div className="grid grid-cols-2 gap-2">
        <motion.div className="bg-dark-secondary rounded p-3 border border-gray-700">
          <div className="text-xs text-gray-400">Active Policies</div>
          <div className="text-xl font-bold text-neon-green">
            {initialPolicies.filter((p) => p.active).length}
          </div>
        </motion.div>
        <motion.div className="bg-dark-secondary rounded p-3 border border-gray-700">
          <div className="text-xs text-gray-400">Violations Logged</div>
          <div className={`text-xl font-bold ${violations > 0 ? 'text-neon-red' : 'text-neon-green'}`}>
            {violations}
          </div>
        </motion.div>
      </div>

      {/* Policies List */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase">Policy Rules</h3>
        <motion.div className="space-y-2 max-h-96 overflow-y-auto">
          {initialPolicies.map((policy) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded border ${
                policy.active
                  ? 'border-neon-green bg-emerald-900 bg-opacity-20'
                  : 'border-gray-700 bg-dark-secondary bg-opacity-50 opacity-60'
              }`}
            >
              {/* Policy Header */}
              <div className="flex items-start gap-2 mb-1">
                {policy.active ? (
                  <Check className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
                ) : (
                  <X className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{policy.name}</div>
                  <div className="text-xs text-gray-400">{policy.description}</div>
                </div>
              </div>

              {/* Policy Details */}
              <div className="text-xs font-mono text-gray-500 mt-2 space-y-1 pl-6">
                <div className="text-gray-600">
                  if: <span className="text-gray-400">{policy.condition}</span>
                </div>
                <div className="text-gray-600">
                  then: <span className="text-gray-400">{policy.action}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
