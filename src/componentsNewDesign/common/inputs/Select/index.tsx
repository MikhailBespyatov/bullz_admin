import { useMediaQuery } from '@material-ui/core';
import selectIcon from 'assets/select_icon.svg';
import { ArrowImg } from 'componentsNewDesign/common/imgComponents/ArrowImg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import {
    mobileItemHeight,
    selectorLeftPadding,
    selectorRightPadding,
    selectorVerticalPadding,
    titleMarginBottom
} from 'componentsNewDesign/common/inputs/Select/constants';
import {
    ItemsAbsoluteWrapper,
    ItemSpan,
    ItemWrapper,
    MobileItemsWrapper,
    SelectWrapper,
    SelectWrapperProps,
    TitleSpan
} from 'componentsNewDesign/common/inputs/Select/styles';
import { OpacityActiveEffect } from 'componentsNewDesign/dynamic/effects';
import { ContentWrapperProps } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { noop } from 'constants/functions';
import { xs } from 'constants/styles/sizes';
import { useCloseClick } from 'hooks/closeClick';
import { useRefWidthAndHeight } from 'hooks/getRefProperty';
import { useModal } from 'hooks/modal';
import React, { useEffect, useRef, useState } from 'react';
import { Title } from 'types/data';
import { Disabled } from 'types/form';
import { BorderProperties, Padding } from 'types/styles';

// const ItemSpan: FC<Active> = ({ children, active }) => (
//     <Span
//         noWrap
//         color={active ? selectedTextColor : defaultTextColor}
//         fontSize="14px"
//         fontWeight="500"
//         lineHeight="17px"
//     >
//         {children}
//     </Span>
// );

// * calculation of top position depends on padding-bottom and top, not on a padding
export interface SelectProps
    extends Omit<ContentWrapperProps, 'padding'>,
        Pick<Title, 'title'>,
        SelectWrapperProps,
        Pick<Padding, 'padding'>,
        Pick<BorderProperties, 'border'>,
        Disabled {
    selector: string[];
    defaultIndex?: number;
    onChange?: (index: number) => void;
    onMultipleChange?: (index: number[]) => void;
    isMultiple?: boolean;
    values?: number[];
}

export const Select = ({
    selector,
    title,
    padding,
    border,
    paddingBottom = selectorVerticalPadding,
    paddingLeft = selectorLeftPadding,
    paddingRight = selectorRightPadding,
    paddingTop = selectorVerticalPadding,
    backgroundColor,
    isMultiple,
    onMultipleChange = noop,
    values = [0],
    defaultIndex = 0,
    onChange = noop,
    disabled,
    ...wrapperStyles
}: SelectProps) => {
    // const [isOpen, toggleIsOpened] = useToggle();
    const { visible, close, open } = useModal();
    const componentRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const [, selectHeight] = useRefWidthAndHeight(selectRef);
    const isMobile = useMediaQuery(`(max-width: ${xs})`);
    const customMargin = mobileItemHeight * selector.length;

    const top = selectHeight + parseInt(selectorVerticalPadding) + parseInt(selectorVerticalPadding) + 'px';

    const [activeIndex, setActiveIndex] = useState(isMultiple ? values[0] : defaultIndex);

    const openClick = () => !disabled && open();
    const selectClick = (index: number) => {
        const returnedValues = values?.some(value => index === value)
            ? values?.filter(value => index !== value)
            : [...values, index];

        isMultiple ? onMultipleChange(returnedValues) : onChange(index);
        isMultiple ? setActiveIndex(returnedValues[0]) : setActiveIndex(index);
        close();
    };

    useCloseClick(componentRef, close);

    // const closeClick = (e: MouseEvent) => {
    //     if (!openButtonRef.current) return;
    //
    //     if (openButtonRef.current !== e.target && openButtonRef.current.childNodes[0] !== e.target) {
    //         close();
    //     }
    // };

    useEffect(() => setActiveIndex(defaultIndex), [defaultIndex]);
    useEffect(() => {
        isMultiple && setActiveIndex(values[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    // useEffect(() => {
    //     document.addEventListener('click', closeClick);
    //
    //     return () => document.removeEventListener('click', closeClick);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <>
            <SelectWrapper
                ref={componentRef}
                backgroundColor={backgroundColor}
                border={border}
                padding={padding}
                paddingBottom={title ? selectorRightPadding : paddingBottom}
                paddingLeft={paddingLeft}
                paddingRight={paddingRight}
                paddingTop={title ? selectorRightPadding : paddingTop}
                onClick={visible ? close : openClick}
                {...wrapperStyles}
                disabled={disabled}
            >
                <Column ref={selectRef} width="100%">
                    {title && (
                        <Row marginBottom={titleMarginBottom}>
                            <TitleSpan>{title}</TitleSpan>
                        </Row>
                    )}
                    <Section alignCenter justifyBetween noWrap>
                        <MarginWrapper marginRight="20px">
                            <ItemSpan fontStyle="bold" fontWeight="700">
                                {selector[activeIndex]}
                            </ItemSpan>
                        </MarginWrapper>
                        {!disabled && selector.length !== 1 && <ArrowImg rotate={visible ? 180 : 0} />}
                    </Section>
                </Column>
                {!isMobile ? (
                    <ItemsAbsoluteWrapper top={top} visible={visible}>
                        <Column>
                            {selector.map((item, i) => {
                                const isActive = isMultiple ? values?.some(value => i === value) : i === activeIndex;
                                return (
                                    <ItemWrapper key={item} active={isActive} onClick={() => selectClick(i)}>
                                        <ItemSpan>{item}</ItemSpan>
                                        <OpacityActiveEffect active={isActive} opacity={0}>
                                            <CustomImg alt="Select Icon" height="12px" src={selectIcon} width="13px" />
                                        </OpacityActiveEffect>
                                    </ItemWrapper>
                                );
                            })}
                            {/*<LastBorderRadiusBlock />*/}
                        </Column>
                    </ItemsAbsoluteWrapper>
                ) : null}
            </SelectWrapper>
            {isMobile && (
                <MobileItemsWrapper customMargin={customMargin} isClosed={!visible}>
                    {selector.map((item, i) => {
                        const isActive = i === activeIndex;
                        console.log(isActive);

                        return (
                            <ItemWrapper
                                key={item}
                                active={isActive}
                                onClick={() => {
                                    selectClick(i);
                                    close();
                                }}
                            >
                                <ItemSpan fontWeight="normal">{item}</ItemSpan>
                            </ItemWrapper>
                        );
                    })}
                </MobileItemsWrapper>
            )}
        </>
    );
};
