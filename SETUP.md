# CityPulse X - Project Setup Guide

## ✅ Project Structure Created

```
raci-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main demo page
│   │   ├── providers.tsx       # App providers
│   │   └── globals.css         # Global styles + animations
│   ├── components/
│   │   ├── LandingScreen.tsx   # Landing page with cinematic intro
│   │   ├── ServiceGraph.tsx    # City map visualization
│   │   ├── ServiceNode.tsx     # Individual service cards
│   │   ├── WorkflowPanel.tsx   # Workflow orchestration UI
│   │   ├── ChaosPanel.tsx      # Chaos injection controls
│   │   ├── ObservabilityPanel.tsx  # Event logs & traces
│   │   ├── PoliciesPanel.tsx   # Governance rules display
│   │   └── MetricsPanel.tsx    # System metrics dashboard
│   ├── lib/
│   │   ├── store.ts            # Zustand state management
│   │   ├── config.ts           # Initial configuration
│   │   ├── simulation.ts       # Chaos simulation engine
│   │   ├── workflow.ts         # Workflow execution engine
│   │   ├── policy.ts           # Policy evaluation engine
│   │   └── utils.ts            # Utility functions
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── public/                     # Static assets
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd f:\raci-app
npm install
```

**Expected output**: All packages installed successfully

### 2. Run Development Server
```bash
npm run dev
```

**Expected output**:
```
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2s
```

### 3. Open in Browser
Navigate to: `http://localhost:3000`

You should see the **CityPulse X Landing Screen** with cinematic animations.

## 🎮 First Time Using the Demo

1. **Click "ENTER COMMAND CENTER"** on the landing screen
2. **Explore the City Map** - See all 12 API services
3. **Click a Service** - View its health, latency, trust score
4. **Start a Workflow** - Go to Workflows tab and click Play
5. **Inject Chaos** - Go to Chaos tab and trigger a failure
6. **Watch Recovery** - Observe the city self-heal
7. **Check Logs** - Go to Observability to see traces
8. **Review Policies** - Go to Governance to see rules in action

## 📊 Core Features

✅ **Service Graph** - 12 API services with real-time status
✅ **Workflow Orchestration** - Execute autonomous workflows
✅ **Chaos Injection** - 12+ failure scenarios
✅ **Observability** - Distributed traces and event logs
✅ **Governance** - Policy engine with validation rules
✅ **Metrics Dashboard** - Real-time KPIs and health scores
✅ **Responsive Design** - Works on desktop, tablet, mobile
✅ **Neon Theme** - Eye-catching animations and visual effects

## 🔧 Development Commands

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🌐 Deployment to Vercel

### Option 1: Via CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Via GitHub
1. Push to GitHub
2. Import project in Vercel dashboard
3. Deploy with one click

## 📝 Editing the Demo

### Add New Services
Edit `src/lib/config.ts`:
```typescript
export const initialServices: APIService[] = [
  {
    id: 'drone-delivery',
    name: 'Drone API',
    status: 'healthy',
    // ... more fields
  }
]
```

### Add New Workflows
Edit `src/lib/config.ts`:
```typescript
export const initialWorkflows: Workflow[] = [
  {
    id: 'new-workflow',
    name: 'My Workflow',
    steps: [ /* ... */ ]
  }
]
```

### Add New Chaos Scenarios
Edit `src/lib/config.ts`:
```typescript
export const chaosOptions = [
  {
    id: 'new-chaos',
    name: 'New Failure',
    description: 'What happens',
    icon: 'AlertTriangle',
    color: 'neon-red'
  }
]
```

Then implement in `src/lib/simulation.ts`:
```typescript
case 'new-chaos':
  SimulationEngine.yourNewChaosFunction();
  break;
```

## 🎨 Customizing Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  "neon-blue": "#00d4ff",      // Change this
  "neon-green": "#39ff14",     // Change this
  // ... etc
}
```

## 🎯 Performance Tips

- The demo runs entirely in-browser (no backend)
- All simulations are CPU-bound calculations
- Optimized Framer Motion animations
- CSS animations for infinite loops (pulse, scan, float)
- Zustand for efficient state updates

## ❓ Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Module Not Found Errors
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### TypeScript Errors
Make sure you're using Node 18+:
```bash
node --version
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)

## 🎬 Ready to Present?

1. **Open the demo in full screen**
2. **Start with the landing screen**
3. **Follow the narrative arc from README.md**
4. **Use Chaos buttons to engage audience**
5. **Point out policies blocking bad behavior**
6. **Explain the trace logs in Observability**
7. **End with the core message**

---

**That's it! You're ready to run CityPulse X.** 🚀

For questions or improvements, refer to the main README.md file.
