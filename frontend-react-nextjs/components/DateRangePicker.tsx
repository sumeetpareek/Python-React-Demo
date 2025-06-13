"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  disabled?: boolean;
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  disabled = false,
}: DateRangePickerProps) {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateRangeChange({ ...dateRange, start: date });
      setIsStartOpen(false);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateRangeChange({ ...dateRange, end: date });
      setIsEndOpen(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
      <div className="flex flex-col gap-2 flex-1">
        <Label htmlFor="start-date" className="text-sm font-medium">
          Start Date
        </Label>
        <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
          <PopoverTrigger asChild>
            <Button
              id="start-date"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange.start && "text-muted-foreground"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.start ? (
                format(dateRange.start, "PPP")
              ) : (
                <span>Pick a start date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateRange.start}
              onSelect={handleStartDateSelect}
              initialFocus
              disabled={(date) => date > new Date() || date > dateRange.end}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <Label htmlFor="end-date" className="text-sm font-medium">
          End Date
        </Label>
        <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
          <PopoverTrigger asChild>
            <Button
              id="end-date"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange.end && "text-muted-foreground"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.end ? (
                format(dateRange.end, "PPP")
              ) : (
                <span>Pick an end date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateRange.end}
              onSelect={handleEndDateSelect}
              initialFocus
              disabled={(date) => date > new Date() || date < dateRange.start}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
