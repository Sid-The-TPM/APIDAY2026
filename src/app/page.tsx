'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LandingScreen } from '@/components/LandingScreen';
import { ServiceGraph } from '@/components/ServiceGraph';
import { ServiceDetailPanel } from '@/components/ServiceDetailPanel';
import { WorkflowPanel } from '@/components/WorkflowPanel';
import { ChaosPanel } from '@/components/ChaosPanel';
import { ObservabilityPanel } from '@/components/ObservabilityPanel';
import { PoliciesPanel } from '@/components/PoliciesPanel';
import { MetricsPanel } from '@/components/MetricsPanel';
import { useCityStore } from '@/lib/store';
import { PolicyEngine } from '@/lib/policy';
import { Map, Workflow, Zap, Eye, Shield, TrendingUp, Menu } from 'lucide-react';

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'map' | 'workflow' | 'chaos' | 'observability' | 'policies' | 'metrics'
  >('map');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { metrics, updateMetrics } = useCityStore();

  // Simulate policy evaluation
  useEffect(() => {
    const interval = setInterval(() => {
      PolicyEngine.evaluatePolicies();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics({
        errorRate: Math.max(0, metrics.errorRate + (Math.random() - 0.45) * 0.01),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [metrics, updateMetrics]);

  const tabs = [
    { id: 'map', label: 'City Map', icon: Map },
    { id: 'workflow', label: 'Workflows', icon: Workflow },
    { id: 'chaos', label: 'Chaos', icon: Zap },
    { id: 'observability', label: 'Observability', icon: Eye },
    { id: 'policies', label: 'Governance', icon: Shield },
    { id: 'metrics', label: 'Metrics', icon: TrendingUp },
  ] as const;

  if (showLanding) {
    return <LandingScreen onEnter={() => setShowLanding(false)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen flex bg-dark-bg overflow-hidden"
    >
      {/* Sidebar Navigation */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`hidden lg:flex flex-col w-48 bg-dark-secondary border-r border-gray-800 p-4 gap-2 overflow-y-auto`}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-black text-neon-blue mb-4 neon-glow"
        >
          CITYPULSE
        </motion.h1>

        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded flex items-center gap-3 transition ${
                activeTab === tab.id
                  ? 'bg-neon-blue text-dark-bg font-bold'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-dark-bg'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <motion.div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-dark-secondary">
          <h1 className="text-lg font-black text-neon-blue neon-glow">CITYPULSE X</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-dark-bg rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Mobile Tab Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-dark-secondary border-b border-gray-800 overflow-hidden"
            >
              <div className="flex overflow-x-auto p-2 gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-3 py-2 rounded flex items-center gap-2 whitespace-nowrap text-xs transition ${
                        activeTab === tab.id
                          ? 'bg-neon-blue text-dark-bg font-bold'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-dark-bg'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Panel */}
        <motion.div className="flex-1 relative overflow-hidden bg-dark-bg">
          <AnimatePresence mode="wait">
            {activeTab === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <ServiceGraph />
              </motion.div>
            )}
            {activeTab === 'workflow' && (
              <motion.div
                key="workflow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <WorkflowPanel />
              </motion.div>
            )}
            {activeTab === 'chaos' && (
              <motion.div
                key="chaos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <ChaosPanel />
              </motion.div>
            )}
            {activeTab === 'observability' && (
              <motion.div
                key="observability"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <ObservabilityPanel />
              </motion.div>
            )}
            {activeTab === 'policies' && (
              <motion.div
                key="policies"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <PoliciesPanel />
              </motion.div>
            )}
            {activeTab === 'metrics' && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <MetricsPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Service Detail Panel - Shows when a service is selected */}
        <ServiceDetailPanel />
      </div>
    </motion.div>
  );
}
