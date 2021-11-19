import expandIcon from 'assets/expand.svg';
import arrowImg from 'assets/left_arrow.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { defaultLimit } from 'constants/defaults/filterSettings';
import { grey29 } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
import { useCloseClick } from 'hooks/closeClick';
import { useModal } from 'hooks/modal';
import React, { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
    arrowImgHeight,
    arrowImgWidth,
    expandButtonHeight,
    itemHeight,
    pagination,
    PaginationCellFontSize,
    PaginationCellFontWeight,
    paginationCellHeight,
    PaginationCellLineHeight,
    paginationLimit,
    paginationLimitMobile,
    paginationMobile,
    paginationWrapperHorizontalMargin,
    selectorHorizontalPadding,
    selectorVerticalPadding,
    sizeValues,
    threeDots
} from './constants';
import {
    Arrow,
    ItemsAbsoluteWrapper,
    ItemSpan,
    ItemWrapper,
    PaginationCell,
    PaginationInput,
    PaginationWrapper
} from './styles';

export interface WrapperProps {
    currentIndex: number;
    pagesLimit?: number;
    totalItems?: number;
    defaultSize?: number;
    onSizeChange: (current: number, size: number) => void;
    height?: string;
}

interface Props {
    activeIndex: number;
    total: number;
    onChange: (current: number) => void;
}

interface SelectProps {
    selector: string[];
    activeItem?: string;
    onChange: (name: string) => void;
}

const Select = ({ selector, activeItem = selector[0], onChange }: SelectProps) => {
    const { visible, close, open } = useModal();
    const componentRef = useRef<HTMLDivElement>(null);

    const [activeItemName, setActiveItemName] = useState(activeItem);

    const openClick = () => open();
    const selectClick = (name: string) => {
        onChange(name);
        setActiveItemName(name);
        close();
    };

    useCloseClick(componentRef, close);

    useEffect(() => {
        setActiveItemName(activeItem);
    }, [activeItem]);

    return (
        <ContentWrapper
            ref={componentRef}
            backgroundColor={grey29}
            minWidth="93px"
            padding={`${selectorVerticalPadding} 0`}
            onClick={visible ? close : openClick}
        >
            <RelativeWrapper>
                <Row
                    alignCenter
                    justifyBetween
                    noWrap
                    marginLeft={selectorVerticalPadding}
                    marginRight={selectorVerticalPadding}
                >
                    <ItemSpan>{`${activeItemName} / Page`}</ItemSpan>
                    {selector.length !== 1 && (
                        <ClickableWrapper height={expandButtonHeight} width={expandButtonHeight}>
                            <CustomImg pointer height="9px" rotate={visible ? 180 : 0} src={expandIcon} />
                        </ClickableWrapper>
                    )}
                </Row>
                {visible && (
                    <ItemsAbsoluteWrapper
                        left="0"
                        top={-1 * selector.length * parseInt(itemHeight) - parseInt(selectorHorizontalPadding) + 'px'}
                        width="100%"
                        zIndex="10"
                    >
                        <Column>
                            {selector.map(item => (
                                <ItemWrapper
                                    key={item}
                                    active={item === activeItemName}
                                    onClick={() => selectClick(item)}
                                >
                                    <MarginWrapper marginLeft={selectorVerticalPadding}>
                                        <ItemSpan>{item}</ItemSpan>
                                    </MarginWrapper>
                                </ItemWrapper>
                            ))}
                        </Column>
                    </ItemsAbsoluteWrapper>
                )}
            </RelativeWrapper>
        </ContentWrapper>
    );
};

const SmallPager = ({ activeIndex, total, onChange }: Props) => (
    <>
        {pagination
            // * first and last cells are rendered in parent element
            // * so we need exclude them from enumeration (total - 2)
            .filter((_, i) => i < total - 2)
            .map((_, i) => (
                <PaginationCell key={i.toString()} active={i + 2 === activeIndex} onClick={() => onChange(i + 2)}>
                    {i + 2}
                </PaginationCell>
            ))}
    </>
);

