'use client';

import { create } from 'zustand';
import { initialServices, initialWorkflows, initialPolicies } from '@/lib/config';
import { CityState, APIService, Workflow, StatusType, TraceEvent, SystemMetrics } from '@/types';

interface CityStore extends CityState {
  // Service actions
  updateServiceStatus: (serviceId: string, status: StatusType) => void;
  updateServiceLatency: (serviceId: string, latency: number) => void;
  updateServiceError: (serviceId: string, errorRate: number) => void;

  // Workflow actions
  executeWorkflow: (workflowId: string) => void;
  completeWorkflowStep: (workflowId: string, stepId: string, latency: number) => void;
  failWorkflowStep: (workflowId: string, stepId: string, error: string) => void;
  retryWorkflowStep: (workflowId: string, stepId: string) => void;

  // Event actions
  addEvent: (event: TraceEvent) => void;
  clearEvents: () => void;

  // Chaos actions
  addChaos: (chaosId: string) => void;
  removeChaos: (chaosId: string) => void;
  clearChaos: () => void;

  // Metrics actions
  updateMetrics: (metrics: Partial<SystemMetrics>) => void;
  updateResilience: (resilience: number) => void;
  snapshotMetrics: () => void;
  clearSnapshot: () => void;

  // UI actions
  selectService: (serviceId: string | undefined) => void;
  selectWorkflow: (workflowId: string | undefined) => void;
  setMode: (mode: 'overview' | 'autonomous' | 'chaos') => void;

  // Reset
  reset: () => void;
}

const initialMetrics: SystemMetrics = {
  availability: 96.5,
  trustScore: 82,
  slaCompliance: 94.2,
  policyCompliance: 98,
  averageLatency: 580,
  errorRate: 0.08,
};

const initialState: CityState = {
  services: initialServices,
  activeWorkflows: [],
  workflowHistory: [],
  recentEvents: [],
  activeChaos: [],
  metrics: initialMetrics,
  metricsSnapshot: undefined,
  mode: 'overview',
  resilience: 100,
};

export const useCityStore = create<CityStore>((set, get) => ({
  ...initialState,

  // Service actions
  updateServiceStatus: (serviceId, status) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === serviceId ? { ...s, status } : s
      ),
    })),

  updateServiceLatency: (serviceId, latency) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === serviceId ? { ...s, latency } : s
      ),
    })),

  updateServiceError: (serviceId, errorRate) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === serviceId ? { ...s, errorRate } : s
      ),
    })),

  // Workflow actions
  executeWorkflow: (workflowId) => {
    const workflow = initialWorkflows.find((w) => w.id === workflowId);
    if (!workflow) return;

    const newWorkflow: Workflow = {
      ...workflow,
      status: 'executing',
      startTime: Date.now(),
      steps: workflow.steps.map((step) => ({
        ...step,
        status: 'pending',
      })),
    };

    set((state) => ({
      activeWorkflows: [...state.activeWorkflows, newWorkflow],
      selectedWorkflow: workflowId,
    }));
  },

  completeWorkflowStep: (workflowId, stepId, latency) =>
    set((state) => ({
      activeWorkflows: state.activeWorkflows.map((w) =>
        w.id === workflowId
          ? {
              ...w,
              steps: w.steps.map((s) =>
                s.id === stepId ? { ...s, status: 'completed', latency } : s
              ),
            }
          : w
      ),
    })),

  failWorkflowStep: (workflowId, stepId, error) =>
    set((state) => ({
      activeWorkflows: state.activeWorkflows.map((w) =>
        w.id === workflowId
          ? {
              ...w,
              steps: w.steps.map((s) =>
                s.id === stepId ? { ...s, status: 'failed', error } : s
              ),
            }
          : w
      ),
    })),

  retryWorkflowStep: (workflowId, stepId) =>
    set((state) => ({
      activeWorkflows: state.activeWorkflows.map((w) =>
        w.id === workflowId
          ? {
              ...w,
              steps: w.steps.map((s) =>
                s.id === stepId ? { ...s, status: 'retry' } : s
              ),
            }
          : w
      ),
    })),

  // Event actions
  addEvent: (event) =>
    set((state) => ({
      recentEvents: [event, ...state.recentEvents.slice(0, 49)],
    })),

  clearEvents: () => set({ recentEvents: [] }),

  // Chaos actions
  addChaos: (chaosId) =>
    set((state) => ({
      activeChaos: [...state.activeChaos, chaosId],
      resilience: Math.max(0, state.resilience - 15),
      // Snapshot metrics on first chaos
      metricsSnapshot: state.activeChaos.length === 0 ? { ...state.metrics } : state.metricsSnapshot,
    })),

  removeChaos: (chaosId) =>
    set((state) => ({
      activeChaos: state.activeChaos.filter((c) => c !== chaosId),
      resilience: Math.min(100, state.resilience + 20),
    })),

  clearChaos: () =>
    set({
      activeChaos: [],
      resilience: 100,
      metricsSnapshot: undefined,
    }),

  // Metrics actions
  updateMetrics: (metrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...metrics },
    })),

  updateResilience: (resilience) =>
    set({ resilience: Math.max(0, Math.min(100, resilience)) }),

  snapshotMetrics: () =>
    set((state) => ({
      metricsSnapshot: { ...state.metrics },
    })),

  clearSnapshot: () =>
    set({ metricsSnapshot: undefined }),

  // UI actions
  selectService: (serviceId) => set({ selectedService: serviceId }),
  selectWorkflow: (workflowId) => set({ selectedWorkflow: workflowId }),
  setMode: (mode) => set({ mode }),

  // Reset
  reset: () => set(initialState),
}));
