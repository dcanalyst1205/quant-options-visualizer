
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { HelperOptionData } from "@/lib/blackScholes";

interface OptionContextType {
    data: HelperOptionData;
    setData: (data: HelperOptionData) => void;
}

const defaultData: HelperOptionData = {
    S: 100,
    K: 100,
    T: 1,
    r: 0.05,
    sigma: 0.2,
};

const OptionContext = createContext<OptionContextType | undefined>(undefined);

export function OptionProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<HelperOptionData>(defaultData);

    return (
        <OptionContext.Provider value={{ data, setData }}>
            {children}
        </OptionContext.Provider>
    );
}

export function useOptionData() {
    const context = useContext(OptionContext);
    if (context === undefined) {
        throw new Error("useOptionData must be used within an OptionProvider");
    }
    return context;
}
