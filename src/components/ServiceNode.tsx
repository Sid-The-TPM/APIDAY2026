'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getStatusColor, getStatusBgColor, getStatusTextColor, formatLatency } from '@/lib/utils';
import { APIService } from '@/types';

interface ServiceNodeProps {
  service: APIService;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export function ServiceNode({ service, isSelected, onSelect }: ServiceNodeProps) {
  const statusColor = getStatusColor(service.status);
  
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect?.(service.id)}
      className={`relative cursor-pointer ${getStatusBgColor(service.status)} border-2 ${getStatusTextColor(
        service.status
      )} rounded-lg p-4 backdrop-blur-xl ${
        isSelected ? 'ring-2 ring-neon-blue scale-105' : ''
      }`}
      style={{
        borderColor: statusColor,
        boxShadow: isSelected ? `0 0 20px ${statusColor}` : `0 0 10px ${statusColor}40`,
      }}
    >
      <div className="flex flex-col gap-2">
        {/* Service Name */}
        <div className="font-bold text-sm">{service.name}</div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: statusColor }}
          />
          <span className="text-xs font-mono">{service.status.toUpperCase()}</span>
        </div>

        {/* Metrics */}
        <div className="flex justify-between text-xs">
          <span>Latency: {formatLatency(service.latency)}</span>
          <span>Error: {(service.errorRate * 100).toFixed(1)}%</span>
        </div>

        {/* Trust Score */}
        <div className="flex items-center gap-1">
          <span className="text-xs">Trust:</span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-neon-blue"
              style={{ width: `${service.trustScore}%` }}
            />
          </div>
          <span className="text-xs font-mono">{service.trustScore}%</span>
        </div>

        {/* Version */}
        <div className="text-xs text-gray-400">v{service.version}</div>
      </div>
    </motion.div>
  );
}
