import { StyledButton } from 'componentsNewDesign/common/buttons/GenerateReportButton/styles';
import React from 'react';
import { ReactClick } from 'types/react';

export interface GenerateReportButtonProps extends ReactClick<HTMLButtonElement> {}

export const GenerateReportButton = ({ onClick }: GenerateReportButtonProps) => (
    <>
        <StyledButton onClick={onClick}>Generate Report</StyledButton>

        {/* <SimpleButton
            background={grey8}
            border={`1px dashed ${grey18}`}
            fontSize={cardButtonTextFontSize}
            height={cardButtonHeight}
            marginBottom={cardButtonMarginBottom}
            minWidth={cardButtonMinWidth}
            onClick={onClick}
        >
            Generate Report
        </SimpleButton> */}
    </>
);
