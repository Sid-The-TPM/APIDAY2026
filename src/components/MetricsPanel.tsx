'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCityStore } from '@/lib/store';
import { calculateHealthScore, formatLatency, formatPercentage } from '@/lib/utils';
import { MetricsComparisonPanel } from '@/components/MetricsComparisonPanel';
import { Zap } from 'lucide-react';

export function MetricsPanel() {
  const { services, metrics, resilience, activeChaos } = useCityStore();

  const healthScore = useMemo(() => calculateHealthScore(services), [services]);
  const avgLatency = useMemo(() => {
    const total = services.reduce((sum, s) => sum + s.latency, 0);
    return total / services.length;
  }, [services]);

  const metricCards = [
    {
      label: 'System Health',
      value: healthScore,
      unit: '%',
      color: healthScore > 80 ? 'neon-green' : healthScore > 50 ? 'neon-orange' : 'neon-red',
    },
    {
      label: 'Resilience Score',
      value: Math.round(resilience),
      unit: '%',
      color: resilience > 70 ? 'neon-green' : resilience > 40 ? 'neon-orange' : 'neon-red',
    },
    {
      label: 'Availability',
      value: metrics.availability,
      unit: '%',
      color: metrics.availability > 99 ? 'neon-green' : 'neon-orange',
    },
    {
      label: 'Trust Score',
      value: metrics.trustScore,
      unit: '%',
      color: metrics.trustScore > 90 ? 'neon-green' : metrics.trustScore > 70 ? 'neon-orange' : 'neon-red',
    },
    {
      label: 'SLA Compliance',
      value: metrics.slaCompliance,
      unit: '%',
      color: metrics.slaCompliance > 99 ? 'neon-green' : 'neon-orange',
    },
    {
      label: 'Policy Compliance',
      value: metrics.policyCompliance,
      unit: '%',
      color: metrics.policyCompliance === 100 ? 'neon-green' : 'neon-orange',
    },
  ];

  return (
    <motion.div className="h-full w-full flex flex-col gap-4 p-6 overflow-y-auto">
      {/* Header */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }}>
        <h2 className="text-2xl font-bold text-neon-blue mb-1">SYSTEM METRICS</h2>
        <p className="text-sm text-gray-400">Real-time observability dashboard</p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {metricCards.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-dark-secondary border border-gray-700 rounded p-3"
          >
            <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
            <div className={`text-2xl font-bold text-${metric.color}`}>
              {metric.value.toFixed(1)}
              <span className="text-lg ml-1">{metric.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Average Latency */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-dark-secondary border border-gray-700 rounded p-4"
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="text-xs text-gray-400 mb-1">Average API Latency</div>
            <div className="text-3xl font-bold text-neon-blue">{formatLatency(avgLatency)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Error Rate</div>
            <div className="text-3xl font-bold text-neon-red">
              {formatPercentage(metrics.errorRate)}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Service Status Summary */}
      <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="mt-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Service Status Summary</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-900 bg-opacity-30 border border-neon-green rounded p-3 text-center">
            <div className="text-2xl font-bold text-neon-green">
              {services.filter((s) => s.status === 'healthy').length}
            </div>
            <div className="text-xs text-gray-400">Healthy</div>
          </div>
          <div className="bg-orange-900 bg-opacity-30 border border-neon-orange rounded p-3 text-center">
            <div className="text-2xl font-bold text-neon-orange">
              {services.filter((s) => s.status === 'degraded').length}
            </div>
            <div className="text-xs text-gray-400">Degraded</div>
          </div>
          <div className="bg-red-900 bg-opacity-30 border border-neon-red rounded p-3 text-center">
            <div className="text-2xl font-bold text-neon-red">
              {services.filter((s) => s.status === 'critical').length}
            </div>
            <div className="text-xs text-gray-400">Critical</div>
          </div>
          <div className="bg-gray-900 bg-opacity-30 border border-gray-600 rounded p-3 text-center">
            <div className="text-2xl font-bold text-gray-400">
              {services.filter((s) => s.status === 'offline').length}
            </div>
            <div className="text-xs text-gray-400">Offline</div>
          </div>
        </div>
      </motion.div>

      {/* Chaos Alert and Metrics Comparison */}
      {activeChaos.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 rounded border-l-4 border-l-neon-red bg-red-900 bg-opacity-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Zap className="w-5 h-5 text-neon-red" />
            </motion.div>
            <span className="font-bold text-neon-red">System Under Attack!</span>
          </div>
          <p className="text-xs text-gray-300">
            {activeChaos.length} failure scenario(s) active. Watch metrics degrade in real-time.
          </p>
        </motion.div>
      )}

      {/* Metrics Comparison Panel */}
      <MetricsComparisonPanel />
    </motion.div>
  );
}
