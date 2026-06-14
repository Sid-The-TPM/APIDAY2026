'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCityStore } from '@/lib/store';
import { getStatusColor, getStatusTextColor } from '@/lib/utils';
import { X } from 'lucide-react';

export function ServiceDetailPanel() {
  const { services, selectedService, selectService } = useCityStore();
  
  const service = services.find((s) => s.id === selectedService);
  
  if (!service) return null;

  const statusColor = getStatusColor(service.status);
  const slaStatus = service.latency > service.maxLatency ? 'failed' : 'ok';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-6 right-6 w-96 max-h-96 rounded-lg border-2 shadow-2xl overflow-hidden ${getStatusTextColor(service.status)}`}
      style={{
        borderColor: statusColor,
        boxShadow: `0 0 30px ${statusColor}60`,
      }}
    >
      {/* Header */}
      <div className="bg-dark-secondary p-4 flex justify-between items-start border-b" style={{ borderBottomColor: statusColor }}>
        <div className="flex-1">
          <h3 className="text-lg font-bold">{service.name}</h3>
          <p className="text-xs text-gray-400">ID: {service.id}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => selectService(undefined)}
          className="p-1 hover:bg-dark-bg rounded"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto max-h-80 p-4 space-y-4">
        {/* Status & Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Status</span>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: statusColor }}
              />
              <span className="text-sm font-bold uppercase">{service.status}</span>
            </div>
          </div>
        </motion.div>

        {/* Latency */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-3 rounded bg-dark-bg border border-gray-700"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Latency</span>
            <span className="text-xs font-mono text-gray-500">
              Max: {service.maxLatency}ms | Target: &lt;800ms
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              key={service.latency}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-2xl font-bold ${
                slaStatus === 'failed' ? 'text-neon-red' : 'text-neon-green'
              }`}
            >
              {service.latency}ms
            </motion.div>
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(service.latency / service.maxLatency) * 100}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full ${
                  slaStatus === 'failed'
                    ? 'bg-neon-red'
                    : service.latency > 500
                    ? 'bg-neon-orange'
                    : 'bg-neon-green'
                }`}
              />
            </div>
          </div>
          {slaStatus === 'failed' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-neon-red mt-2 font-semibold"
            >
              ⚠️ SLA Violated (exceeds {service.maxLatency}ms max)
            </motion.p>
          )}
        </motion.div>

        {/* Error Rate */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-3 rounded bg-dark-bg border border-gray-700"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Error Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              key={service.errorRate}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-2xl font-bold ${
                service.errorRate > 0.1 ? 'text-neon-red' : 'text-neon-green'
              }`}
            >
              {(service.errorRate * 100).toFixed(2)}%
            </motion.div>
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(service.errorRate * 1000, 100)}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full ${
                  service.errorRate > 0.1 ? 'bg-neon-red' : 'bg-neon-green'
                }`}
              />
            </div>
          </div>
        </motion.div>

        {/* Trust Score */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-3 rounded bg-dark-bg border border-gray-700"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Trust Score</span>
            <motion.span
              key={service.trustScore}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`text-sm font-bold ${
                service.trustScore > 90 ? 'text-neon-green' : 'text-neon-orange'
              }`}
            >
              {service.trustScore}%
            </motion.span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${service.trustScore}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full ${
                service.trustScore > 90 ? 'bg-neon-green' : service.trustScore > 70 ? 'bg-neon-orange' : 'bg-neon-red'
              }`}
            />
          </div>
        </motion.div>

        {/* Version & Auth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between text-xs"
        >
          <div>
            <span className="text-gray-500">Version: </span>
            <span className="font-mono font-bold">{service.version}</span>
          </div>
          <div>
            <span className="text-gray-500">Auth: </span>
            <span className="font-bold">
              {service.authRequired ? (
                <span className="text-neon-green">Required ✓</span>
              ) : (
                <span className="text-gray-400">Not Required</span>
              )}
            </span>
          </div>
        </motion.div>

        {/* Dependencies */}
        {service.dependencies.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-2 border-t border-gray-700"
          >
            <span className="text-xs text-gray-500 block mb-2">Dependencies:</span>
            <div className="flex flex-wrap gap-2">
              {service.dependencies.map((dep) => (
                <span
                  key={dep}
                  className="text-xs px-2 py-1 rounded bg-dark-bg border border-gray-700"
                >
                  {dep}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
