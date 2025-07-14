
import { StockDataPoint, StockSummary } from './types';

export function calculateSummaryStats(data: StockDataPoint[]): Omit<StockSummary, 'ticker' | 'data'> {
  if (data.length === 0) {
    return { min: 0, max: 0, mean: 0 };
  }

  const returns = data.map(point => point.return);
  const min = Math.min(...returns);
  const max = Math.max(...returns);
  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length;

  return {
    min: Number(min.toFixed(4)),
    max: Number(max.toFixed(4)),
    mean: Number(mean.toFixed(4)),
  };
}

export function formatPercentage(value: number): string {
  const percentage = (value * 100).toFixed(2);
  const sign = value >= 0 ? '+' : '';
  return `${sign}${percentage}%`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getStockColor(ticker: string): string {
  const colors = {
    MSFT: '#00a4ef',
    AAPL: '#a2aaad',
    GOOGL: '#4285f4',
    AMZN: '#ff9900',
    NVDA: '#76b900',
    META: '#0668E1',
    TSLA: '#cc0000',
  };
  return colors[ticker as keyof typeof colors] || '#6b7280';
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function calculateCompoundedReturns(data: StockDataPoint[]): number[] {
  const compoundedReturns: number[] = [];
  let compoundedFactor = 1;

  for (let i = 0; i < data.length; i++) {
    compoundedFactor = compoundedFactor * (1 + data[i].return);
    compoundedReturns.push(compoundedFactor - 1);
  }

  return compoundedReturns;
}