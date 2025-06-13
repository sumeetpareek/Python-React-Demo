import { BarChart3 } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <BarChart3 className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Data Available
      </h3>
      <p className="text-gray-600 max-w-md">
        Select a date range to view MAG7 stocks daily returns data.
      </p>
    </div>
  );
}
