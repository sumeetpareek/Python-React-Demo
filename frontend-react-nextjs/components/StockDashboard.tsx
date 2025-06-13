"use client";

import { useState, useEffect } from "react";
import { subDays } from "date-fns";
import { DateRange } from "@/lib/types";
import { useStockData } from "@/hooks/useStockData";
import { DateRangePicker } from "./DateRangePicker";
import { StockCard } from "./StockCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { EmptyState } from "./EmptyState";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function StockDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: subDays(new Date(), 30),
    end: new Date(),
  });

  const { data, summaries, loading, error, fetchData } = useStockData();

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchData(dateRange);
    }
  }, [dateRange, fetchData]);

  const handleDateRangeChange = (newDateRange: DateRange) => {
    setDateRange(newDateRange);
  };

  const handleRetry = () => {
    if (dateRange.start && dateRange.end) {
      fetchData(dateRange);
    }
  };

  const handleRefresh = () => {
    if (dateRange.start && dateRange.end) {
      fetchData(dateRange);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            MAG7 Stocks Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Visualize daily returns for Microsoft, Apple, Google, Amazon,
            NVIDIA, Meta, and Tesla
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
              disabled={loading}
            />
          </div>

          <Button
            onClick={handleRefresh}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner size={32} />
            </div>
          )}

          {error && <ErrorMessage message={error} onRetry={handleRetry} />}

          {!loading && !error && !data && <EmptyState />}

          {!loading && !error && data && summaries.length > 0 && (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500">
                    Total Stocks
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {summaries.length}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500">
                    Date Range
                  </h3>
                  <p className="text-sm font-semibold text-gray-900">
                    {dateRange.start.toLocaleDateString()} -{" "}
                    {dateRange.end.toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500">
                    Data Points
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {summaries.reduce(
                      (total, summary) => total + summary.data.length,
                      0
                    )}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500">
                    Best Performer
                  </h3>
                  <p className="text-sm font-semibold text-gray-900">
                    {
                      summaries.reduce((best, current) =>
                        current.mean > best.mean ? current : best
                      ).ticker
                    }
                  </p>
                </div>
              </div>

              {/* Stock Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {summaries.map((summary) => (
                  <StockCard key={summary.ticker} summary={summary} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
