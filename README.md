# EcoTrack - AI Sustainability Dashboard

🌱 **AI-Driven ESG Analytics Tool for Carbon Footprint Measurement**

EcoTrack is an interactive React web application that simulates an AI-powered sustainability dashboard. It helps businesses measure their carbon footprint and provides actionable AI-driven recommendations to improve their environmental impact.

## Features

- 📊 **Data Input Panel**: Enter sustainability metrics (electricity, fuel, waste, supplier emissions)
- 🤖 **AI Analysis**: Simulated AI calculates carbon footprint and generates personalized recommendations
- 📈 **Visual Analytics**: Interactive charts showing emission breakdowns, trends, and industry benchmarks
- 📋 **Recent Analyses**: Sidebar showing last 3 analyses with quick reload functionality
- 💾 **Local Storage**: Automatically saves analyses for quick access

## Tech Stack

- **React 18** - UI framework with hooks (useState, useEffect)
- **Vite** - Build tool and dev server
- **Chart.js** - Charting library for data visualization (pie, line, bar charts)
- **CSS3** - Custom styling with eco-friendly theme (grid/flexbox responsive layout)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
Ecotrack/
├── src/
│   ├── components/
│   │   ├── DataInputPanel.jsx
│   │   ├── AIResultsPanel.jsx
│   │   ├── VisualAnalyticsDashboard.jsx
│   │   ├── RecentAnalysesSidebar.jsx
│   │   └── Footer.jsx
│   ├── utils/
│   │   └── aiSimulation.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## AI Simulation Logic

The app simulates AI-powered analysis using weighted emission factors based on GHG Protocol standards:

- **Electricity**: 0.000233 tCO₂e per kWh (global average grid mix)
- **Fuel**: 2.68 tCO₂e per liter (diesel/petrol combustion)
- **Waste**: 0.0019 tCO₂e per kg (landfill methane emissions)
- **Supplier Factor**: Direct input in tCO₂e

### Simulation Workflow:
1. User enters data → clicks "Analyze Footprint"
2. Loader displays: "EcoTrack AI is estimating your footprint…"
3. AI calculates emissions using emission factors
4. Generates context-aware recommendations based on:
   - Emission category percentages (identifies hotspots)
   - Industry type (applies sector-specific knowledge)
   - Absolute values (flags significant impact areas)
5. Results saved to localStorage for quick recall
6. Dashboard updates with charts, metrics, and recommendations

All simulation steps are documented with clear comments in the code.

## Design Theme

- **Primary Colors**: Forest green (#4CAF50), Teal (#009688)
- **Typography**: Inter & Nunito Sans
- **Layout**: Split-screen with responsive design
- **Animations**: Smooth fade-in effects and loading states

## Browser Support

Modern browsers with ES6+ support (Chrome, Firefox, Safari, Edge)

## License

© 2025 EcoTrack Inc.

---

*"Measure today. Sustain tomorrow."*

