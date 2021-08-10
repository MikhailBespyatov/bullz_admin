import { ChangeEvent } from 'react';

export interface WithError {
    error?: boolean;
    success?: boolean;
    touched?: boolean;
}

export interface OnStringChange {
    onChange?: (value: string) => void;
}

export interface OnNumberChange {
    onChange?: (value: number) => void;
}

export interface OnBooleanChange {
    onChange?: (value: boolean) => void;
}

export interface OnCheckedChange {
    onChange?: (checked: boolean) => void;
}

export interface UntouchedWarning {
    untouchedWarning?: string;
}

export interface Name {
    name?: string | null;
}

export interface StrictName {
    name: string;
}

export interface Type {
    type?: string;
}

export interface Label {
    label?: string;
}

export interface Placeholder {
    placeholder?: string;
}

export interface Disabled {
    disabled?: boolean;
}

export interface Deleted {
    isDeleted?: boolean;
}

export interface DefaultValueString {
    defaultValue?: string;
}

export interface DefaultValueNumber {
    defaultValue?: number;
}

export interface DefaultValueBoolean {
    defaultValue?: boolean;
}

export interface DefaultChecked {
    defaultChecked?: boolean;
}

export interface NumberInput extends OnNumberChange, DefaultValueNumber {
    min?: number;
    max?: number;
    step?: number;
}

export interface TextFormInput extends Disabled, Type, Label, Name, DefaultValueString {
    error: string | undefined;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface TextInput extends Disabled, Label, Name, OnStringChange, DefaultValueString {
    error: string | undefined;
    type?: string;
}

export interface RadioProperties {
    defaultActive?: string;
    values: string[];
    data?: string[];
    onChange?: (active: string) => void;
}

export interface ItemRadioProperties {
    value: string;
    data?: string;
    onClick: (value: string) => void;
}

export interface BooleanCheckbox extends DefaultChecked, Disabled, Name, OnCheckedChange {}

export interface HTMLButtonType {
    type?: 'submit' | 'button' | 'reset' | undefined;
}

export interface ProductCardEditableFields extends Name {
    description?: string;
    hashTags?: string[];
    imageUrl?: string;
}

export interface TeamCardEditableFields extends Name {
    urlName?: string | null;
}

export interface VideoCardEditableFields {
    title?: string;
    subtitle?: string;
    hashTags?: string[];
}

export interface VideoCardEditableChange {
    onChange?: (fields: VideoCardEditableFields) => void;
}

export interface ProductCardEditableChange {
    onChange?: (fields: ProductCardEditableFields) => void;
}

export interface TeamCardEditableChange {
    onChange?: (fields: TeamCardEditableFields) => void;
}

export interface OnDataRangeChange {
    onChange: (dateRange: [string, string]) => void;
}
