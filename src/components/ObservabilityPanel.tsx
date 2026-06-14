'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCityStore } from '@/lib/store';
import { getStatusTextColor } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

export function ObservabilityPanel() {
  const { recentEvents, clearEvents } = useCityStore();

  const displayEvents = useMemo(() => {
    return recentEvents.slice(0, 30);
  }, [recentEvents]);

  const eventsByService = useMemo(() => {
    const grouped: Record<string, number> = {};
    displayEvents.forEach((event) => {
      grouped[event.service] = (grouped[event.service] || 0) + 1;
    });
    return grouped;
  }, [displayEvents]);

  return (
    <motion.div className="h-full w-full flex flex-col gap-4 p-6 overflow-y-auto">
      {/* Header */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }}>
        <h2 className="text-2xl font-bold text-neon-green mb-1">OBSERVABILITY</h2>
        <p className="text-sm text-gray-400">Distributed traces and event logs</p>
      </motion.div>

      {/* Event Stats */}
      <div className="grid grid-cols-2 gap-2">
        <motion.div className="bg-dark-secondary rounded p-3 border border-gray-700">
          <div className="text-xs text-gray-400">Total Events</div>
          <div className="text-xl font-bold text-neon-blue">{recentEvents.length}</div>
        </motion.div>
        <motion.div className="bg-dark-secondary rounded p-3 border border-gray-700">
          <div className="text-xs text-gray-400">Active Services</div>
          <div className="text-xl font-bold text-neon-green">{Object.keys(eventsByService).length}</div>
        </motion.div>
      </div>

      {/* Clear Button */}
      {recentEvents.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => clearEvents()}
          className="w-full px-3 py-2 rounded border border-gray-700 hover:border-neon-red hover:text-neon-red transition flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear Log
        </motion.button>
      )}

      {/* Event Log */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-gray-500 uppercase">Event Stream</h3>
        <motion.div className="space-y-1 max-h-96 overflow-y-auto">
          {displayEvents.length === 0 ? (
            <div className="text-xs text-gray-600 text-center py-8">No events yet</div>
          ) : (
            displayEvents.map((event, idx) => (
              <motion.div
                key={event.traceId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
                className={`text-xs p-2 rounded border-l-2 bg-opacity-20 ${getStatusTextColor(
                  event.status
                )} ${
                  event.status === 'healthy'
                    ? 'border-l-neon-green bg-emerald-900'
                    : event.status === 'degraded'
                    ? 'border-l-neon-orange bg-orange-900'
                    : 'border-l-neon-red bg-red-900'
                }`}
              >
                <div className="font-mono text-gray-400">{event.traceId}</div>
                <div className="font-semibold truncate">{event.event}</div>
                <div className="flex justify-between text-gray-500 mt-1">
                  <span>{event.service}</span>
                  {event.latency > 0 && <span>{event.latency}ms</span>}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
