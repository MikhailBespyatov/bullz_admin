import selectIcon from 'assets/select_icon.svg';
import { CopyButton } from 'componentsNewDesign/common/buttons/CopyButton';
import { TrustedIcon } from 'componentsNewDesign/common/icons/TrustedIcon';
import { ArrowImg } from 'componentsNewDesign/common/imgComponents/ArrowImg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { selectorVerticalPadding } from 'componentsNewDesign/common/inputs/Select/constants';
import { SelectSearchInput } from 'componentsNewDesign/common/inputs/SelectSearchInput';
import { NotificationBadge } from 'componentsNewDesign/common/typography/NotificationBadge';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { OpacityActiveEffect } from 'componentsNewDesign/dynamic/effects';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { defaultMongoDBId, utcDefaultDate } from 'constants/defaults/formats';
import { noop } from 'constants/functions';
import { blue, errorColor, grey4, white } from 'constants/styles/colors';
import { useCloseClick } from 'hooks/closeClick';
import { useRefWidthAndHeight } from 'hooks/getRefProperty';
import { useModal } from 'hooks/modal';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Success, Title } from 'types/data';
import { Disabled } from 'types/form';
import { BackgroundColor, HorizontalPadding, MarginRightBottom, MinSizes, Sizes } from 'types/styles';
import { PropertyBlockType } from 'types/types';
import { formatDateISOString, getTimeFromString } from 'utils/usefulFunctions';
import {
    BlockSubTitle,
    BlockTitle,
    BlockWrapper,
    EllipsisRow,
    InteractionButton,
    ItemsAbsoluteWrapper,
    ItemSpan,
    ItemWrapper,
    SelectableItemWrapper,
    StyledLink
} from './styles';

export interface DateContentProps extends Sizes {
    children?: string;
}

export const DateContent = ({ children }: DateContentProps) =>
    children && children !== utcDefaultDate ? (
        <Row alignCenter>
            <MarginWrapper marginRight="10px">
                {/* <BlockSubTitle>{getDateFromString(children)}</BlockSubTitle> */}
                <BlockSubTitle>{formatDateISOString(children)}</BlockSubTitle>
            </MarginWrapper>
            <Row>
                <BlockSubTitle color={grey4}>{getTimeFromString(children)}</BlockSubTitle>
            </Row>
        </Row>
    ) : (
        <Row alignCenter>
            <BlockSubTitle color={grey4}>Unknown</BlockSubTitle>
        </Row>
    );

export interface SubtitleLinkProps extends Disabled {
    id?: string;
    linkRoute?: string;
}

export const SubtitleIdLink: FC<SubtitleLinkProps> = ({ id, linkRoute, children }) => {
    const disabled = id === defaultMongoDBId || !id;

    return linkRoute && !disabled ? (
        <StyledLink to={linkRoute + '/' + id}>{children}</StyledLink>
    ) : (
        <EllipsisRow alignCenter> {children} </EllipsisRow>
    );
};

export interface PropertyBlockProps
    extends Title,
        Partial<Success>,
        Sizes,
        MinSizes,
        BackgroundColor,
        MarginRightBottom,
        HorizontalPadding,
        Pick<YEAY.GetUserProfileResponse, 'isTrusted'> {
    type?: PropertyBlockType;
    notVerified?: boolean;
    copiable?: boolean;
    linkRoute?: string;
    isDate?: boolean;
    //titleUppercase?: boolean;
    backgroundColor?: string;
    customCopyIcon?: string;
    isLink?: boolean;
}

export const PropertyBlock = ({
    title,
    subtitle,
    isDate,
    success = '',
    notVerified,
    copiable,
    linkRoute,
    customCopyIcon,
    //titleUppercase,
    isTrusted,
    backgroundColor,
    isLink,
    ...props
}: PropertyBlockProps) => (
    <BlockWrapper backgroundColor={backgroundColor} {...props}>
        <Column justifyBetween height="100%">
            <Section justifyBetween noWrap marginBottom="8px">
                <BlockTitle /*uppercase={titleUppercase}*/>{title}</BlockTitle>

                <Row noWrap>
                    {notVerified && (
                        <MarginWrapper marginRight="5px">
                            <NotificationBadge>Not verified</NotificationBadge>
                        </MarginWrapper>
                    )}

                    {copiable && (
                        <CopyButton customCopyIcon={customCopyIcon || undefined} subject={subtitle} success={success} />
                    )}
                    {/* <MarginWrapper marginLeft="10px">
                        {linkRoute && subtitle && <LinkButton id={subtitle} linkRoute={linkRoute} />}
                    </MarginWrapper> */}
                </Row>
            </Section>

            <Section>
                {isDate ? (
                    <DateContent>{subtitle}</DateContent>
                ) : isLink ? (
                    <BlockSubTitle color={white}>
                        <a href={subtitle} target="blank">
                            {subtitle}
                        </a>
                    </BlockSubTitle>
                ) : (
                    <SubtitleIdLink id={subtitle} linkRoute={linkRoute}>
                        <BlockSubTitle color={white}>
                            {subtitle !== defaultMongoDBId ? subtitle : 'Empty'}
                        </BlockSubTitle>
                        {isTrusted && (
                            <MarginWrapper marginLeft="8px">
                                <TrustedIcon diameter="15px" />
                            </MarginWrapper>
                        )}
                    </SubtitleIdLink>
                )}
            </Section>
        </Column>
    </BlockWrapper>
);

interface ChangeablePropertyBlockProps extends Title, Sizes, Disabled, BackgroundColor {
    selector?: string[];
    searchPlaceholder?: string;
    backgroundColor?: string;
    onSave?: (value: string) => void;
}

