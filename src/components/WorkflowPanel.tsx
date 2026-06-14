'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCityStore } from '@/lib/store';
import { WorkflowEngine } from '@/lib/workflow';
import { initialWorkflows } from '@/lib/config';
import { Play, Pause } from 'lucide-react';

export function WorkflowPanel() {
  const { activeWorkflows, selectWorkflow, selectedWorkflow } = useCityStore();

  const displayWorkflows = useMemo(() => {
    return [
      ...activeWorkflows.sort((a, b) => (b.startTime || 0) - (a.startTime || 0)),
    ];
  }, [activeWorkflows]);

  const handleStartWorkflow = (workflowId: string) => {
    WorkflowEngine.startWorkflow(workflowId);
  };

  return (
    <motion.div className="h-full w-full flex flex-col gap-4 p-6 overflow-y-auto">
      {/* Header */}
      <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="mb-2">
        <h2 className="text-2xl font-bold text-neon-blue mb-1">WORKFLOW ORCHESTRATION</h2>
        <p className="text-sm text-gray-400">
          {displayWorkflows.length === 0
            ? 'No active workflows. Start one below.'
            : `${displayWorkflows.length} workflow(s) executing`}
        </p>
      </motion.div>

      {/* Active Workflows */}
      {displayWorkflows.length > 0 && (
        <div className="space-y-3">
          {displayWorkflows.map((workflow) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => selectWorkflow(workflow.id)}
              className={`border rounded p-3 cursor-pointer transition ${
                selectedWorkflow === workflow.id
                  ? 'border-neon-blue bg-blue-900 bg-opacity-20'
                  : 'border-gray-700 bg-dark-secondary hover:border-gray-600'
              }`}
            >
              <div className="font-bold mb-2">{workflow.name}</div>

              {/* Progress */}
              <div className="mb-2">
                <div className="text-xs text-gray-400 mb-1">
                  {workflow.steps.filter((s) => s.status === 'completed').length} /{' '}
                  {workflow.steps.length} steps
                </div>
                <div className="h-2 bg-gray-800 rounded overflow-hidden">
                  <div
                    className="h-full bg-neon-blue transition-all"
                    style={{
                      width: `${
                        (workflow.steps.filter((s) => s.status === 'completed').length /
                          workflow.steps.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="text-xs space-y-1 max-h-24 overflow-y-auto">
                {workflow.steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        step.status === 'completed'
                          ? 'bg-neon-green'
                          : step.status === 'failed'
                          ? 'bg-neon-red'
                          : step.status === 'executing'
                          ? 'bg-neon-blue animate-pulse'
                          : 'bg-gray-600'
                      }`}
                    />
                    <span className="flex-1 truncate text-gray-300">{step.name}</span>
                    {step.latency && (
                      <span className="text-gray-500 font-mono">{step.latency}ms</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Available Workflows to Start */}
      <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="mt-4">
        <h3 className="text-sm font-bold text-neon-purple mb-3 uppercase">Start Workflow</h3>
        <div className="space-y-2">
          {initialWorkflows.map((workflow) => (
            <motion.button
              key={workflow.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStartWorkflow(workflow.id)}
              className="w-full px-3 py-2 rounded border border-gray-700 bg-dark-secondary hover:border-neon-purple hover:bg-opacity-50 transition flex items-center gap-2 text-left"
            >
              <Play className="w-4 h-4 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm">{workflow.name}</div>
                <div className="text-xs text-gray-400 line-clamp-1">{workflow.description}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
