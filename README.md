# CityPulse X - The Autonomous API City

A fully interactive, cinematic web demo showcasing autonomous API systems without AI models. Built for APIdays conferences to demonstrate how APIs, events, policies, and orchestration create resilient, self-healing systems.

## 🎯 Concept

**CityPulse X** is a digital city where:
- Every system (traffic, ambulances, hospitals, power grid, payments, etc.) communicates via APIs
- Decisions happen through rules, events, policies, and contracts
- The audience triggers chaos
- The system self-recovers in real time

**Core Message**: *"The future is not just AI-first. It is API-first for autonomous ecosystems."*

## 🏗️ Architecture

### Tech Stack
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with custom neon theme
- **Framer Motion** - Cinematic animations
- **Zustand** - State management
- **Recharts** - Charts and graphs
- **Lucide React** - Icons

### No Backend Required
Everything is simulated in the frontend using:
- JSON configurations for APIs, workflows, and policies
- JavaScript simulation engines for chaos, policies, and orchestration
- In-memory state management with Zustand

## 📊 Key Features

### 1. **Live City Map** (`/City Map` tab)
- Visualize 12+ API services as animated nodes
- Color-coded status: green (healthy), yellow (degraded), red (critical), gray (offline)
- Click services to inspect details
- Real-time latency and error rate display

### 2. **Workflow Orchestration** (`/Workflows` tab)
- Execute autonomous workflows like "Emergency Ambulance Dispatch"
- Watch real-time step execution
- See retries, failures, and fallbacks
- Demonstrates API orchestration and event-driven design

### 3. **Chaos Injection** (`/Chaos` tab)
- 12+ chaos scenarios to trigger live
- Latency spikes, schema mismatches, token expiration, DDoS, event storms, etc.
- Real-time impact on system metrics
- Automatic recovery visualization

### 4. **Observability** (`/Observability` tab)
- Real-time distributed trace logs
- Event stream with full details
- Service-specific event filtering
- Root cause analysis visualization

### 5. **Governance & Policies** (`/Governance` tab)
- 7 policy rules that govern the system
- Visual rule engine display
- Policy violation tracking
- Decision audit trail

### 6. **System Metrics** (`/Metrics` tab)
- Health score, resilience, availability, SLA compliance
- Trust score tracking
- Service status summary
- Real-time KPI dashboard

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to the project
cd f:\raci-app

