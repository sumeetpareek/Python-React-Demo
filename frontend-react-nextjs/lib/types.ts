export interface StockDataPoint {
    date: string;
    return: number;
}

export interface StockData {
    [ticker: string]: StockDataPoint[];
}

export interface ApiResponse {
    data: StockData;
}

export interface DateRange {
    start: Date;
    end: Date;
}

export interface StockSummary {
    ticker: string;
    min: number;
    max: number;
    mean: number;
    data: StockDataPoint[];
}

export const MAG7_TICKERS = ['MSFT', 'AAPL', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'] as const;
export type Mag7Ticker = typeof MAG7_TICKERS[number]; 