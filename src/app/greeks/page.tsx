
"use client";

import { useOptionData } from "@/context/OptionContext";
import { InputPanel } from "@/components/InputPanel";
import { GreeksCharts } from "@/components/GreeksCharts";

export default function GreeksPage() {
    const { data, setData } = useOptionData();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Panel */}
            <div className="lg:col-span-4 space-y-6">
                <InputPanel data={data} onChange={setData} />
            </div>

            {/* Greeks Charts */}
            <div className="lg:col-span-8 space-y-6">
                <h1 className="text-2xl font-bold font-mono uppercase tracking-tight text-primary">
                    The Greeks
                </h1>
                <p className="text-muted-foreground text-sm">
                    Sensitivities of the option price to different risk factors.
                </p>
                <GreeksCharts data={data} />
            </div>
        </div>
    );
}
