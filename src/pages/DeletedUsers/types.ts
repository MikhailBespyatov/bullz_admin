import { SortConfig } from 'hooks/useSortableData';
import { DataTable } from 'types/data';
import { BackgroundColor } from 'types/styles';

export type ReasonTypes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Columns {
    title: string;
    isSorted?: boolean;
    field?: string;
}
export interface TableProps extends BackgroundColor {
    columns: Columns[];
    columnSizes?: string[];
    data?: DataTable[];
    onSort?: (value: string) => void;
    sortState?: SortConfig | null;
}
