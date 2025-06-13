"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockSummary } from "@/lib/types";
import { StockChart } from "./StockChart";
import { formatPercentage, getStockColor } from "@/lib/utils";

interface StockCardProps {
  summary: StockSummary;
}

export function StockCard({ summary }: StockCardProps) {
  const { ticker, min, max, mean, data } = summary;
  const color = getStockColor(ticker);

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (value < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getValueColor = (value: number) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <Card className="w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          {ticker}
        </CardTitle>
        <p className="text-sm text-gray-500">{data.length} data points</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <StockChart summary={summary} />

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              {getTrendIcon(min)}
              <span className="text-xs font-medium text-gray-600">Min</span>
            </div>
            <p className={`text-sm font-semibold ${getValueColor(min)}`}>
              {formatPercentage(min)}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              {getTrendIcon(mean)}
              <span className="text-xs font-medium text-gray-600">Mean</span>
            </div>
            <p className={`text-sm font-semibold ${getValueColor(mean)}`}>
              {formatPercentage(mean)}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              {getTrendIcon(max)}
              <span className="text-xs font-medium text-gray-600">Max</span>
            </div>
            <p className={`text-sm font-semibold ${getValueColor(max)}`}>
              {formatPercentage(max)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
