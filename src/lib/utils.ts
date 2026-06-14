export function getStatusColor(status: string): string {
  switch (status) {
    case 'healthy':
      return '#39ff14'; // neon green
    case 'degraded':
      return '#ff8c00'; // neon orange
    case 'critical':
      return '#ff006e'; // neon red
    case 'offline':
      return '#808080'; // gray
    default:
      return '#808080';
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case 'healthy':
      return 'bg-emerald-900 bg-opacity-30';
    case 'degraded':
      return 'bg-orange-900 bg-opacity-30';
    case 'critical':
      return 'bg-red-900 bg-opacity-30';
    case 'offline':
      return 'bg-gray-900 bg-opacity-30';
    default:
      return 'bg-gray-900 bg-opacity-30';
  }
}

export function getStatusTextColor(status: string): string {
  switch (status) {
    case 'healthy':
      return 'text-neon-green';
    case 'degraded':
      return 'text-neon-orange';
    case 'critical':
      return 'text-neon-red';
    case 'offline':
      return 'text-gray-400';
    default:
      return 'text-gray-400';
  }
}

export function formatLatency(latency: number): string {
  if (latency >= 1000) {
    return `${(latency / 1000).toFixed(1)}s`;
  }
  return `${Math.round(latency)}ms`;
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100) / 100}%`;
}

export function calculateHealthScore(services: any[]): number {
  if (services.length === 0) return 0;

  const healthyCount = services.filter((s) => s.status === 'healthy').length;
  return Math.round((healthyCount / services.length) * 100);
}

export function generateTraceId(): string {
  return `TRC-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
}
