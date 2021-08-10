import arrowDown from 'assets/icons/sort_arrow_down.svg';
import { arrowHeight, arrowWidth, SortType } from 'componentsNewDesign/common/buttons/SortSelectorButton/constants';
import { ButtonSpan, SortButtonWrapper } from 'componentsNewDesign/common/buttons/SortSelectorButton/styles';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { OpacityActiveEffect } from 'componentsNewDesign/dynamic/effects';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import React from 'react';
import { Active } from 'types/global';
import { MarginRightBottom } from 'types/styles';
import { noop } from 'types/types';

export interface Props extends MarginRightBottom, Active {
    onChange?: noop;
    state: SortType;
    children: string;
}

export const SortSelectorButton = ({ onChange, children, state }: Props) => (
    <ClickableWrapper width="100%" onClick={onChange}>
        <SortButtonWrapper>
            <Row alignCenter noWrap>
                <MarginWrapper margin="0 5px">
                    <ButtonSpan>{children}</ButtonSpan>
                </MarginWrapper>
                <Column alignCenter>
                    <OpacityActiveEffect active={state === 'ascending'}>
                        <CustomImg
                            alt="Arrow up"
                            height={arrowHeight}
                            rotate={180}
                            src={arrowDown}
                            width={arrowWidth}
                        />
                    </OpacityActiveEffect>

                    <OpacityActiveEffect active={state === 'descending'}>
                        <CustomImg alt="Arrow down" height={arrowHeight} src={arrowDown} width={arrowWidth} />
                    </OpacityActiveEffect>
                </Column>
            </Row>
        </SortButtonWrapper>
    </ClickableWrapper>
);
