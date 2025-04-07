import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Dashboard from "./Dashboard";
import EventCalendar from "./EventCalendar";
import TradersJournal from "./TradersJournal";
import { Bitcoin, BarChart2, Calendar, BookOpen, Settings } from "lucide-react";

const Home = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [activeTab, setActiveTab] = useState("dashboard");

  const cryptocurrencies = [
    { value: "BTC", label: "Bitcoin" },
    { value: "ETH", label: "Ethereum" },
    { value: "BNB", label: "Binance Coin" },
    { value: "SOL", label: "Solana" },
    { value: "ADA", label: "Cardano" },
    { value: "XRP", label: "Ripple" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bitcoin className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Crypto Prediction & Analysis</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                {cryptocurrencies.map((crypto) => (
                  <SelectItem key={crypto.value} value={crypto.value}>
                    {crypto.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button className="p-2 rounded-full hover:bg-accent">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Bitcoin className="h-4 w-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Journal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Dashboard cryptocurrency={selectedCrypto} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Analysis for {selectedCrypto}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Technical Analysis
                    </h3>
                    <div className="p-4 border rounded-lg">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>RSI (14)</span>
                          <span className="font-medium">58.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MACD</span>
                          <span className="font-medium text-green-500">
                            Bullish
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Moving Averages</span>
                          <span className="font-medium text-red-500">
                            Bearish
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bollinger Bands</span>
                          <span className="font-medium">Neutral</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Fundamental Analysis
                    </h3>
                    <div className="p-4 border rounded-lg">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Market Cap</span>
                          <span className="font-medium">$1.2T</span>
                        </div>
                        <div className="flex justify-between">
                          <span>24h Volume</span>
                          <span className="font-medium">$32.5B</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Circulating Supply</span>
                          <span className="font-medium">19.4M</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sentiment</span>
                          <span className="font-medium text-green-500">
                            Bullish
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 border rounded-lg bg-muted/50">
                  <h3 className="text-lg font-semibold mb-2">
                    Prediction Signal
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Based on technical and fundamental analysis
                      </p>
                      <p className="mt-1">
                        Short-term outlook (24h):{" "}
                        <span className="font-bold text-green-500">BUY</span>
                      </p>
                      <p className="mt-1">
                        Medium-term outlook (7d):{" "}
                        <span className="font-bold">HOLD</span>
                      </p>
                    </div>
                    <div className="text-5xl font-bold text-green-500">BUY</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <EventCalendar cryptocurrency={selectedCrypto} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="journal" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <TradersJournal cryptocurrency={selectedCrypto} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Crypto Prediction & Analysis Platform © 2023 | Data sourced from
            ForexFactory.com
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
