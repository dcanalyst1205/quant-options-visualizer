
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { HelperOptionData } from "@/lib/blackScholes";

interface InputPanelProps {
    data: HelperOptionData;
    onChange: (data: HelperOptionData) => void;
}

export function InputPanel({ data, onChange }: InputPanelProps) {
    const handleChange = (field: keyof HelperOptionData, value: number) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <Card className="w-full bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-primary font-mono tracking-tighter text-lg uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Market Data
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Spot Price */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono uppercase text-muted-foreground">
                        <Label>Spot Price ($)</Label>
                        <span>{data.S.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Input
                            type="number"
                            value={data.S}
                            onChange={(e) => handleChange("S", Number(e.target.value))}
                            className="w-24 font-mono text-center h-8 bg-background/50 border-input"
                        />
                        <Slider
                            min={1}
                            max={500}
                            step={0.5}
                            value={[data.S]}
                            onValueChange={(vals) => handleChange("S", vals[0])}
                            className="flex-1"
                        />
                    </div>
                </div>

                {/* Strike Price */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono uppercase text-muted-foreground">
                        <Label>Strike Price ($)</Label>
                        <span>{data.K.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Input
                            type="number"
                            value={data.K}
                            onChange={(e) => handleChange("K", Number(e.target.value))}
                            className="w-24 font-mono text-center h-8 bg-background/50 border-input"
                        />
                        <Slider
                            min={1}
                            max={500}
                            step={0.5}
                            value={[data.K]}
                            onValueChange={(vals) => handleChange("K", vals[0])}
                            className="flex-1"
                        />
                    </div>
                </div>

                {/* Time to Maturity */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono uppercase text-muted-foreground">
                        <Label>Time (Years)</Label>
                        <span>{data.T.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Input
                            type="number"
                            value={data.T}
                            onChange={(e) => handleChange("T", Number(e.target.value))}
                            step={0.01}
                            className="w-24 font-mono text-center h-8 bg-background/50 border-input"
                        />
                        <Slider
                            min={0.01}
                            max={5}
                            step={0.01}
                            value={[data.T]}
                            onValueChange={(vals) => handleChange("T", vals[0])}
                            className="flex-1"
                        />
                    </div>
                </div>

                {/* Volatility */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono uppercase text-muted-foreground">
                        <Label>Volatility (%)</Label>
                        <span>{(data.sigma * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Input
                            type="number"
                            value={data.sigma * 100}
                            onChange={(e) => handleChange("sigma", Number(e.target.value) / 100)}
                            className="w-24 font-mono text-center h-8 bg-background/50 border-input"
                        />
                        <Slider
                            min={1}
                            max={200}
                            step={1}
                            value={[data.sigma * 100]}
                            onValueChange={(vals) => handleChange("sigma", vals[0] / 100)}
                            className="flex-1"
                        />
                    </div>
                </div>

                {/* Risk Free Rate */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono uppercase text-muted-foreground">
                        <Label>Risk-Free Rate (%)</Label>
                        <span>{(data.r * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Input
                            type="number"
                            value={data.r * 100}
                            onChange={(e) => handleChange("r", Number(e.target.value) / 100)}
                            className="w-24 font-mono text-center h-8 bg-background/50 border-input"
                        />
                        <Slider
                            min={0}
                            max={20}
                            step={0.1}
                            value={[data.r * 100]}
                            onValueChange={(vals) => handleChange("r", vals[0] / 100)}
                            className="flex-1"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
