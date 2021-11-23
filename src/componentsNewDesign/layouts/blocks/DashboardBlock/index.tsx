import { ClearInputButton } from 'componentsNewDesign/common/buttons/ClearInputButton';
import { graphicBlocks } from 'componentsNewDesign/common/graphicComponents/DashboardGraphic/constants';
import { AddIcon } from 'componentsNewDesign/common/icons/AddIcon';
import { DateRangePicker, UnionDateRangePicker } from 'componentsNewDesign/common/inputs/DateRangePicker';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { absoluteTopPosition, addButtonImgDiameter } from 'componentsNewDesign/layouts/blocks/DashboardBlock/constants';
import { formatEngagementStatisticsValues } from 'componentsNewDesign/layouts/cards/VideoCard/constants';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { noop } from 'constants/functions';
import { white } from 'constants/styles/colors';
import React, { MouseEvent } from 'react';
import { Loading, Title } from 'types/data';
import { Disabled, OnDataRangeChange } from 'types/form';
import { Active } from 'types/global';
import { ReactClick } from 'types/react';
import { Color } from 'types/styles';
import { getDateFromString } from 'utils/usefulFunctions';
import {
    AddButtonBlockSection,
    AddButtonText,
    DashboardBlockInnerGrid,
    DashboardCornerNumber,
    TotalSubtitle,
    TotalTitle,
    Wrapper
} from './styles';

interface DashboardColumnProps extends Pick<Title, 'title'>, Color {
    subtitle: number;
}

const DashboardColumn = ({ title, subtitle, color }: DashboardColumnProps) => (
    <Column>
        <TotalTitle color={color}>{formatEngagementStatisticsValues(subtitle)}</TotalTitle>
        <TotalSubtitle>{title}</TotalSubtitle>
    </Column>
);

interface DashboardBlockProps extends BULLZ.MarketingStatisticsResponse, Disabled, OnDataRangeChange, Active {
    dateFrom: string;
    dateTo: string;
    isDependency?: boolean;
    order: number;
    onRemove?: (e: MouseEvent) => void;
    activeIndexStatistic?: number;
}

export const DashboardBlock = ({
    dateFrom,
    dateTo,
    // isDependency,
    onRemove,
    order,
    commentCount = 0,
    rejectedVideoCount = 0,
    shareCount = 0,
    videoCount = 0,
    viewCount = 0,
    unProcessedVideoCount = 0,
    phoneVerifiedUserCount = 0,
    notVerifiedUserCount = 0,
    disabled,
    onChange,
    activeIndexStatistic,
    active
}: DashboardBlockProps) => {
    const activityStatisticsValue = [
        { subtitle: phoneVerifiedUserCount, title: 'Phone Number' },
        { subtitle: notVerifiedUserCount, title: 'Users count' },
        { subtitle: videoCount, title: 'Total Videos Verified Email' },
        { subtitle: rejectedVideoCount, title: 'Total Videos Rejected' },
        { subtitle: unProcessedVideoCount, title: 'Upload Errors' },
        { subtitle: commentCount, title: 'Total Comments' },
        { subtitle: viewCount, title: 'Total Views' },
        { subtitle: shareCount, title: 'Total Share' }
    ];

    return (
        <Wrapper active={active}>
            <DashboardCornerNumber>#{order}</DashboardCornerNumber>
            {onRemove && (
                <AbsoluteWrapper right={absoluteTopPosition} top={absoluteTopPosition}>
                    <ClearInputButton onClick={onRemove} />
                </AbsoluteWrapper>
            )}
            {/*<DateRangePicker dateRange={[dateFrom, dateTo]} disabled={disabled} onChange={onChange} />*/}
            <UnionDateRangePicker dateRange={[dateFrom, dateTo]} disabled={disabled} onChange={onChange} />
            <DashboardBlockInnerGrid>
                {activityStatisticsValue.map(({ subtitle, title }, i) => (
                    <DashboardColumn
                        key={title}
                        color={
                            i === activeIndexStatistic
                                ? graphicBlocks[activeIndexStatistic].selectedBackgroundColor
                                : white
                        }
                        subtitle={subtitle}
                        title={title}
                    />
                ))}
            </DashboardBlockInnerGrid>
        </Wrapper>
    );
};

interface DashboardAddButtonBlockProps
    extends Omit<DashboardBlockProps, 'isDependency' | 'onRemove' | 'onChange' | 'activeIndexStatistic' | 'active'>,
        ReactClick<HTMLDivElement>,
        Loading {}

export const DashboardAddButtonBlock = ({
    dateFrom,
    dateTo,
    order,
    onClick,
    loading
}: DashboardAddButtonBlockProps) => (
    <Wrapper>
        <DashboardCornerNumber>#{order}</DashboardCornerNumber>
        <DateRangePicker disabled dateRange={[dateFrom, dateTo]} onChange={noop} />
        {loading ? (
            <Section alignCenter justifyCenter height="100%">
                <Loader size="large" />
            </Section>
        ) : (
            <AddButtonBlockSection onClick={onClick}>
                <MarginWrapper marginBottom="8px">
                    <AddIcon height={addButtonImgDiameter} width={addButtonImgDiameter} />
                </MarginWrapper>
                <AddButtonText>{`Add from ${getDateFromString(dateFrom)} to ${getDateFromString(
                    dateTo
                )} to compare`}</AddButtonText>
            </AddButtonBlockSection>
        )}
    </Wrapper>
);
