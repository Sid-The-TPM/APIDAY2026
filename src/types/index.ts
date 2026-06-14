// API and Service Types
export type StatusType = 'healthy' | 'degraded' | 'critical' | 'offline';
export type TrustLevel = 'critical' | 'trusted' | 'partners' | 'premium' | 'free';

export interface APIService {
  id: string;
  name: string;
  status: StatusType;
  latency: number;
  errorRate: number;
  version: string;
  authRequired: boolean;
  dependencies: string[];
  trustScore: number;
  maxLatency: number;
  availabilityTarget: number;
  lastEvent?: string;
  eventTimestamp?: number;
}

export interface WorkflowStep {
  id: string;
  name: string;
  apiId: string;
  status: 'pending' | 'executing' | 'completed' | 'failed' | 'retry';
  latency?: number;
  error?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: 'pending' | 'executing' | 'completed' | 'failed';
  startTime?: number;
  endTime?: number;
  totalLatency?: number;
}

export interface PolicyRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: string;
  active: boolean;
}

export interface TraceEvent {
  traceId: string;
  timestamp: number;
  service: string;
  event: string;
  status: StatusType;
  latency: number;
  metadata?: Record<string, any>;
}

export interface SystemMetrics {
  availability: number;
  trustScore: number;
  slaCompliance: number;
  policyCompliance: number;
  averageLatency: number;
  errorRate: number;
}

export interface CityState {
  // Services
  services: APIService[];
  
  // Workflows
  activeWorkflows: Workflow[];
  workflowHistory: Workflow[];
  
  // Events
  recentEvents: TraceEvent[];
  
  // Chaos state
  activeChaos: string[];
  
  // System metrics
  metrics: SystemMetrics;
  metricsSnapshot?: SystemMetrics; // Capture state before chaos
  
  // UI state
  selectedService?: string;
  selectedWorkflow?: string;
  mode: 'overview' | 'autonomous' | 'chaos';
  resilience: number;
}
