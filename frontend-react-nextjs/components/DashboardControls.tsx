"use client";

import { useState } from "react";
import { DateRange } from "@/lib/types";
import { DateRangePicker } from "./DateRangePicker";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DashboardControlsProps {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  onRefresh: (symbols: string) => void;
  loading: boolean;
}

export function DashboardControls({
  dateRange,
  onDateRangeChange,
  onRefresh,
  loading,
}: DashboardControlsProps) {
  const [symbols, setSymbols] = useState<string>(
    "MSFT,AAPL,GOOGL,AMZN,NVDA,META,TSLA"
  );

  const handleSymbolsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbols(e.target.value);
  };

  const handleRefresh = () => {
    onRefresh(symbols);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          disabled={loading}
        />

        <div className="flex flex-col gap-2">
          <label
            htmlFor="symbols"
            className="text-sm font-medium text-gray-700"
          >
            Stock Symbols
          </label>
          <input
            id="symbols"
            type="text"
            value={symbols}
            onChange={handleSymbolsChange}
            placeholder="MSFT,AAPL,GOOGL"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="text-xs text-gray-500">
            Enter stock symbols separated by commas
          </p>
        </div>
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
  );
}
