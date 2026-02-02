
"use client";

import { useOptionData } from "@/context/OptionContext";
import { InputPanel } from "@/components/InputPanel";
import { PriceChart } from "@/components/PriceChart";
import { PriceHeatmap } from "@/components/PriceHeatmap";
import { calculateOptionPrice } from "@/lib/blackScholes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const { data, setData } = useOptionData();

  const callPrice = calculateOptionPrice(data, "call");
  const putPrice = calculateOptionPrice(data, "put");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Input Panel - Fixed on left for large screens or stacked */}
      <div className="lg:col-span-4 space-y-6">
        <InputPanel data={data} onChange={setData} />

        {/* Pricing Summary Card */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary font-mono tracking-tighter text-lg uppercase">
              Calculated Prices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-md bg-chart-1/10 border border-chart-1/20">
              <span className="font-mono text-sm text-chart-1 uppercase font-bold">Call Option</span>
              <span className="font-mono text-2xl font-bold text-foreground">
                ${callPrice.toFixed(4)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-md bg-chart-2/10 border border-chart-2/20">
              <span className="font-mono text-sm text-chart-2 uppercase font-bold">Put Option</span>
              <span className="font-mono text-2xl font-bold text-foreground">
                ${putPrice.toFixed(4)}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="text-xs text-muted-foreground font-mono">
              Model: Black-Scholes (Standard European)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-8 space-y-6">
        {/* Top Chart: 2D Analysis */}
        <PriceChart data={data} />

        {/* Bottom Chart: 3D Surface / Heatmap */}
        <div className="grid grid-cols-1 gap-6">
          <PriceHeatmap data={data} />
        </div>
      </div>
    </div>
  );
}
