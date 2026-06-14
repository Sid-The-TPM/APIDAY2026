import { useCityStore } from '@/lib/store';
import { StatusType, TraceEvent } from '@/types';

export class SimulationEngine {
  private store = useCityStore.getState();

  /**
   * Chaos Engine - Inject system faults
   */
  static injectLatency(serviceId: string, amount: number = 3000) {
    const store = useCityStore.getState();
    const service = store.services.find((s) => s.id === serviceId);
    if (service) {
      store.updateServiceLatency(serviceId, service.latency + amount);
      store.addChaos(`latency-${serviceId}`);
      this.createEvent({
        service: serviceId,
        event: `Latency spike: +${amount}ms`,
        status: 'degraded',
      });
    }
  }

  static breakContract(serviceId: string) {
    const store = useCityStore.getState();
    const service = store.services.find((s) => s.id === serviceId);
    if (service) {
      store.updateServiceStatus(serviceId, 'degraded');
      store.addChaos(`contract-${serviceId}`);
      this.createEvent({
        service: serviceId,
        event: 'Schema version mismatch detected',
        status: 'degraded',
      });
    }
  }

  static expireToken(serviceId: string = 'ambulance') {
    const store = useCityStore.getState();
    store.addChaos(`expired-token-${serviceId}`);
    this.createEvent({
      service: serviceId,
      event: 'Token expired - authentication failed',
      status: 'critical',
    });
    store.updateMetrics({
      trustScore: Math.max(0, (store.metrics.trustScore || 0) - 15),
    });
  }

  static simulateDDoS() {
    const store = useCityStore.getState();
    const eventBus = store.services.find((s) => s.id === 'eventbus');
    if (eventBus) {
      store.updateServiceLatency('eventbus', 2000);
      store.updateServiceError('eventbus', 0.2);
      store.addChaos('ddos');
      this.createEvent({
        service: 'eventbus',
        event: 'DDoS detected - event processing degraded',
        status: 'critical',
      });
    }
  }

  static dropEvents(dropRate: number = 0.4) {
    const store = useCityStore.getState();
    store.addChaos(`drop-events-${Date.now()}`);
    this.createEvent({
      service: 'eventbus',
      event: `${(dropRate * 100).toFixed(0)}% of events dropped`,
      status: 'critical',
    });
    const eventBus = store.services.find((s) => s.id === 'eventbus');
    if (eventBus) {
      store.updateServiceError('eventbus', eventBus.errorRate + dropRate);
    }
  }

  static duplicateEvents() {
    const store = useCityStore.getState();
    store.addChaos(`duplicate-events-${Date.now()}`);
    this.createEvent({
      service: 'eventbus',
      event: 'Duplicate events detected and rejected',
      status: 'degraded',
    });
  }

  static serviceTimeout(serviceId: string) {
    const store = useCityStore.getState();
    store.updateServiceStatus(serviceId, 'critical');
    store.updateServiceLatency(serviceId, 30000);
    store.addChaos(`timeout-${serviceId}`);
    this.createEvent({
      service: serviceId,
      event: 'Service timeout - request exceeded 30s',
      status: 'critical',
    });
  }

  static versionDrift(serviceId: string) {
    const store = useCityStore.getState();
    store.addChaos(`version-drift-${serviceId}`);
    this.createEvent({
      service: serviceId,
      event: 'API version mismatch - client expects v2, got v1',
      status: 'critical',
    });
  }

  static schemaMismatch(serviceId: string) {
    const store = useCityStore.getState();
    store.addChaos(`schema-mismatch-${serviceId}`);
    this.createEvent({
      service: serviceId,
      event: 'Schema validation failed - missing required fields',
      status: 'critical',
    });
  }

  static killService(serviceId: string) {
    const store = useCityStore.getState();
    store.updateServiceStatus(serviceId, 'offline');
    store.addChaos(`killed-${serviceId}`);
    this.createEvent({
      service: serviceId,
      event: 'Service completely unavailable',
      status: 'critical',
    });
    const cascadedServices = store.services.filter((s) =>
      s.dependencies.includes(serviceId)
    );
    cascadedServices.forEach((s) => {
      store.updateServiceStatus(s.id, 'degraded');
    });
  }

