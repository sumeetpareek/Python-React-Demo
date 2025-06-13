import { ApiResponse, DateRange } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export class ApiError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function fetchStockReturns(dateRange: DateRange): Promise<ApiResponse> {
    const { start, end } = dateRange;

    // Format dates as YYYY-MM-DD
    const startDate = start.toISOString().split('T')[0];
    const endDate = end.toISOString().split('T')[0];

    const url = `${API_BASE_URL}/returns?start=${startDate}&end=${endDate}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new ApiError(
                `Failed to fetch stock data: ${response.statusText}`,
                response.status
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
            error instanceof Error ? error.message : 'Failed to fetch stock data'
        );
    }
} 