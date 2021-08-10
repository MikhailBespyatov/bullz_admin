export interface TableData {
    cells: React.ReactNode[];
}

export interface TableProps {
    tableTitles: string[];
    columnSizes?: number[];
    data: TableData[];
    tableWidth?: string;
    cellsWidth: string[];
}
