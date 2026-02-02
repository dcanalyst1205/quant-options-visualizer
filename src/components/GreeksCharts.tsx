
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
import { HelperOptionData, calculateGreeks } from "@/lib/blackScholes";

interface GreeksChartsProps {
    data: HelperOptionData;
}

export function GreeksCharts({ data }: GreeksChartsProps) {
    const generateData = () => {
        const points = [];
        const range = 0.5; // 50% range
        const start = Math.max(1, data.S * (1 - range));
        const end = data.S * (1 + range);
        const steps = 40;
        const stepSize = (end - start) / steps;

        for (let i = 0; i <= steps; i++) {
            const spot = start + i * stepSize;
            const tempData = { ...data, S: spot };
            const greeks = calculateGreeks(tempData);
            points.push({
                spot: spot.toFixed(2),
                deltaCall: greeks.delta.call,
                deltaPut: greeks.delta.put,
                gamma: greeks.gamma,
                thetaCall: greeks.theta.call,
                thetaPut: greeks.theta.put,
                vega: greeks.vega,
                rhoCall: greeks.rho.call,
                rhoPut: greeks.rho.put,
            });
        }
        return points;
    };

    const chartData = generateData();

    const GreekChart = ({ title, dataKey, dataKey2, name1, name2, color1, color2 }: any) => (
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="py-2">
                <CardTitle className="text-sm font-mono uppercase text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                        <XAxis dataKey="spot" hide />
                        <YAxis
                            stroke="var(--muted-foreground)"
                            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                            width={30}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", fontSize: "12px" }}
                        />
                        <ReferenceLine x={data.S.toFixed(2)} stroke="var(--foreground)" strokeDasharray="3 3" opacity={0.5} />
                        <Line type="monotone" dataKey={dataKey} name={name1} stroke={color1} strokeWidth={2} dot={false} />
                        {dataKey2 && <Line type="monotone" dataKey={dataKey2} name={name2} stroke={color2} strokeWidth={2} dot={false} strokeDasharray="3 3" />}
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GreekChart
                title="Delta (Sensitivity to Stock Price)"
                dataKey="deltaCall"
                dataKey2="deltaPut"
                name1="Call Delta"
                name2="Put Delta"
                color1="var(--chart-1)"
                color2="var(--chart-2)"
            />
            <GreekChart
                title="Gamma (sensitivity to Delta)"
                dataKey="gamma"
                name1="Gamma"
                color1="var(--chart-3)"
                color2="var(--chart-3)"
            />
            <GreekChart
                title="Theta (Time Decay)"
                dataKey="thetaCall"
                dataKey2="thetaPut"
                name1="Call Theta"
                name2="Put Theta"
                color1="var(--chart-4)"
                color2="var(--chart-5)"
            />
            <GreekChart
                title="Vega (Sensitivity to Volatility)"
                dataKey="vega"
                name1="Vega"
                color1="var(--primary)"
                color2="var(--primary)"
            />
        </div>
    );
}
