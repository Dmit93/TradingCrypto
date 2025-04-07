import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon, MoveIcon, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import components with default props
const PriceChart = ({ crypto = "BTC", timeframe = "1d" }) => {
  return (
    <div className="bg-white h-[300px] flex items-center justify-center">
      <p className="text-muted-foreground">
        Price chart for {crypto} ({timeframe})
      </p>
    </div>
  );
};

const EventCalendar = ({ crypto = "BTC" }) => {
  return (
    <div className="bg-white h-[200px] flex items-center justify-center">
      <p className="text-muted-foreground">Event calendar for {crypto}</p>
    </div>
  );
};

interface Widget {
  id: string;
  type: "priceChart" | "events" | "analysis" | "prediction";
  title: string;
  size: "small" | "medium" | "large";
}

const Dashboard = () => {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: "1",
      type: "priceChart",
      title: "BTC/USD Price Chart",
      size: "large",
    },
    {
      id: "2",
      type: "events",
      title: "Upcoming Market Events",
      size: "medium",
    },
    { id: "3", type: "analysis", title: "Technical Analysis", size: "medium" },
    { id: "4", type: "prediction", title: "Price Prediction", size: "small" },
  ]);

  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [timeframe, setTimeframe] = useState("1d");

  const addWidget = () => {
    const newWidget: Widget = {
      id: Date.now().toString(),
      type: "priceChart",
      title: "New Widget",
      size: "medium",
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  const renderWidgetContent = (widget: Widget) => {
    switch (widget.type) {
      case "priceChart":
        return <PriceChart crypto={selectedCrypto} timeframe={timeframe} />;
      case "events":
        return <EventCalendar crypto={selectedCrypto} />;
      case "analysis":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Technical Indicators</h3>
              <Badge variant="outline">Last updated: 5m ago</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>RSI (14)</span>
                <span className="font-medium">42.5 (Neutral)</span>
              </div>
              <div className="flex justify-between">
                <span>MACD</span>
                <span className="font-medium text-red-500">Bearish</span>
              </div>
              <div className="flex justify-between">
                <span>Moving Averages</span>
                <span className="font-medium text-green-500">Bullish</span>
              </div>
              <div className="flex justify-between">
                <span>Bollinger Bands</span>
                <span className="font-medium">Squeeze (Volatility Low)</span>
              </div>
            </div>
          </div>
        );
      case "prediction":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Price Prediction</h3>
              <Badge variant="outline">Based on 24h data</Badge>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-3xl font-bold text-green-500">BUY</div>
              <div className="text-sm text-muted-foreground text-center">
                Strong buy signal based on technical indicators and upcoming
                market events
              </div>
              <div className="text-lg font-medium mt-2">
                Target: $45,230 (+5.2%)
              </div>
            </div>
          </div>
        );
      default:
        return <div>Widget content</div>;
    }
  };

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Crypto Analysis Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor, analyze, and predict cryptocurrency movements
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Cryptocurrency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
              <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
              <SelectItem value="SOL">Solana (SOL)</SelectItem>
              <SelectItem value="ADA">Cardano (ADA)</SelectItem>
              <SelectItem value="DOT">Polkadot (DOT)</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="4h">4 Hours</SelectItem>
              <SelectItem value="1d">1 Day</SelectItem>
              <SelectItem value="1w">1 Week</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => {}}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="mb-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="events">Event Calendar</TabsTrigger>
          <TabsTrigger value="journal">Trader's Journal</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex justify-end mb-4">
        <Button onClick={addWidget} className="flex items-center">
          <PlusIcon className="mr-2 h-4 w-4" /> Add Widget
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((widget) => (
          <Card
            key={widget.id}
            className={`
            ${widget.size === "small" ? "col-span-1" : ""}
            ${widget.size === "medium" ? "col-span-1 md:col-span-1 lg:col-span-1" : ""}
            ${widget.size === "large" ? "col-span-1 md:col-span-2 lg:col-span-2" : ""}
          `}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{widget.title}</CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoveIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeWidget(widget.id)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>{renderWidgetContent(widget)}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
