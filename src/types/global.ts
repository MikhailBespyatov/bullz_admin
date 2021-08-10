import { noop } from 'types/types';
import { Roles } from 'constants/defaults/users';
import { AccessList } from 'types/data';

export interface Auth {
    access: Roles;
    authDenyReason?: string;
}

export interface Active {
    active?: boolean;
}

export interface NoopClick {
    onClick?: noop;
}

export interface WithHashtag {
    hashtag?: boolean;
}

export interface Quantity {
    quantity: number;
}

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface RoutesArray extends AccessList {
    path: string;
    name: string;
    renderIcon: (active: boolean, isExpanded: boolean) => JSX.Element;
}
