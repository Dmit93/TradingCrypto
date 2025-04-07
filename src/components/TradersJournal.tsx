import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JournalEntry {
  id: string;
  date: string;
  cryptocurrency: string;
  entryPrice: number;
  exitPrice: number;
  positionSize: number;
  strategy: string;
  marketConditions: string;
  outcome: "profit" | "loss" | "breakeven";
  notes: string;
}

const TradersJournal = () => {
  const [activeTab, setActiveTab] = useState("entries");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCrypto, setFilterCrypto] = useState("");

  // Mock data for journal entries
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: "2023-06-15",
      cryptocurrency: "Bitcoin",
      entryPrice: 30000,
      exitPrice: 32000,
      positionSize: 0.5,
      strategy: "Breakout on Fed announcement",
      marketConditions: "Bullish trend, high volume",
      outcome: "profit",
      notes:
        "Entered after Fed announced no rate hikes. Market responded positively.",
    },
    {
      id: "2",
      date: "2023-06-20",
      cryptocurrency: "Ethereum",
      entryPrice: 1800,
      exitPrice: 1750,
      positionSize: 2,
      strategy: "Support level bounce",
      marketConditions: "Sideways market, low volatility",
      outcome: "loss",
      notes:
        "Support level failed to hold. Should have waited for confirmation.",
    },
    {
      id: "3",
      date: "2023-06-25",
      cryptocurrency: "Cardano",
      entryPrice: 0.35,
      exitPrice: 0.35,
      positionSize: 1000,
      strategy: "News-based entry",
      marketConditions: "Bearish overall market",
      outcome: "breakeven",
      notes: "Positive project news, but market sentiment was too negative.",
    },
  ]);

  // Form state for new entry
  const [newEntry, setNewEntry] = useState<Omit<JournalEntry, "id">>({
    date: new Date().toISOString().split("T")[0],
    cryptocurrency: "",
    entryPrice: 0,
    exitPrice: 0,
    positionSize: 0,
    strategy: "",
    marketConditions: "",
    outcome: "profit",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.random().toString(36).substring(2, 9);
    const entryWithId = { ...newEntry, id: newId };
    setJournalEntries((prev) => [entryWithId, ...prev]);

    // Reset form
    setNewEntry({
      date: new Date().toISOString().split("T")[0],
      cryptocurrency: "",
      entryPrice: 0,
      exitPrice: 0,
      positionSize: 0,
      strategy: "",
      marketConditions: "",
      outcome: "profit",
      notes: "",
    });

    // Switch to entries tab
    setActiveTab("entries");
  };

  const filteredEntries = journalEntries.filter((entry) => {
    const matchesSearch =
      entry.cryptocurrency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.strategy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.notes.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterCrypto
      ? entry.cryptocurrency === filterCrypto
      : true;

    return matchesSearch && matchesFilter;
  });

  const cryptocurrencies = [
    ...new Set(journalEntries.map((entry) => entry.cryptocurrency)),
  ];

  const getOutcomeBadgeColor = (outcome: string) => {
    switch (outcome) {
      case "profit":
        return "bg-green-500";
      case "loss":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div className="w-full h-full bg-background p-4">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Trader's Journal</CardTitle>
          <CardDescription>
            Record and track your cryptocurrency trades and strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="entries">Journal Entries</TabsTrigger>
                <TabsTrigger value="new">New Entry</TabsTrigger>
              </TabsList>

              {activeTab === "entries" && (
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search entries..."
                      className="pl-8 w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <Select value={filterCrypto} onValueChange={setFilterCrypto}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Filter by crypto" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All cryptocurrencies</SelectItem>
                      {cryptocurrencies.map((crypto) => (
                        <SelectItem key={crypto} value={crypto}>
                          {crypto}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <TabsContent value="entries" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Cryptocurrency</TableHead>
                      <TableHead>Entry/Exit</TableHead>
                      <TableHead>Position Size</TableHead>
                      <TableHead>Strategy</TableHead>
                      <TableHead>Outcome</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntries.length > 0 ? (
                      filteredEntries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.date}</TableCell>
                          <TableCell>{entry.cryptocurrency}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-green-500">
                                ${entry.entryPrice.toLocaleString()}
                              </span>
                              <span className="text-red-500">
                                ${entry.exitPrice.toLocaleString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{entry.positionSize}</TableCell>
                          <TableCell
                            className="max-w-[200px] truncate"
                            title={entry.strategy}
                          >
                            {entry.strategy}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getOutcomeBadgeColor(entry.outcome)}
                            >
                              {entry.outcome.charAt(0).toUpperCase() +
                                entry.outcome.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No entries found. Try adjusting your search or filter.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={newEntry.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cryptocurrency">Cryptocurrency</Label>
                    <Input
                      id="cryptocurrency"
                      name="cryptocurrency"
                      placeholder="Bitcoin, Ethereum, etc."
                      value={newEntry.cryptocurrency}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entryPrice">Entry Price ($)</Label>
                    <Input
                      id="entryPrice"
                      name="entryPrice"
                      type="number"
                      step="0.01"
                      value={newEntry.entryPrice}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exitPrice">Exit Price ($)</Label>
                    <Input
                      id="exitPrice"
                      name="exitPrice"
                      type="number"
                      step="0.01"
                      value={newEntry.exitPrice}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="positionSize">Position Size</Label>
                    <Input
                      id="positionSize"
                      name="positionSize"
                      type="number"
                      step="0.01"
                      value={newEntry.positionSize}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="outcome">Outcome</Label>
                    <Select
                      value={newEntry.outcome}
                      onValueChange={(value) =>
                        handleSelectChange("outcome", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select outcome" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="profit">Profit</SelectItem>
                        <SelectItem value="loss">Loss</SelectItem>
                        <SelectItem value="breakeven">Breakeven</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="strategy">Strategy</Label>
                    <Input
                      id="strategy"
                      name="strategy"
                      placeholder="Describe your trading strategy"
                      value={newEntry.strategy}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="marketConditions">Market Conditions</Label>
                    <Textarea
                      id="marketConditions"
                      name="marketConditions"
                      placeholder="Describe the market conditions during this trade"
                      value={newEntry.marketConditions}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Additional notes, lessons learned, etc."
                      value={newEntry.notes}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("entries")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Entry</Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredEntries.length} entries
          </p>
          {activeTab === "entries" && (
            <Button
              onClick={() => setActiveTab("new")}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> New Entry
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TradersJournal;
