import { useCityStore } from '@/lib/store';
import { initialPolicies } from '@/lib/config';
import { SimulationEngine } from '@/lib/simulation';

export class PolicyEngine {
  static evaluatePolicies() {
    const store = useCityStore.getState();
    const activePolicies = initialPolicies.filter((p) => p.active);

    activePolicies.forEach((policy) => {
      this.evaluatePolicy(policy.id);
    });
  }

  private static evaluatePolicy(policyId: string) {
    const policy = initialPolicies.find((p) => p.id === policyId);
    if (!policy) return;

    const store = useCityStore.getState();

    switch (policy.id) {
      case 'policy-1': // Emergency Response Priority
        this.handleEmergencyPriority();
        break;
      case 'policy-2': // Schema Version Validation
        this.handleSchemaValidation();
        break;
      case 'policy-3': // Latency SLA Enforcement
        this.handleLatencySLA();
        break;
      case 'policy-4': // Token Expiration
        this.handleTokenExpiration();
        break;
      case 'policy-5': // Untrusted Callbacks
        this.handleUntrustedCallbacks();
        break;
      case 'policy-6': // Duplicate Event Rejection
        this.handleDuplicateEvents();
        break;
      case 'policy-7': // Audit Trail
        this.handleAuditTrail();
        break;
    }
  }

  private static handleEmergencyPriority() {
    const store = useCityStore.getState();
    const workflow = store.activeWorkflows.find((w) =>
      w.name.includes('Emergency')
    );
    if (workflow) {
      // Increase priority by reducing step latencies
      const latencyReduction = 0.8;
      // Workflow steps would complete faster
    }
  }

  private static handleSchemaValidation() {
    const store = useCityStore.getState();
    const hospitalApi = store.services.find((s) => s.id === 'hospital');
    if (hospitalApi && hospitalApi.version !== 'v2') {
      SimulationEngine.validateAndRejectRequest(
        'hospital',
        'Schema mismatch - expected v2'
      );
    }
  }

  private static handleLatencySLA() {
    const store = useCityStore.getState();
    const maxLatency = 800;

    store.services.forEach((service) => {
      if (service.latency > maxLatency && service.status === 'healthy') {
        store.updateServiceStatus(service.id, 'degraded');
        SimulationEngine.activateCircuitBreaker(service.id);
      }
    });
  }

  private static handleTokenExpiration() {
    const store = useCityStore.getState();
    // In a real system, check token timestamps
    // For demo, we simulate token expiration events
  }

  private static handleUntrustedCallbacks() {
    const store = useCityStore.getState();
    // Block callbacks from untrusted domains
    // Create security event
  }

  private static handleDuplicateEvents() {
    const store = useCityStore.getState();
    // Check for duplicate event IDs
    const eventIds = new Set();
    const duplicateCount = store.recentEvents.filter((event) => {
      if (eventIds.has(event.traceId)) {
        return true;
      }
      eventIds.add(event.traceId);
      return false;
    }).length;

    if (duplicateCount > 0) {
      // Log rejection
    }
  }

  private static handleAuditTrail() {
    const store = useCityStore.getState();
    const dispatchWorkflows = store.activeWorkflows.filter((w) =>
      w.name.includes('Dispatch')
    );

    dispatchWorkflows.forEach((workflow) => {
      // Ensure all steps are audited
      workflow.steps.forEach((step) => {
        // Dispatch would be audited
      });
    });
  }

  static recordPolicyDecision(
    policyId: string,
    decision: 'allowed' | 'blocked' | 'fallback',
    details: string
  ) {
    const store = useCityStore.getState();
    const decisionEvent = {
      traceId: `POLICY-${Date.now()}`,
      timestamp: Date.now(),
      service: 'policy-engine',
      event: `[${decision.toUpperCase()}] ${details}`,
      status: decision === 'blocked' ? ('critical' as const) : ('healthy' as const),
      latency: 0,
    };
    store.addEvent(decisionEvent);
  }
}
