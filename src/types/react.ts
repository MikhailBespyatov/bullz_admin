import { ChangeEvent, KeyboardEvent, MouseEvent, RefObject } from 'react';

export interface ReactRefType<T> {
    ref?: RefObject<T> | ((instance: T | null) => void) | null;
}

export interface ReactClick<T> {
    onClick?: (e: MouseEvent<T>) => void;
}

export interface ReactChange<T> {
    onChange?: (e: ChangeEvent<T>) => void;
}

export interface ReactKeyboard<T> {
    onKeyDown?: (e: KeyboardEvent<T>) => void;
}
