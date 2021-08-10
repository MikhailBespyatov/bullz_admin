import { DefaultChecked, Disabled } from 'types/form';

export interface CheckboxProps extends DefaultChecked, Disabled {
    checked?: boolean;
}
