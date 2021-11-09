// import resetIcon from 'assets/reset-icon.svg';
import { ResetButton } from 'componentsNewDesign/common/buttons/ResetButton/style';
import React from 'react';
import { ReactClick } from 'types/react';
import { TextProperties } from 'types/styles';

interface Props extends ReactClick<HTMLButtonElement>, TextProperties {}

export const ResetSearchButton = (props: Props) => (
    <ResetButton {...props}>
        {/* <CustomImg alt="Reset button" height={resetIconHeight} src={resetIcon} width={resetIconWidth} /> */}
        Reset
    </ResetButton>
);
