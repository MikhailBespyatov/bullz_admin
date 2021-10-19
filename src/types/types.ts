import { lg, lg_1, md, md_1, sm, sm_1, xl, xl_1, xs, xs_1, xxl, xxl_1 } from 'constants/styles/sizes';
import { Moment } from 'moment';

export type noop = () => void;

export type alertStatusType = 'info' | 'success' | 'error' | undefined;
export type womValidationStageType = 0 | 1 | 2 | 3 | undefined;
export type videoCurationStateType = BULLZ.VideoCurationState | undefined;

export type SubjectType = string | boolean | string[];

export type OkHandlerType = (subject: SubjectType) => Promise<void>;

export type AuthValuesType = {
    password: string;
    usernameOrEmail: string;
};

export type RegisterValuesType = {
    username: string;
    email: string;
    password: string;
};

export type dateRangeMomentType = [Moment, Moment] | null;

// TODO: reduce expression
export type size =
    | typeof xs
    | typeof sm
    | typeof md
    | typeof lg
    | typeof xl
    | typeof xxl
    | typeof xs_1
    | typeof sm_1
    | typeof md_1
    | typeof lg_1
    | typeof xl_1
    | typeof xxl_1;

export type PropertyBlockType = 'id' | 'date';

export type OverflowType = 'scroll';

export type SortType = '+asc' | '+desc';

export type LevelType = 'low' | 'medium' | 'high';

export type AlignmentType = 'start' | 'center' | 'end';
