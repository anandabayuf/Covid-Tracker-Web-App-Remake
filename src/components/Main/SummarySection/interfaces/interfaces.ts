import { ReactNode } from "react";

export interface SummarySectionProps {
    children?: ReactNode;
    confirmed?: number;
    deaths?: number;
    recovered?: number;
    lastUpdate?: string;
}