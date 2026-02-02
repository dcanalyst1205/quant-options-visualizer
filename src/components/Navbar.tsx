
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, TrendingUp } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();

    const routes = [
        {
            href: "/",
            label: "Dashboard",
            icon: <LineChart className="w-4 h-4 mr-2" />,
            active: pathname === "/",
        },
        {
            href: "/greeks",
            label: "The Greeks",
            icon: <BarChart3 className="w-4 h-4 mr-2" />,
            active: pathname === "/greeks",
        },
    ];

    return (
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4 max-w-7xl mx-auto">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <TrendingUp className="h-6 w-6 text-primary" />
                        <span className="hidden font-bold sm:inline-block text-lg tracking-tight">
                            QuantOptions
                        </span>
                    </Link>
                    <div className="flex gap-2">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.active ? "secondary" : "ghost"}
                                size="sm"
                                asChild
                            >
                                <Link href={route.href}>
                                    {route.icon}
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
