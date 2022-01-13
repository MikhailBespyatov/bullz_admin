import { useMediaQuery } from '@material-ui/core';
import calendarIcon from 'assets/calendar.svg';
import dataPickerIcon from 'assets/dataPicker.svg';
import { ArrowImg } from 'componentsNewDesign/common/imgComponents/ArrowImg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { expandButtonHeight } from 'componentsNewDesign/common/inputs/Select/constants';
import {
    DataPickerIconWrapper,
    DataPickerWrapper
} from 'componentsNewDesign/common/inputs/TrendingsDateRangePicker/styles';
import { ItemSpan, SelectWrapper, TitleSpan } from 'componentsNewDesign/common/inputs/TrendingsSelect/styles';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { xs } from 'constants/styles/sizes';
import { useToggle } from 'hooks/toggle';
import React, { useEffect, useMemo, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Disabled, OnDataRangeChange } from 'types/form';
import { getDateFromString } from 'utils/usefulFunctions';

interface DatePickerProps extends Disabled {
    date: [string, string];
    onChange: (date: string) => void;
    isStartType?: boolean;
    selectsRange?: boolean;
}

const DatePicker = ({ isStartType, date, onChange, disabled, selectsRange }: DatePickerProps) => {
    const [isCalendarOpened, updateIsCalendarOpened] = useToggle();

    const fromPropsStartDate = useMemo(() => (date[0] ? new Date(date[0]) : undefined), [date]);
    const fromPropsEndDate = useMemo(() => (date[1] ? new Date(date[1]) : undefined), [date]);

    const [startDateValue, setStartDateValue] = useState(fromPropsStartDate);
    const [endDateValue, setEndDateValue] = useState(fromPropsEndDate);

    const activeDate = isStartType
        ? startDateValue
            ? startDateValue.toISOString()
            : ''
        : endDateValue
        ? endDateValue.toISOString()
        : '';

    const onInputClick = () => updateIsCalendarOpened();
    const onClickOutside = () => updateIsCalendarOpened();

    const onChangeDate = (date: Date) => {
        isStartType ? setStartDateValue(date) : setEndDateValue(date);
        onChange(date.toISOString());
    };

    useEffect(() => {
        setStartDateValue(fromPropsStartDate);
        setEndDateValue(fromPropsEndDate);
    }, [fromPropsStartDate, fromPropsEndDate]);

    return (
        <ReactDatePicker
            customInput={
                <SelectWrapper>
                    <Column>
                        <TitleSpan>{isStartType ? 'From' : 'To'}</TitleSpan>
                        <Section alignCenter justifyBetween noWrap marginTop="4px">
                            <Row>
                                <MarginWrapper marginRight="8px">
                                    <CustomImg src={calendarIcon} width="16px" />
                                </MarginWrapper>
                                <ItemSpan>{getDateFromString(activeDate) || 'none'}</ItemSpan>
                            </Row>
                            {!disabled && (
                                <ClickableWrapper height={expandButtonHeight} width={expandButtonHeight}>
                                    <ArrowImg rotate={isCalendarOpened ? 180 : 0} />
                                </ClickableWrapper>
                            )}
                        </Section>
                    </Column>
                </SelectWrapper>
            }
            disabled={disabled}
            endDate={endDateValue}
            minDate={!isStartType ? startDateValue : undefined}
            open={!disabled && isCalendarOpened}
            popperModifiers={{ flip: { flipVariations: false, behavior: 'clockwise' } }}
            popperPlacement="bottom"
            selected={isStartType ? startDateValue : endDateValue}
            selectsEnd={!isStartType}
            selectsRange={selectsRange}
            selectsStart={isStartType}
            startDate={startDateValue}
            wrapperClassName="date_picker full-width"
            onChange={onChangeDate}
            onClickOutside={onClickOutside}
            onInputClick={onInputClick}
        />
    );
};

const DataPickerIcon = () => (
    <DataPickerIconWrapper>
        <Section alignCenter justifyCenter height="100%">
            <CustomImg src={dataPickerIcon} width="15px" />
        </Section>
    </DataPickerIconWrapper>
);

export interface DateRangePickerProps extends Disabled, OnDataRangeChange {
    dateRange: [string, string];
}

export const TrendingsDateRangePicker = ({ dateRange, onChange, disabled }: DateRangePickerProps) => {
    const [dateRangeValue, setDateRangeValue] = useState(dateRange);
    const isMobile = useMediaQuery(`(max-width: ${xs})`);

    useEffect(() => setDateRangeValue(dateRange), [dateRange]);

    const onChangeFrom = (date: string) => {
        setDateRangeValue([date, dateRangeValue[1]]);
        onChange([date, dateRangeValue[1]]);
    };

    const onChangeTo = (date: string) => {
        setDateRangeValue([dateRangeValue[0], date]);
        onChange([dateRangeValue[0], date]);
    };

    return !isMobile ? (
        <Section alignCenter noWrap>
            <DataPickerWrapper>
                <DatePicker isStartType date={dateRangeValue} disabled={disabled} onChange={onChangeFrom} />
            </DataPickerWrapper>
            {/* <Column> */}
            <DataPickerIcon />
            {/* </Column> */}
            <DataPickerWrapper>
                <DatePicker date={dateRangeValue} disabled={disabled} onChange={onChangeTo} />
            </DataPickerWrapper>
        </Section>
    ) : (
        <Section alignEnd justifyBetween noWrap>
            <DataPickerWrapper>
                <DatePicker isStartType date={dateRangeValue} disabled={disabled} onChange={onChangeFrom} />
            </DataPickerWrapper>
            {/* <Column> */}
            <DataPickerIcon />
            {/* </Column> */}
            <DataPickerWrapper>
                <DatePicker date={dateRangeValue} disabled={disabled} onChange={onChangeTo} />
            </DataPickerWrapper>
        </Section>
    );
};
