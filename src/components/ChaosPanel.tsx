'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCityStore } from '@/lib/store';
import { SimulationEngine } from '@/lib/simulation';
import { chaosOptions } from '@/lib/config';
import {
  Zap,
  AlertTriangle,
  Lock,
  AlertOctagon,
  Droplets,
  Copy,
  Clock,
  GitBranch,
  FileX,
  PowerOff,
  AlertCircle,
  CloudRain,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Zap,
  AlertTriangle,
  Lock,
  AlertOctagon,
  Droplets,
  Copy,
  Clock,
  GitBranch,
  FileX,
  PowerOff,
  AlertCircle,
  CloudRain,
};

export function ChaosPanel() {
  const { activeChaos, addChaos, removeChaos, clearChaos } = useCityStore();
  const [selectedChaos, setSelectedChaos] = useState<string | null>(null);

  const triggerChaos = (chaosId: string) => {
    switch (chaosId) {
      case 'latency-spike':
        SimulationEngine.injectLatency('traffic', 3000);
        break;
      case 'break-contract':
        SimulationEngine.breakContract('hospital');
        break;
      case 'expire-token':
        SimulationEngine.expireToken();
        break;
      case 'ddos-simulation':
        SimulationEngine.simulateDDoS();
        break;
      case 'drop-events':
        SimulationEngine.dropEvents(0.4);
        break;
      case 'duplicate-events':
        SimulationEngine.duplicateEvents();
        break;
      case 'timeout':
        SimulationEngine.serviceTimeout('payment');
        break;
      case 'version-drift':
        SimulationEngine.versionDrift('hospital');
        break;
      case 'schema-mismatch':
        SimulationEngine.schemaMismatch('hospital');
        break;
      case 'kill-payment':
        SimulationEngine.killService('payment');
        break;
      case 'compromise-sensor':
        SimulationEngine.compromiseSensor();
        break;
      case 'event-storm':
        SimulationEngine.triggerEventStorm();
        break;
    }
    setSelectedChaos(chaosId);
  };

  return (
    <motion.div className="h-full w-full flex flex-col gap-4 p-6 overflow-y-auto">
      {/* Header */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="mb-4">
        <h2 className="text-2xl font-bold text-neon-red mb-2">CHAOS CONTROL</h2>
        <p className="text-sm text-gray-400">Trigger failures. Watch the city respond.</p>
      </motion.div>

      {/* Active Chaos Count */}
      {activeChaos.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-900 bg-opacity-30 border border-neon-red rounded px-3 py-2"
        >
          <div className="text-sm">
            <span className="font-bold text-neon-red">{activeChaos.length}</span>
            <span className="text-gray-400"> active failure(s)</span>
          </div>
        </motion.div>
      )}

      {/* Clear All Button */}
      {activeChaos.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            clearChaos();
            activeChaos.forEach((chaos) => {
              SimulationEngine.initiateRecovery(chaos);
            });
          }}
          className="w-full px-4 py-2 bg-neon-green text-dark-bg font-bold rounded hover:bg-opacity-80 transition"
        >
          CLEAR ALL CHAOS & RECOVER
        </motion.button>
      )}

      {/* Chaos Buttons Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {chaosOptions.map((chaos, index) => {
          const Icon = iconMap[chaos.icon];
          const isActive = activeChaos.includes(chaos.id);

          return (
            <motion.button
              key={chaos.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: isActive ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isActive) {
                  removeChaos(chaos.id);
                  SimulationEngine.initiateRecovery(chaos.id);
                } else {
                  triggerChaos(chaos.id);
                }
              }}
              className={`p-3 rounded border-2 text-left transition ${
                isActive
                  ? 'bg-red-900 bg-opacity-40 border-neon-red text-white'
                  : 'bg-dark-secondary border-gray-700 hover:border-gray-600 text-gray-300'
              }`}
            >
              <div className="flex items-start gap-2">
                <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm">{chaos.name}</div>
                  <div className="text-xs text-gray-400 line-clamp-2">{chaos.description}</div>
                </div>
              </div>
              {isActive && <div className="text-xs font-bold text-neon-red mt-2">ACTIVE</div>}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