const BigPager = ({ activeIndex, total, onChange }: Props) => {
    const isMobile = useMediaQuery({ query: `(max-width: ${xs})` });

    return !isMobile ? (
        <>
            {activeIndex <= paginationLimit
                ? pagination.map((_, i) => (
                      <PaginationCell key={i.toString()} active={activeIndex === 2 + i} onClick={() => onChange(2 + i)}>
                          {i + 2 === paginationLimit + 1 ? threeDots : 2 + i}
                      </PaginationCell>
                  ))
                : activeIndex > total - paginationLimit + 1
                ? pagination
                      .filter((_, i) => i !== paginationLimit - 1)
                      .map((_, i) => (
                          <PaginationCell
                              key={i.toString()}
                              active={activeIndex === total - paginationLimit + i + 1}
                              onClick={() => onChange(total - paginationLimit + i + 1)}
                          >
                              {i + 2 === 2 ? '...' : total - paginationLimit + i + 1}
                          </PaginationCell>
                      ))
                : pagination.map((_, i) => (
                      <PaginationCell
                          key={i.toString()}
                          active={activeIndex === activeIndex - (paginationLimit - 1) / 2 + i}
                          onClick={() => onChange(activeIndex - (paginationLimit - 1) / 2 + i)}
                      >
                          {i === 0 || i === paginationLimit - 1 ? '...' : activeIndex - (paginationLimit - 1) / 2 + i}
                      </PaginationCell>
                  ))}
        </>
    ) : (
        <>
            {activeIndex <= paginationLimitMobile
                ? paginationMobile.map((_, i) => (
                      <PaginationCell key={i.toString()} active={activeIndex === 2 + i} onClick={() => onChange(2 + i)}>
                          {i === paginationLimitMobile - 1 ? threeDots : 2 + i}
                      </PaginationCell>
                  ))
                : activeIndex > total - paginationLimitMobile + 1
                ? paginationMobile
                      .filter((_, i) => i !== paginationLimitMobile - 1)
                      .map((_, i) => (
                          <PaginationCell
                              key={i.toString()}
                              active={activeIndex === total - paginationLimitMobile + i + 1}
                              onClick={() => onChange(total - paginationLimitMobile + i + 1)}
                          >
                              {i + 2 === 2 ? '...' : total - paginationLimitMobile + i + 1}
                          </PaginationCell>
                      ))
                : paginationMobile.map((_, i) => (
                      <PaginationCell
                          key={i.toString()}
                          active={activeIndex === activeIndex - (paginationLimitMobile - 1) / 2 + i}
                          onClick={() => onChange(activeIndex - (paginationLimitMobile - 1) / 2 + i)}
                      >
                          {i === 0 || i === paginationLimitMobile - 1
                              ? '...'
                              : activeIndex - (paginationLimitMobile - 1) / 2 + i}
                      </PaginationCell>
                  ))}
        </>
    );
};

