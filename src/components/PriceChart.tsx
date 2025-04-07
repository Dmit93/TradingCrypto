import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  LineChart,
  BarChart,
  CandlestickChart,
  ArrowUpDown,
  ZoomIn,
  ZoomOut,
  PanelLeft,
} from "lucide-react";

interface PriceChartProps {
  cryptoSymbol?: string;
  timeframe?: string;
  indicators?: string[];
  data?: any[];
}

const PriceChart = ({
  cryptoSymbol = "BTC/USD",
  timeframe = "1d",
  indicators = ["MA", "RSI"],
  data = generateMockData(100),
}: PriceChartProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [selectedChartType, setSelectedChartType] = useState("candlestick");
  const [selectedIndicators, setSelectedIndicators] = useState(indicators);

  return (
    <Card className="w-full h-full bg-background">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            {cryptoSymbol} Price Chart
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Select
              value={selectedTimeframe}
              onValueChange={setSelectedTimeframe}
            >
              <SelectTrigger className="w-[80px] h-8">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1H</SelectItem>
                <SelectItem value="4h">4H</SelectItem>
                <SelectItem value="1d">1D</SelectItem>
                <SelectItem value="1w">1W</SelectItem>
              </SelectContent>
            </Select>

            <div className="border rounded-md p-1">
              <ToggleGroup
                type="single"
                value={selectedChartType}
                onValueChange={(value) => value && setSelectedChartType(value)}
              >
                <ToggleGroupItem value="line" aria-label="Line Chart">
                  <LineChart className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="bar" aria-label="Bar Chart">
                  <BarChart className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="candlestick"
                  aria-label="Candlestick Chart"
                >
                  <CandlestickChart className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[350px]">
          <div className="flex-1 relative border rounded-md bg-card/50 p-2">
            {/* Chart placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full">
                {renderChart(selectedChartType, data)}
              </div>
            </div>

            {/* Chart controls */}
            <div className="absolute bottom-4 right-4 flex space-x-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-background/80"
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <Tabs defaultValue="indicators">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="indicators">Indicators</TabsTrigger>
                <TabsTrigger value="info">Price Info</TabsTrigger>
              </TabsList>
              <TabsContent value="indicators" className="p-2">
                <div className="flex flex-wrap gap-2">
                  {["MA", "EMA", "RSI", "MACD", "Bollinger"].map(
                    (indicator) => (
                      <Button
                        key={indicator}
                        variant={
                          selectedIndicators.includes(indicator)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          if (selectedIndicators.includes(indicator)) {
                            setSelectedIndicators(
                              selectedIndicators.filter((i) => i !== indicator),
                            );
                          } else {
                            setSelectedIndicators([
                              ...selectedIndicators,
                              indicator,
                            ]);
                          }
                        }}
                      >
                        {indicator}
                      </Button>
                    ),
                  )}
                </div>
              </TabsContent>
              <TabsContent value="info" className="p-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open</span>
                    <span className="font-medium">
                      ${formatPrice(data[data.length - 1]?.open)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Close</span>
                    <span className="font-medium">
                      ${formatPrice(data[data.length - 1]?.close)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">High</span>
                    <span className="font-medium text-green-500">
                      ${formatPrice(data[data.length - 1]?.high)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Low</span>
                    <span className="font-medium text-red-500">
                      ${formatPrice(data[data.length - 1]?.low)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume</span>
                    <span className="font-medium">
                      {formatVolume(data[data.length - 1]?.volume)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Change</span>
                    <span
                      className={
                        data[data.length - 1]?.change > 0
                          ? "font-medium text-green-500"
                          : "font-medium text-red-500"
                      }
                    >
                      {data[data.length - 1]?.change > 0 ? "+" : ""}
                      {data[data.length - 1]?.change.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper functions
function generateMockData(length: number) {
  const data = [];
  let price = 50000 + Math.random() * 10000;

  for (let i = 0; i < length; i++) {
    const change = (Math.random() - 0.5) * 500;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 200;
    const low = Math.min(open, close) - Math.random() * 200;
    const volume = Math.floor(Math.random() * 1000000) + 500000;

    data.push({
      date: new Date(Date.now() - (length - i) * 86400000),
      open,
      close,
      high,
      low,
      volume,
      change: ((close - open) / open) * 100,
    });

    price = close;
  }

  return data;
}

function formatPrice(price: number) {
  return price
    ? price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";
}

function formatVolume(volume: number) {
  if (!volume) return "0";
  if (volume >= 1000000) return `${(volume / 1000000).toFixed(2)}M`;
  if (volume >= 1000) return `${(volume / 1000).toFixed(2)}K`;
  return volume.toString();
}

function renderChart(type: string, data: any[]) {
  // This is a placeholder for actual chart implementation
  // In a real application, you would use a charting library like recharts, visx, or d3

  const colors = {
    line: "#3b82f6",
    bar: "#10b981",
    candlestick: "#f59e0b",
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 300"
        preserveAspectRatio="none"
      >
        {type === "line" && (
          <path
            d={generateLinePath(data)}
            fill="none"
            stroke={colors.line}
            strokeWidth="2"
          />
        )}

        {type === "bar" &&
          data
            .slice(-30)
            .map((d, i) => (
              <rect
                key={i}
                x={i * 26 + 5}
                y={150 - d.close / 100}
                width="20"
                height={d.close / 100}
                fill={d.close > d.open ? "#10b981" : "#ef4444"}
              />
            ))}

        {type === "candlestick" &&
          data.slice(-30).map((d, i) => (
            <g key={i}>
              <line
                x1={i * 26 + 15}
                y1={150 - d.high / 100}
                x2={i * 26 + 15}
                y2={150 - d.low / 100}
                stroke="#6b7280"
                strokeWidth="1"
              />
              <rect
                x={i * 26 + 10}
                y={150 - Math.max(d.open, d.close) / 100}
                width="10"
                height={Math.abs((d.close - d.open) / 100) || 1}
                fill={d.close > d.open ? "#10b981" : "#ef4444"}
              />
            </g>
          ))}
      </svg>

      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="border-t border-gray-200 dark:border-gray-800"
            style={{ gridRow: i + 2 }}
          />
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="border-l border-gray-200 dark:border-gray-800"
            style={{ gridColumn: i + 2 }}
          />
        ))}
      </div>
    </div>
  );
}

function generateLinePath(data: any[]) {
  const slicedData = data.slice(-50);
  const maxPrice = Math.max(...slicedData.map((d) => d.high));
  const minPrice = Math.min(...slicedData.map((d) => d.low));
  const range = maxPrice - minPrice;

  return slicedData
    .map((d, i) => {
      const x = (i / (slicedData.length - 1)) * 800;
      const y = 300 - ((d.close - minPrice) / range) * 280;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

// Add missing UI components
const ToggleGroup = ({ type, value, onValueChange, children }: any) => {
  return (
    <div className="flex space-x-1">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          isSelected: child.props.value === value,
          onClick: () => onValueChange(child.props.value),
        });
      })}
    </div>
  );
};

const ToggleGroupItem = ({
  value,
  isSelected,
  onClick,
  children,
  "aria-label": ariaLabel,
}: any) => {
  return (
    <Button
      variant={isSelected ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
};

export default PriceChart;
