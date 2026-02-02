
"use client";

import React from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ZAxis,
    Cell
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelperOptionData, calculateOptionPrice } from "@/lib/blackScholes";

interface PriceHeatmapProps {
    data: HelperOptionData;
}

export function PriceHeatmap({ data }: PriceHeatmapProps) {
    // Generate a grid of (Time, Spot) -> Price
    // We'll use a Scatter plot to simulate a heatmap/surface top-down view

    const generateData = () => {
        const points = [];
        const spotStart = data.S * 0.8;
        const spotEnd = data.S * 1.2;
        const timeStart = 0.01;
        const timeEnd = Math.max(data.T, 1.0); // Show at least 1 year or current T

        const spotSteps = 20;
        const timeSteps = 20;

        for (let i = 0; i < spotSteps; i++) {
            for (let j = 0; j < timeSteps; j++) {
                const spot = spotStart + (i / spotSteps) * (spotEnd - spotStart);
                const time = timeStart + (j / timeSteps) * (timeEnd - timeStart);

                const price = calculateOptionPrice({ ...data, S: spot, T: time }, "call");

                // Add coordinates and value for coloring
                points.push({
                    x: time, // Time on X
                    y: spot, // Spot on Y
                    z: price, // Price determines color
                });
            }
        }
        return points;
    };

    const chartData = generateData();
    const maxPrice = Math.max(...chartData.map(d => d.z));
    const minPrice = Math.min(...chartData.map(d => d.z));

    // Color interpolation function
    const getColor = (value: number) => {
        const ratio = (value - minPrice) / (maxPrice - minPrice || 1);
        // Interpolate between dark blue (low) and bright orange (high)
        // Low: oklch(0.2 0.1 260) -> High: oklch(0.7 0.2 50)
        // Simplified RGB interpolation for inline style
        // Dark Blue: #1e3a8a (30, 58, 138)
        // Bright Orange: #f97316 (249, 115, 22)

        const r = Math.round(30 + ratio * (249 - 30));
        const g = Math.round(58 + ratio * (115 - 58));
        const b = Math.round(138 + ratio * (22 - 138));
        return `rgb(${r},${g},${b})`;
    };

    return (
        <Card className="h-[400px] w-full bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-primary font-mono tracking-tighter text-lg uppercase">
                    Price Surface (Decay View)
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.2} />
                        <XAxis
                            type="number"
                            dataKey="x"
                            name="Time"
                            unit="y"
                            stroke="var(--muted-foreground)"
                            label={{ value: "Time to Maturity", position: "insideBottom", offset: -10, fill: "var(--muted-foreground)" }}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Spot"
                            unit="$"
                            stroke="var(--muted-foreground)"
                            label={{ value: "Spot Price", angle: -90, position: "insideLeft", fill: "var(--muted-foreground)" }}
                        />
                        <ZAxis type="number" dataKey="z" range={[50, 50]} />
                        {/* Note: ZAxis range controls dot size. We simulate heatmap with large square dots? Or just colored dots. */}
                        <Tooltip
                            cursor={{ strokeDasharray: "3 3" }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="bg-card border border-border p-2 rounded shadow text-xs">
                                            <p className="font-mono">Time: {d.x.toFixed(2)}y</p>
                                            <p className="font-mono">Spot: ${d.y.toFixed(2)}</p>
                                            <p className="font-mono text-primary">Price: ${d.z.toFixed(2)}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Scatter data={chartData} shape="square">
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColor(entry.z)} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
