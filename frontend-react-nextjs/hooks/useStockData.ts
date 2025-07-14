'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchStockReturns, ApiError } from '@/lib/api';
import { DateRange, ApiResponse, StockSummary } from '@/lib/types';
import { calculateSummaryStats } from '@/lib/utils';

interface UseStockDataReturn {
    data: ApiResponse | null;
    summaries: StockSummary[];
    loading: boolean;
    error: string | null;
    fetchData: (dateRange: DateRange, symbols?: string) => Promise<void>;
}

export function useStockData(): UseStockDataReturn {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [summaries, setSummaries] = useState<StockSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (dateRange: DateRange, symbols?: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchStockReturns(dateRange, symbols);
            setData(response);

            // Calculate summaries for each stock
            const stockSummaries: StockSummary[] = Object.entries(response.data).map(
                ([ticker, stockData]) => {
                    const stats = calculateSummaryStats(stockData);
                    return {
                        ticker,
                        ...stats,
                        data: stockData,
                    };
                }
            );

            setSummaries(stockSummaries);
        } catch (err) {
            const errorMessage = err instanceof ApiError
                ? err.message
                : 'Failed to fetch stock data';
            setError(errorMessage);
            setData(null);
            setSummaries([]);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        data,
        summaries,
        loading,
        error,
        fetchData,
    };
} 