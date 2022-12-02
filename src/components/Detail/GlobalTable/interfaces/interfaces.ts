export interface TableDataType {
    key: number;
    combinedKey: string | null | undefined;
    confirmed: number | null | undefined;
    recovered: number | null | undefined;
    deaths: number | null | undefined;
    active: number | null | undefined;
    peopleTested: number | string | null | undefined;
    peopleHospitalized: number | string | null | undefined;
    cases28Days: number | null | undefined;
    deaths28Days: number | null | undefined;
    incidentRate: number | null | undefined;
    lastUpdate: number | null | undefined;
}

export interface GlobalTableProps {
    data: []
}