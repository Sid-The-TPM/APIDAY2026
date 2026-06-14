'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCityStore } from '@/lib/store';
import { formatPercentage } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';

export function MetricsComparisonPanel() {
  const { metrics, metricsSnapshot, activeChaos } = useCityStore();

  const comparisons = useMemo(() => {
    if (!metricsSnapshot) return null;

    return [
      {
        label: 'Availability',
        before: metricsSnapshot.availability,
        after: metrics.availability,
        unit: '%',
      },
      {
        label: 'Trust Score',
        before: metricsSnapshot.trustScore,
        after: metrics.trustScore,
        unit: '%',
      },
      {
        label: 'SLA Compliance',
        before: metricsSnapshot.slaCompliance,
        after: metrics.slaCompliance,
        unit: '%',
      },
      {
        label: 'Policy Compliance',
        before: metricsSnapshot.policyCompliance,
        after: metrics.policyCompliance,
        unit: '%',
      },
      {
        label: 'Avg Latency',
        before: metricsSnapshot.averageLatency,
        after: metrics.averageLatency,
        unit: 'ms',
      },
      {
        label: 'Error Rate',
        before: (metricsSnapshot.errorRate * 100).toFixed(2),
        after: (metrics.errorRate * 100).toFixed(2),
        unit: '%',
      },
    ];
  }, [metricsSnapshot, metrics]);

  if (!metricsSnapshot || activeChaos.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mt-4 p-4 rounded border border-yellow-700 bg-yellow-900 bg-opacity-20"
    >
      <h3 className="text-sm font-bold text-neon-orange mb-4">
        📊 METRICS IMPACT ANALYSIS (Before vs After Chaos)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {comparisons && comparisons.mapp((comp) => {
          const diff = typeof comp.after === 'number'
            ? comp.after - parseFloat(String(comp.before))
            : 0;
          const isNegative = diff < 0;
          const isLatency = comp.label.includes('Latency');
          const isError = comp.label.includes('Error');

          // For latency and error, negative is actually bad (increase is bad)
          const isBad =
            (isLatency || isError) ? diff > 0 :
            diff < 0;

          return (
            <motion.div
              key={comp.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-3 rounded border ${
                isBad
                  ? 'border-neon-red bg-red-900 bg-opacity-20'
                  : 'border-neon-green bg-emerald-900 bg-opacity-20'
              }`}
            >
              <div className="text-xs font-bold text-gray-400 mb-2">
                {comp.label}
              </div>

              {/* Before and After Values */}
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="text-xs text-gray-500">Before</div>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2 }}
                    className="text-lg font-bold text-gray-300"
                  >
                    {comp.before}
                    <span className="text-xs ml-1">{comp.unit}</span>
                  </motion.div>
                </div>

                {/* Arrow */}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`mx-2 ${isBad ? 'text-neon-red' : 'text-neon-green'}`}
                >
                  {isBad ? (
                    <TrendingDown className="w-5 h-5" />
                  ) : (
                    <TrendingUp className="w-5 h-5" />
                  )}
                </motion.div>

                <div>
                  <div className="text-xs text-gray-500">After</div>
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: 1,
                    }}
                    transition={{ duration: 1.5 }}
                    className={`text-lg font-bold ${
                      isBad ? 'text-neon-red' : 'text-neon-green'
                    }`}
                  >
                    {comp.after}
                    <span className="text-xs ml-1">{comp.unit}</span>
                  </motion.div>
                </div>
              </div>

              {/* Delta Display */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`text-xs font-semibold ${
                  isBad
                    ? 'text-neon-red'
                    : 'text-neon-green'
                }`}
              >
                {isBad ? '↓' : '↑'} {Math.abs(diff).toFixed(2)}{comp.unit}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 p-3 rounded bg-dark-bg border border-gray-700 text-sm"
      >
        <span className="text-neon-orange font-bold">Active Chaos Events: </span>
        <span className="text-gray-300">{activeChaos.length}</span>
        <span className="text-gray-600 ml-4">
          System is under attack. {activeChaos.length} failures injected.
        </span>
      </motion.div>
    </motion.div>
  );
}
