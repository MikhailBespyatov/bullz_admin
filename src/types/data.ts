import { Roles } from 'constants/defaults/users';
import { AlignmentType, noop } from 'types/types';

export interface Index {
    i: number;
}

export interface Alt {
    alt?: string;
}

export interface Subtitle {
    subtitle?: string;
}

export interface StrictTitle extends Subtitle {
    title: string;
}

export interface Title extends Subtitle {
    title?: string;
}

export interface ButtonTitle {
    buttonTitle?: string;
}

export interface Closable {
    closable?: boolean;
    onClose?: noop;
}

export interface IsClosed {
    isClosed?: boolean;
}

export interface WithSrc {
    src?: string;
}

export interface ImgProperties extends Alt {
    src?: string;
}

export interface ImgStrictProperties extends Alt {
    src: string;
}

export interface Id {
    id: string;
}

export interface TotalRecords {
    totalRecords?: number | undefined;
}

export interface WithoutFooter {
    withoutFooter?: boolean;
}

export interface SearchParameters {
    searchBy: string;
    defaultValue?: string | null;
    placeholder?: string;
    onSearch: (value: string) => void;
    /* All roles from accessFilter array have access to defined search field, if accessFilter not set - default access setting */
    accessFilter?: Roles[];
    regExp?: RegExp;
}

export interface Success {
    success: string;
}

export interface PopoverType {
    type?: 'top' | 'down';
}

export interface Expanded {
    isExpanded?: boolean;
}

export interface Loading {
    loading: boolean;
}

export interface AccessList {
    accessList: Roles[];
}

export interface ActivityStatistics {
    activityStatistics?: YEAY.MarketingStatistics[];
}

export interface UserLevel {
    level: YEAY.LevelType;
}
export interface Alignment {
    alignment?: AlignmentType[];
}
export interface ColumnAlignment {
    columnAlignment?: AlignmentType;
}

export interface DataTable extends Alignment {
    cells: React.ReactNode[];
    isCheckedRow?: boolean;
}
