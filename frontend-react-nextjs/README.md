# MAG7 Stocks Dashboard

A beautiful, responsive Next.js dashboard for visualizing daily returns of MAG7 stocks (MSFT, AAPL, GOOGL, AMZN, NVDA, META, TSLA) using interactive charts.

## Features

- 📊 **Interactive Charts**: Beautiful line charts using Chart.js and react-chartjs-2
- 📅 **Date Range Selection**: Pick custom start and end dates with intuitive date pickers
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, professional design with smooth animations
- 📈 **Summary Statistics**: Min, max, and mean returns for each stock
- 🔄 **Real-time Updates**: Automatic data fetching when date range changes
- ⚡ **Error Handling**: Graceful error handling with retry functionality
- 🎯 **Best Practices**: Modular architecture with TypeScript, custom hooks, and reusable components

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **UI Components**: Radix UI + custom components
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── DateRangePicker.tsx
│   ├── StockChart.tsx
│   ├── StockCard.tsx
│   ├── StockDashboard.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   └── EmptyState.tsx
├── hooks/                # Custom React hooks
│   └── useStockData.ts
├── lib/                  # Utilities and services
│   ├── api.ts           # API service functions
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
└── docs/                # Documentation
    └── frontend-requirements.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running on `http://127.0.0.1:8000`

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

## API Integration

The dashboard expects a backend API with the following endpoint:

- **GET** `/returns?start=YYYY-MM-DD&end=YYYY-MM-DD`

Example response:

```json
{
  "data": {
    "MSFT": [
      {
        "date": "2025-01-07",
        "return": -0.012808
      }
    ],
    "AAPL": [
      {
        "date": "2025-01-07",
        "return": -0.011388
      }
    ]
  }
}
```

## Components Breakdown

### Core Components

- **StockDashboard**: Main orchestrator component managing state and layout
- **DateRangePicker**: Date selection with validation and constraints
- **StockChart**: Interactive line chart with tooltips and zoom
- **StockCard**: Individual stock display with chart and statistics

### Utility Components

- **LoadingSpinner**: Loading state indicator
- **ErrorMessage**: Error display with retry functionality
- **EmptyState**: Empty state when no data is available

### Custom Hooks

- **useStockData**: Manages data fetching, loading states, and error handling

### Services

- **api.ts**: API communication with error handling
- **utils.ts**: Data processing and formatting utilities
- **types.ts**: TypeScript type definitions

## Features in Detail

### Interactive Charts

- Line charts with smooth animations
- Hover tooltips showing exact values
- Responsive design that adapts to container size
- Color-coded by stock ticker

### Date Range Selection

- Intuitive date picker interface
- Validation to prevent invalid date ranges
- Automatic data fetching on date change
- Disabled states during loading

### Responsive Design

- Mobile-first approach
- Grid layout that adapts to screen size
- Touch-friendly interactions
- Optimized for all device sizes

### Error Handling

- Network error detection
- User-friendly error messages
- Retry functionality
- Graceful fallbacks

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Modular component architecture

## Deployment

The application can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Docker containers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
