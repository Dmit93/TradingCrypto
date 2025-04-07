import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  impact: "high" | "medium" | "low";
  description: string;
  forecast?: string;
  previous?: string;
  correlation?: number; // Correlation with selected crypto (-1 to 1)
}

interface EventCalendarProps {
  selectedCrypto?: string;
  onEventClick?: (event: Event) => void;
}

const EventCalendar = ({
  selectedCrypto = "BTC",
  onEventClick,
}: EventCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("list");
  const [impactFilter, setImpactFilter] = useState<string>("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Mock data for events
  const mockEvents: Event[] = [
    {
      id: "1",
      title: "Fed Interest Rate Decision",
      date: new Date(),
      time: "14:00",
      impact: "high",
      description: "Federal Reserve announces interest rate decision",
      forecast: "5.25%",
      previous: "5.25%",
      correlation: 0.85,
    },
    {
      id: "2",
      title: "US CPI Data",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "08:30",
      impact: "high",
      description: "US Consumer Price Index data release",
      forecast: "3.2%",
      previous: "3.4%",
      correlation: 0.72,
    },
    {
      id: "3",
      title: "ECB Press Conference",
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      time: "09:45",
      impact: "medium",
      description: "European Central Bank press conference",
      correlation: 0.45,
    },
    {
      id: "4",
      title: "US Jobless Claims",
      date: new Date(Date.now() + 259200000), // 3 days from now
      time: "08:30",
      impact: "low",
      description: "Weekly US jobless claims data",
      forecast: "220K",
      previous: "217K",
      correlation: 0.25,
    },
  ];

  // Filter events based on impact
  const filteredEvents = mockEvents
    .filter((event) => {
      if (impactFilter === "all") return true;
      return event.impact === impactFilter;
    })
    .sort((a, b) => {
      const dateComparison = a.date.getTime() - b.date.getTime();
      return sortDirection === "asc" ? dateComparison : -dateComparison;
    });

  // Get impact color
  const getImpactColor = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get correlation badge
  const getCorrelationBadge = (correlation?: number) => {
    if (correlation === undefined) return null;

    if (correlation > 0.7) {
      return <Badge className="bg-green-500">Strong Positive</Badge>;
    } else if (correlation > 0.3) {
      return <Badge className="bg-green-300">Moderate Positive</Badge>;
    } else if (correlation > -0.3) {
      return <Badge className="bg-gray-300">Neutral</Badge>;
    } else if (correlation > -0.7) {
      return <Badge className="bg-red-300">Moderate Negative</Badge>;
    } else {
      return <Badge className="bg-red-500">Strong Negative</Badge>;
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            Forex Events Calendar
          </CardTitle>
          <div className="flex space-x-2">
            <Tabs
              value={view}
              onValueChange={(v) => setView(v as "calendar" | "list")}
              className="w-[200px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select value={impactFilter} onValueChange={setImpactFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by impact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Impacts</SelectItem>
                <SelectItem value="high">High Impact</SelectItem>
                <SelectItem value="medium">Medium Impact</SelectItem>
                <SelectItem value="low">Low Impact</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={toggleSortDirection}
              className="flex items-center"
            >
              <span className="mr-2">Date</span>
              {sortDirection === "asc" ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span className="text-xs">Low</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={view} className="w-full">
          <TabsContent value="list" className="mt-0">
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onEventClick && onEventClick(event)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${getImpactColor(event.impact)} mr-2`}
                        ></div>
                        <h3 className="font-medium">{event.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {event.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {format(event.date, "MMM dd")}
                      </p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between items-center">
                    <div>
                      {event.forecast && (
                        <span className="text-xs mr-2">
                          <span className="text-gray-500">Forecast:</span>{" "}
                          {event.forecast}
                        </span>
                      )}
                      {event.previous && (
                        <span className="text-xs">
                          <span className="text-gray-500">Previous:</span>{" "}
                          {event.previous}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs mr-2">
                        {selectedCrypto} Correlation:
                      </span>
                      {getCorrelationBadge(event.correlation)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            <div className="border rounded-md p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-full"
              />

              <div className="mt-4 max-h-[200px] overflow-y-auto">
                <h3 className="font-medium mb-2">
                  Events on{" "}
                  {date ? format(date, "MMMM d, yyyy") : "selected date"}
                </h3>

                {filteredEvents
                  .filter(
                    (event) =>
                      date &&
                      format(event.date, "yyyy-MM-dd") ===
                        format(date, "yyyy-MM-dd"),
                  )
                  .map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => onEventClick && onEventClick(event)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${getImpactColor(event.impact)} mr-2`}
                        ></div>
                        <span className="text-sm font-medium">
                          {event.time}
                        </span>
                        <span className="mx-2 text-sm">{event.title}</span>
                        {getCorrelationBadge(event.correlation)}
                      </div>
                    </div>
                  ))}

                {filteredEvents.filter(
                  (event) =>
                    date &&
                    format(event.date, "yyyy-MM-dd") ===
                      format(date, "yyyy-MM-dd"),
                ).length === 0 && (
                  <p className="text-sm text-gray-500 p-3">
                    No events on this date
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EventCalendar;