export const ChangeablePropertyBlock = ({
    subtitle,
    title,
    selector = [],
    onSave = noop,
    searchPlaceholder = '',
    disabled,
    backgroundColor,
    ...props
}: ChangeablePropertyBlockProps) => {
    const [isChangeMode, setIsChangeMode] = useState(false);
    const { visible, close, open } = useModal();
    const selectRef = useRef<HTMLDivElement>(null);
    const componentRef = useRef<HTMLDivElement>(null);
    const [, selectHeight] = useRefWidthAndHeight(selectRef);
    const top = selectHeight + parseInt(selectorVerticalPadding) + parseInt(selectorVerticalPadding) + 'px';
    const [filteredSelector, setFilteredSelector] = useState(selector);
    const [newValue, setNewValue] = useState('');
    const [searchInputValue, setSearchInputValue] = useState('');

    const onSearchChange = (value: string) => {
        setSearchInputValue(value);

        const filteredData = selector.filter(
            item =>
                item.toLocaleUpperCase().toLocaleLowerCase().indexOf(value.toLocaleUpperCase().toLocaleLowerCase()) !==
                -1
        );
        setFilteredSelector(filteredData);
    };

    const toggleChangeMode = () => setIsChangeMode(state => !state);

    const onChangeMode = () => {
        if (isChangeMode) {
            setNewValue('');
        }
        toggleChangeMode();
        close();
    };

    const onSaveClick = () => {
        onSave(newValue);
        close();
        onSearchChange('');
    };

    const onCloseClick = () => {
        close();
        onSearchChange('');
    };

    const toggleVisible = () => (visible ? onCloseClick() : open());

    const onSetClick = (value: string) => {
        setNewValue(value);
        onSearchChange('');
        toggleVisible();
    };

    const onSaveSearchValue = (value: string) => {
        setNewValue(value);
        onSearchChange('');
        toggleVisible();
    };

    useEffect(() => {
        setNewValue('');
        setIsChangeMode(false);
        close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subtitle]);

    useCloseClick(componentRef, onCloseClick, visible);

    return (
        <BlockWrapper backgroundColor={backgroundColor} {...props} ref={componentRef}>
            <Column ref={selectRef} justifyBetween height="100%">
                <Section justifyBetween noWrap height="22px" marginBottom="8px">
                    <BlockTitle>{title}</BlockTitle>

                    {!disabled && (
                        <Row noWrap>
                            {newValue && (
                                <MarginWrapper marginRight="10px">
                                    <InteractionButton onClick={onSaveClick}>
                                        <Span color={blue} fontSize="10px" fontWeight="500" lineHeight="12px">
                                            Save
                                        </Span>
                                    </InteractionButton>
                                </MarginWrapper>
                            )}
                            <InteractionButton onClick={onChangeMode}>
                                <Span
                                    color={isChangeMode ? errorColor : blue}
                                    fontSize="10px"
                                    fontWeight="500"
                                    lineHeight="12px"
                                >
                                    {isChangeMode ? 'Cancel' : 'Change'}
                                </Span>
                            </InteractionButton>
                        </Row>
                    )}
                </Section>

                <SelectableItemWrapper
                    alignCenter
                    justifyBetween
                    pointer={isChangeMode}
                    onClick={isChangeMode ? toggleVisible : undefined}
                >
                    <BlockSubTitle color={subtitle === defaultMongoDBId ? grey4 : white}>
                        {newValue || subtitle || 'Empty'}
                    </BlockSubTitle>
                    {isChangeMode && <ArrowImg rotate={visible ? 180 : 0} />}
                </SelectableItemWrapper>
            </Column>

            <ItemsAbsoluteWrapper top={top} visible={visible}>
                <Column>
                    <SelectSearchInput
                        placeholder={searchPlaceholder}
                        startSearch={onSaveSearchValue}
                        value={searchInputValue}
                        width="97%"
                        onChange={onSearchChange}
                    />

                    {filteredSelector.map(item => {
                        const isActive = item === (newValue || subtitle);

                        return (
                            <ItemWrapper key={item} active={isActive} onClick={() => onSetClick(item)}>
                                <ItemSpan>{item}</ItemSpan>
                                <OpacityActiveEffect active={isActive} opacity={0}>
                                    <CustomImg alt="Select Icon" height="12px" src={selectIcon} width="13px" />
                                </OpacityActiveEffect>
                            </ItemWrapper>
                        );
                    })}
                </Column>
            </ItemsAbsoluteWrapper>
        </BlockWrapper>
    );
};

// export const PropertyBlock = ({
//     title,
//     subtitle,
//     type = 'id',
//     success = '',
//     notVerified,
//     copiable,
//     uppercase,
//     ...props
// }: PropertyBlockProps) => (
//     <PropertyBlockWrapper {...props}>
//         <Column justifyBetween height="100%" noWrap="unset">
//             <PropertyContentWrapper justifyBetween>
//                 <PropertyContent color={titleColor} fontSize={titleFontSize} uppercase={uppercase}>
//                     {title}
//                 </PropertyContent>

//                 {!notVerified && copiable && <CopyButton subject={subtitle} success={success} />}
//                 {notVerified && <NotificationBadge>Not verified</NotificationBadge>}
//             </PropertyContentWrapper>

//             <PropertyContentWrapper justifyBetween>
//                 {type === 'date' ? (
//                     subtitle && subtitle !== utcDefaultDate && <DateContent>{subtitle}</DateContent>
//                 ) : (
//                     <PropertyContent color={subTitleColor} fontSize={subtitleFontSize}>
//                         {subtitle !== defaultMongoDBId && subtitle}
//                     </PropertyContent>
//                 )}
//             </PropertyContentWrapper>
//         </Column>
//     </PropertyBlockWrapper>
// );