  static compromiseSensor() {
    const store = useCityStore.getState();
    store.addChaos('compromised-sensor');
    this.createEvent({
      service: 'sensor',
      event: 'Malicious data injection detected - sensor compromised',
      status: 'critical',
    });
    store.updateMetrics({
      trustScore: Math.max(0, (store.metrics.trustScore || 0) - 25),
    });
  }

  static triggerEventStorm() {
    const store = useCityStore.getState();
    const eventBus = store.services.find((s) => s.id === 'eventbus');
    if (eventBus) {
      store.updateServiceLatency('eventbus', eventBus.latency + 1000);
      store.updateServiceError('eventbus', 0.15);
    }
    store.addChaos('event-storm');
    this.createEvent({
      service: 'eventbus',
      event: 'Event storm detected - rapid event influx',
      status: 'critical',
    });
  }

  /**
   * Recovery Actions - System self-heal
   */
  static activateCircuitBreaker(serviceId: string) {
    const store = useCityStore.getState();
    store.updateServiceStatus(serviceId, 'degraded');
    this.createEvent({
      service: serviceId,
      event: 'Circuit breaker activated - preventing cascade',
      status: 'degraded',
    });
  }

  static activateFallback(serviceId: string, fallbackId: string) {
    const store = useCityStore.getState();
    this.createEvent({
      service: serviceId,
      event: `Fallback route activated via ${fallbackId}`,
      status: 'healthy',
    });
  }

  static retryWithBackoff(serviceId: string, attempt: number) {
    const store = useCityStore.getState();
    const backoffDelay = Math.pow(2, attempt) * 100;
    this.createEvent({
      service: serviceId,
      event: `Retry attempt ${attempt} after ${backoffDelay}ms backoff`,
      status: 'degraded',
    });
  }

  static validateAndRejectRequest(serviceId: string, reason: string) {
    const store = useCityStore.getState();
    this.createEvent({
      service: serviceId,
      event: `Request rejected: ${reason}`,
      status: 'critical',
    });
  }

  /**
   * Event Creation
   */
  private static createEvent(options: {
    service: string;
    event: string;
    status: StatusType;
    latency?: number;
  }) {
    const store = useCityStore.getState();
    const traceEvent: TraceEvent = {
      traceId: `TRC-${Date.now()}`,
      timestamp: Date.now(),
      service: options.service,
      event: options.event,
      status: options.status,
      latency: options.latency || 0,
    };
    store.addEvent(traceEvent);
  }

  /**
   * Metrics Update
   */
  static updateMetricsFromChaos(activeChaosCount: number) {
    const store = useCityStore.getState();
    const availabilityReduction = activeChaosCount * 5;
    store.updateMetrics({
      availability: Math.max(99, 99.9 - availabilityReduction),
      slaCompliance: Math.max(90, 99.5 - (activeChaosCount * 3)),
      policyCompliance: Math.max(85, 100 - (activeChaosCount * 8)),
    });
  }

  /**
   * Recovery Mode
   */
  static initiateRecovery(chaosId: string) {
    const store = useCityStore.getState();
    store.removeChaos(chaosId);

    // Heal affected services gradually
    setTimeout(() => {
      this.createEvent({
        service: 'system',
        event: 'System recovery initiated',
        status: 'healthy',
      });
    }, 500);

    setTimeout(() => {
      const healthyServices = store.services.filter((s) => s.status !== 'offline');
      healthyServices.forEach((s) => {
        if (s.status === 'critical') {
          store.updateServiceStatus(s.id, 'degraded');
        } else if (s.status === 'degraded') {
          store.updateServiceStatus(s.id, 'healthy');
        }
      });
      this.createEvent({
        service: 'system',
        event: 'Services restored to healthy state',
        status: 'healthy',
      });
    }, 1500);

    setTimeout(() => {
      store.updateMetrics({
        availability: 99.9,
        slaCompliance: 99.5,
        policyCompliance: 100,
      });
    }, 2500);
  }
}
