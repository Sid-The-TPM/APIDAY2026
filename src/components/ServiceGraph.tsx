'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ServiceNode } from '@/components/ServiceNode';
import { useCityStore } from '@/lib/store';

export function ServiceGraph() {
  const { services, selectedService, selectService } = useCityStore();
  
  // Create a grid layout for services
  const gridItems = useMemo(() => {
    const groups = {
      coreServices: ['traffic', 'hospital', 'ambulance', 'sensor'],
      infrastructure: ['eventbus', 'policy', 'audit', 'notification'],
      external: ['weather', 'payment', 'auth', 'power'],
    };
    return groups;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full flex flex-col gap-6 p-6 overflow-y-auto"
    >
      {/* Hero Title */}
      <motion.div className="text-center mb-4" initial={{ y: -20 }} animate={{ y: 0 }}>
        <h2 className="text-3xl font-bold neon-glow mb-2">CITYPULSE X</h2>
        <p className="text-sm text-gray-400">Autonomous API City - Real-Time System Architecture</p>
      </motion.div>

      {/* Core Services */}
      <div>
        <h3 className="text-sm font-bold text-neon-blue mb-3 uppercase">Core Services</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {gridItems.coreServices.map((serviceId) => {
            const service = services.find((s) => s.id === serviceId);
            if (!service) return null;
            return (
              <ServiceNode
                key={service.id}
                service={service}
                isSelected={selectedService === service.id}
                onSelect={selectService}
              />
            );
          })}
        </div>
      </div>

      {/* Infrastructure */}
      <div>
        <h3 className="text-sm font-bold text-neon-purple mb-3 uppercase">Infrastructure & Orchestration</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {gridItems.infrastructure.map((serviceId) => {
            const service = services.find((s) => s.id === serviceId);
            if (!service) return null;
            return (
              <ServiceNode
                key={service.id}
                service={service}
                isSelected={selectedService === service.id}
                onSelect={selectService}
              />
            );
          })}
        </div>
      </div>

      {/* External/Platform Services */}
      <div>
        <h3 className="text-sm font-bold text-neon-green mb-3 uppercase">External & Platform Services</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {gridItems.external.map((serviceId) => {
            const service = services.find((s) => s.id === serviceId);
            if (!service) return null;
            return (
              <ServiceNode
                key={service.id}
                service={service}
                isSelected={selectedService === service.id}
                onSelect={selectService}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
