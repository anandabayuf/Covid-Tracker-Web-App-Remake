export interface TableDataType {
    key?: number;
    combinedKey?: string | null | undefined;
    confirmed?: number | string | null | undefined;
    recovered?: number | string | null | undefined;
    deaths?: number | string | null | undefined;
    active?: number | string | null | undefined;
    peopleTested?: number | string | null | undefined;
    peopleHospitalized?: number | string | null | undefined;
    cases28Days?: number | null | undefined;
    deaths28Days?: number | null | undefined;
    incidentRate?: number | string | null | undefined;
    lastUpdate?: number | null | undefined;
    provinceState?: string | null | undefined;
    countryRegion?: string | null | undefined;
    incidenceRate?: string | null | undefined;
    ["case-fatalityRatio"]?: string | number | null | undefined;
}

export interface GlobalTableProps {
    data: []
}