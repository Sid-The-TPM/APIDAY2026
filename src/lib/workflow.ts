import { useCityStore } from '@/lib/store';
import { initialWorkflows } from '@/lib/config';
import { SimulationEngine } from '@/lib/simulation';

export class WorkflowEngine {
  static startWorkflow(workflowId: string) {
    const store = useCityStore.getState();
    store.executeWorkflow(workflowId);

    const workflow = initialWorkflows.find((w) => w.id === workflowId);
    if (!workflow) return;

    // Simulate step execution
    let delay = 500;
    workflow.steps.forEach((step, index) => {
      setTimeout(() => {
        this.executeStep(workflowId, step.id);
      }, delay);
      delay += 400 + Math.random() * 600;
    });
  }

  private static executeStep(workflowId: string, stepId: string) {
    const store = useCityStore.getState();
    const workflow = store.activeWorkflows.find((w) => w.id === workflowId);
    const step = workflow?.steps.find((s) => s.id === stepId);

    if (!workflow || !step) return;

    const service = store.services.find((s) => s.id === step.apiId);
    if (!service) return;

    // Simulate execution
    const baseLatency = Math.random() * 200 + 100;
    const chaosMultiplier = store.activeChaos.length > 0 ? 1.5 : 1;
    const totalLatency = Math.ceil(baseLatency * chaosMultiplier);

    // Check for failures based on service status
    const failureChance = this.getFailureChance(service.status);

    setTimeout(() => {
      if (Math.random() < failureChance) {
        store.failWorkflowStep(
          workflowId,
          stepId,
          this.getErrorMessage(service.status)
        );

        // Attempt retry
        if (store.activeChaos.length < 5) {
          setTimeout(() => {
            store.retryWorkflowStep(workflowId, stepId);
            this.executeStep(workflowId, stepId);
          }, 1000);
        }
      } else {
        store.completeWorkflowStep(workflowId, stepId, totalLatency);
      }

      // Check if all steps are done
      const allSteps = store.activeWorkflows
        .find((w) => w.id === workflowId)
        ?.steps.filter((s) => ['completed', 'failed'].includes(s.status));
      if (allSteps?.length === workflow.steps.length) {
        this.completeWorkflow(workflowId);
      }
    }, totalLatency);
  }

  private static getFailureChance(status: string): number {
    switch (status) {
      case 'healthy':
        return 0.05;
      case 'degraded':
        return 0.25;
      case 'critical':
        return 0.6;
      case 'offline':
        return 1;
      default:
        return 0.1;
    }
  }

  private static getErrorMessage(status: string): string {
    switch (status) {
      case 'degraded':
        return 'Service latency exceeded SLA';
      case 'critical':
        return 'Circuit breaker open - service unavailable';
      case 'offline':
        return 'Service unreachable';
      default:
        return 'Unknown error';
    }
  }

  private static completeWorkflow(workflowId: string) {
    const store = useCityStore.getState();
    const workflow = store.activeWorkflows.find((w) => w.id === workflowId);
    if (workflow) {
      const endTime = Date.now();
      const totalLatency = (endTime - (workflow.startTime || Date.now())) / 1000;

      // Move to history
      store.workflowHistory.push({
        ...workflow,
        status: 'completed',
        endTime,
        totalLatency,
      });

      // Remove from active
      const updatedActiveWorkflows = store.activeWorkflows.filter(
        (w) => w.id !== workflowId
      );
      useCityStore.setState({ activeWorkflows: updatedActiveWorkflows });
    }
  }
}