export const Pagination = ({
    currentIndex,
    onSizeChange,
    totalItems = 0,
    defaultSize = defaultLimit,
    pagesLimit,
    height
}: WrapperProps) => {
    const total = useMemo(() => {
        if (totalItems === 0) return totalItems;

        const totalItemsValue = Math.trunc((totalItems - 1) / defaultSize + 1);

        return pagesLimit && totalItemsValue >= pagesLimit ? pagesLimit : totalItemsValue;
    }, [defaultSize, totalItems, pagesLimit]);

    const isMobile = useMediaQuery({ query: `(max-width: ${xs})` });

    const [valuePage, setValuePage] = useState('');
    const [size, setSize] = useState(defaultSize);

    const handlePageSet = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        if (!isNaN(parseInt(inputValue[inputValue.length - 1])) || !inputValue) {
            setValuePage(e.currentTarget.value);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSizeChange(parseInt(valuePage) - 1, size);
            setValuePage('');
        }
    };

    const onIndexChange = (index: number) => onSizeChange(index - 1, size);

    const onSizeAndIndexChange = (size: string) => {
        setSize(Number(size));
        onSizeChange(0, Number(size));
    };

    return (
        <>
            {total !== 0 && (
                <Section alignCenter justifyCenter height={height}>
                    {!isMobile ? (
                        <>
                            <MarginWrapper marginRight={paginationWrapperHorizontalMargin}>
                                <Arrow disabled={currentIndex === 1} onClick={() => onIndexChange(currentIndex - 1)}>
                                    <CustomImg height={arrowImgHeight} src={arrowImg} width={arrowImgWidth} />
                                </Arrow>
                            </MarginWrapper>
                            <PaginationWrapper>
                                <PaginationCell active={1 === currentIndex} onClick={() => onIndexChange(1)}>
                                    1
                                </PaginationCell>
                                {total - 2 <= paginationLimit ? (
                                    <SmallPager activeIndex={currentIndex} total={total} onChange={onIndexChange} />
                                ) : (
                                    <BigPager activeIndex={currentIndex} total={total} onChange={onIndexChange} />
                                )}
                                {total !== 1 && (
                                    <PaginationCell
                                        active={total === currentIndex}
                                        onClick={() => onIndexChange(total)}
                                    >
                                        {total}
                                    </PaginationCell>
                                )}
                            </PaginationWrapper>

                            <MarginWrapper marginRight="60px">
                                <Arrow
                                    disabled={currentIndex === total}
                                    onClick={() => onIndexChange(currentIndex + 1)}
                                >
                                    <CustomImg
                                        height={arrowImgHeight}
                                        rotate={180}
                                        src={arrowImg}
                                        width={arrowImgWidth}
                                    />
                                </Arrow>
                            </MarginWrapper>

                            <Select
                                activeItem={defaultSize.toString()}
                                selector={sizeValues}
                                onChange={onSizeAndIndexChange}
                            />
                            <MarginWrapper marginLeft="24px">
                                <Row alignCenter height={paginationCellHeight} marginBottom="0">
                                    <Span
                                        fontSize={PaginationCellFontSize}
                                        fontWeight={PaginationCellFontWeight}
                                        lineHeight={PaginationCellLineHeight}
                                    >
                                        Go to
                                    </Span>
                                    <MarginWrapper marginLeft="9px">
                                        <PaginationInput
                                            value={valuePage}
                                            onChange={handlePageSet}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </MarginWrapper>
                                </Row>
                            </MarginWrapper>
                        </>
                    ) : (
                        <Column alignCenter width="100%">
                            <Row>
                                <MarginWrapper>
                                    <Arrow
                                        disabled={currentIndex === 1}
                                        onClick={() => onIndexChange(currentIndex - 1)}
                                    >
                                        <CustomImg height={arrowImgHeight} src={arrowImg} width={arrowImgWidth} />
                                    </Arrow>
                                </MarginWrapper>
                                <PaginationWrapper>
                                    <PaginationCell active={1 === currentIndex} onClick={() => onIndexChange(1)}>
                                        1
                                    </PaginationCell>
                                    {total - 2 <= paginationLimit ? (
                                        <SmallPager activeIndex={currentIndex} total={total} onChange={onIndexChange} />
                                    ) : (
                                        <BigPager activeIndex={currentIndex} total={total} onChange={onIndexChange} />
                                    )}
                                    {total !== 1 && (
                                        <PaginationCell
                                            active={total === currentIndex}
                                            onClick={() => onIndexChange(total)}
                                        >
                                            {total}
                                        </PaginationCell>
                                    )}
                                </PaginationWrapper>
                                <MarginWrapper marginRight="0">
                                    <Arrow
                                        disabled={currentIndex === total}
                                        onClick={() => onIndexChange(currentIndex + 1)}
                                    >
                                        <CustomImg
                                            height={arrowImgHeight}
                                            rotate={180}
                                            src={arrowImg}
                                            width={arrowImgWidth}
                                        />
                                    </Arrow>
                                </MarginWrapper>
                            </Row>
                            <Row>
                                <MarginWrapper marginTop="10px">
                                    <Select
                                        activeItem={defaultSize.toString()}
                                        selector={sizeValues}
                                        onChange={onSizeAndIndexChange}
                                    />
                                </MarginWrapper>
                                <MarginWrapper marginLeft="24px" marginTop="10px">
                                    <Row alignCenter height={paginationCellHeight} marginBottom="0">
                                        <Span
                                            fontSize={PaginationCellFontSize}
                                            fontWeight={PaginationCellFontWeight}
                                            lineHeight={PaginationCellLineHeight}
                                        >
                                            Go to
                                        </Span>
                                        <MarginWrapper marginLeft="9px">
                                            <PaginationInput
                                                value={valuePage}
                                                onChange={handlePageSet}
                                                onKeyDown={handleKeyDown}
                                            />
                                        </MarginWrapper>
                                    </Row>
                                </MarginWrapper>
                            </Row>
                        </Column>
                    )}
                </Section>
            )}
        </>
    );
};
