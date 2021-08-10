import React, { FC } from 'react';
import { CSVLink } from 'react-csv';
import { CSVButton, DisabledButton } from './styles';
import { CommonPropTypes } from 'react-csv/components/CommonPropTypes';
import { Disabled } from 'types/form';

interface SaveCSVButtonProps extends Pick<CommonPropTypes, 'data' | 'headers' | 'filename'>, Disabled {}

export const SaveCSVButton: FC<SaveCSVButtonProps> = ({ children, disabled, data, headers, filename }) => {
    if (disabled) return <DisabledButton>{children}</DisabledButton>;

    return (
        <CSVButton>
            <CSVLink data={data} filename={filename} headers={headers}>
                {children}
            </CSVLink>
        </CSVButton>
    );
};