# Install dependencies
npm install
```

### Running the Demo

#### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build
```bash
npm run build
npm start
```

## 🎮 How to Use the Demo

### 1. **Landing Screen**
Click "ENTER COMMAND CENTER" to access the main demo.

### 2. **Explore the City**
- Start on the **City Map** tab to see all API services
- Click services to inspect their health, latency, and trust scores
- Watch the color coding change in real-time

### 3. **Execute Workflows**
- Go to **Workflows** tab
- Click "Play" on any workflow (Emergency Dispatch, EV Charging, etc.)
- Watch real-time step execution with latencies and retries

### 4. **Trigger Chaos**
- Go to **Chaos** tab
- Click any chaos button to inject a failure
- Watch the city respond with retries, fallbacks, and degradation
- Observe metrics change in real-time
- Click "CLEAR ALL CHAOS & RECOVER" to watch auto-healing

### 5. **Monitor Observability**
- Go to **Observability** tab
- See every event, trace, and log in real-time
- Watch policies being enforced
- Understand the root cause of failures

### 6. **Check Governance**
- Go to **Governance** tab
- See all policy rules in action
- Watch policy violations get detected and logged
- Understand how rules protect the system

### 7. **Review Metrics**
- Go to **Metrics** tab
- See system health, availability, SLA compliance, trust scores
- Watch metrics change as you inject chaos
- See recovery in action

## 💡 Demo Narrative (30-minute talk)

**Opening (30s)**
> "We keep talking about AI agents calling APIs. But most APIs today are still barely designed for humans. So I built a city where humans don't click buttons anymore… APIs decide what happens next."

**Act 1: The Normal World (5min)**
- Show the city running perfectly
- Execute a workflow to demonstrate orchestration
- Explain API products, trust levels, and agent authorization

**Act 2: The Attack (5min)**
- Trigger: "Let's simulate a sensor compromise"
- Inject chaos, watch cascading failures
- Show SLA drops, resilience score declining
- Demonstrate policies rejecting invalid requests

**Act 3: The Recovery (5min)**
- Show circuit breakers activating
- Watch fallback routes activate
- See retries with exponential backoff
- Observe distributed traces showing root cause

**Act 4: The Message (3min)**
> "The future is not just AI-first. It is API-first for autonomous ecosystems. We need APIs that are observable, governable, resilient, and trustworthy by design. Before we let LLMs call APIs, we must first build APIs that can survive autonomy."

## 📈 Simulation Engines

### Chaos Engine
```typescript
SimulationEngine.injectLatency(serviceId, amount)
SimulationEngine.breakContract(serviceId)
SimulationEngine.expireToken(serviceId)
SimulationEngine.simulateDDoS()
SimulationEngine.killService(serviceId)
// ... 7+ more chaos scenarios
```

### Workflow Engine
- Executes workflows step-by-step
- Simulates realistic latencies
- Handles failures based on service status
- Implements automatic retries

### Policy Engine
- Evaluates 7 governance policies
- Enforces schema validation
- Checks token expiration
- Blocks duplicate events
- Audits dispatch actions

### Observability Engine
- Creates distributed traces
- Logs all events with timestamps
- Tracks latency and errors
- Records policy decisions

## 🎨 Neon Design System

All colors are designed for maximum visual impact on large screens:
- `neon-blue` (#00d4ff) - Primary, healthy
- `neon-green` (#39ff14) - Success, running
- `neon-purple` (#d946ef) - Governance, policies
- `neon-red` (#ff006e) - Failures, alerts
- `neon-orange` (#ff8c00) - Warnings, degradation

## 📱 Responsive Design

- **Desktop** (1024px+): Full layout with sidebar navigation
- **Tablet/Mobile**: Collapsible navigation with tab menu
- **Touch-friendly**: All buttons sized for touch interaction

## 🧪 Testing Chaos Scenarios

| Scenario | Impact | Recovery |
|----------|--------|----------|
| Latency Spike | Traffic API +3000ms | Circuit breaker, fallback routes |
| Contract Break | Schema mismatch | Request rejection, policy enforcement |
| Token Expiration | Auth failure | Trust score ↓, requests blocked |
| DDoS Simulation | Event bus degradation | Rate limiting, backpressure |
| Service Timeout | Complete unavailability | Cascading degradation, fallbacks |
| Schema Mismatch | Type errors | Validation rejection |
| Event Storm | System overload | Backpressure, async queuing |

## 🚀 Deployment

Ready for deployment to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📚 Key Concepts Demonstrated

- **API Design** - Well-designed APIs that support autonomous behavior
- **Event-Driven Architecture** - Systems that communicate via async events
- **Orchestration** - Coordinating multiple services in workflows
- **Resilience** - Circuit breakers, fallbacks, retries
- **Observability** - Distributed tracing, event logs
- **Governance** - Policies that enforce contracts and security
- **Trust Scoring** - Reputation-based service interaction
- **SLA Management** - Service level agreements and compliance

## 💬 Discussion Points for the Talk

1. **APIs are the new infrastructure** - Everything talks API
2. **Autonomy requires robustness** - Can your APIs handle autonomous agents?
3. **Deterministic beats probabilistic** - Rules > ML for critical systems
4. **Observability is non-negotiable** - See everything, understand everything
5. **Policies prevent chaos** - Governance scales trust
6. **Recovery over prevention** - Build systems that heal themselves

## 📄 License

MIT License - Feel free to use and modify for conferences

## 🙋 Questions?

This demo is designed for APIdays and similar API/integration conferences. Perfect for talking about:
- API design for autonomous workflows
- Agent-first API management
- Observability of agentic systems
- API security & resiliency
- Event-driven architecture
- Governance frameworks

---

**Built with ❤️ for APIdays**

*"When humans step back, APIs decide what happens next."*
