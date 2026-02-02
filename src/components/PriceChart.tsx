
"use client";

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelperOptionData, calculateOptionPrice } from "@/lib/blackScholes";

interface PriceChartProps {
    data: HelperOptionData;
}

export function PriceChart({ data }: PriceChartProps) {
    // Generate data points for Spot Price range (e.g. +/- 50% of current Spot)
    const generateData = () => {
        const points = [];
        const range = 0.5; // 50% range
        const start = Math.max(1, data.S * (1 - range));
        const end = data.S * (1 + range);
        const steps = 50;
        const stepSize = (end - start) / steps;

        for (let i = 0; i <= steps; i++) {
            const spot = start + i * stepSize;
            const tempData = { ...data, S: spot };
            points.push({
                spot: spot.toFixed(2),
                call: calculateOptionPrice(tempData, "call"),
                put: calculateOptionPrice(tempData, "put"),
                current: spot >= data.S && spot - stepSize < data.S, // Mark current spot
            });
        }
        return points;
    };

    const chartData = generateData();

    return (
        <Card className="h-[400px] w-full bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-primary font-mono tracking-tighter text-lg uppercase">
                    Option Price vs Spot
                </CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                        <XAxis
                            dataKey="spot"
                            stroke="var(--muted-foreground)"
                            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                            tickFormatter={(val) => `$${Math.round(val)}`}
                        />
                        <YAxis
                            stroke="var(--muted-foreground)"
                            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                            tickFormatter={(val) => `$${Math.round(val)}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--card)",
                                borderColor: "var(--border)",
                                color: "var(--foreground)",
                                fontSize: "12px",
                            }}
                            cursor={{ stroke: "var(--muted-foreground)", strokeWidth: 1 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="call"
                            name="Call Price"
                            stroke="var(--chart-1)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="put"
                            name="Put Price"
                            stroke="var(--chart-2)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, strokeWidth: 0 }}
                        />
                        <ReferenceLine x={data.S.toFixed(2)} stroke="var(--primary)" strokeDasharray="3 3" label={{ position: 'top', value: 'Current', fill: 'var(--primary)', fontSize: 10 }} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
