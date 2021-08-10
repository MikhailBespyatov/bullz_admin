import calendarIcon from 'assets/calendar.svg';
import dataPickerIcon from 'assets/dataPicker.svg';
import { ArrowImg } from 'componentsNewDesign/common/imgComponents/ArrowImg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { DataPickerIconWrapper, DataPickerWrapper } from 'componentsNewDesign/common/inputs/DateRangePicker/styles';
import { expandButtonHeight } from 'componentsNewDesign/common/inputs/Select/constants';
import { ItemSpan, SelectWrapper, TitleSpan } from 'componentsNewDesign/common/inputs/Select/styles';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { useToggle } from 'hooks/toggle';
import React, { useEffect, useMemo, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDateFromString } from 'utils/usefulFunctions';
import { Disabled, OnDataRangeChange } from 'types/form';
import { noop } from 'constants/functions';
import moment from 'moment';

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

export const DateRangePicker = ({ dateRange, onChange, disabled }: DateRangePickerProps) => {
    const [dateRangeValue, setDateRangeValue] = useState(dateRange);

    useEffect(() => setDateRangeValue(dateRange), [dateRange]);

    const onChangeFrom = (date: string) => {
        setDateRangeValue([date, dateRangeValue[1]]);
        onChange([date, dateRangeValue[1]]);
    };

    const onChangeTo = (date: string) => {
        setDateRangeValue([dateRangeValue[0], date]);
        onChange([dateRangeValue[0], date]);
    };

    return (
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
    );
};

/*TODO: Refactor code*/
export const UnionDateRangePicker = ({ dateRange, onChange, disabled }: DateRangePickerProps) => {
    const fromPropsStartDate = useMemo(() => (dateRange[0] ? new Date(dateRange[0]) : undefined), [dateRange]);
    const fromPropsEndDate = useMemo(() => (dateRange[1] ? new Date(dateRange[1]) : undefined), [dateRange]);

    const [startDate, setStartDate] = useState(fromPropsStartDate);
    const [endDate, setEndDate] = useState(fromPropsEndDate);

    const [isLeftCalendarOpened, setIsLeftCalendarOpened] = useState(false);
    const [isRightCalendarOpened, setRightIsCalendarOpened] = useState(false);

    const onDataPickerChange = (date: Date) => {
        if (isLeftCalendarOpened) {
            if (moment(date).isAfter(endDate)) {
                setEndDate(undefined);
            }
            setStartDate(date);
        } else setEndDate(date);
    };

    const closeCalendar = () => {
        isLeftCalendarOpened && setIsLeftCalendarOpened(false);
        isRightCalendarOpened && setRightIsCalendarOpened(false);
        endDate && startDate && onChange([startDate.toISOString(), endDate.toISOString()]);
    };

    const onClickOutside = () => closeCalendar();
    const onRightClickOutside = () => closeCalendar();

    const onLeftOpenClick = () => (isLeftCalendarOpened ? closeCalendar() : setIsLeftCalendarOpened(true));
    const onRightOpenClick = () => (isRightCalendarOpened ? closeCalendar() : setRightIsCalendarOpened(true));

    const isValidToDate = (currentDate: Date) => moment(currentDate).isAfter(startDate);

    useEffect(() => {
        setStartDate(fromPropsStartDate);
        setEndDate(fromPropsEndDate);
    }, [fromPropsStartDate, fromPropsEndDate]);

    return (
        <Section alignCenter noWrap>
            <DataPickerWrapper>
                <ReactDatePicker
                    // selectsRange
                    customInput={
                        <SelectWrapper>
                            <Column onClick={disabled ? noop : onLeftOpenClick}>
                                <TitleSpan>From</TitleSpan>
                                <Section alignCenter justifyBetween noWrap marginTop="4px">
                                    <Row>
                                        <MarginWrapper marginRight="8px">
                                            <CustomImg src={calendarIcon} width="16px" />
                                        </MarginWrapper>
                                        <ItemSpan>
                                            {startDate ? getDateFromString(startDate.toISOString()) : 'none'}
                                        </ItemSpan>
                                    </Row>
                                    {!disabled && (
                                        <ClickableWrapper height={expandButtonHeight} width={expandButtonHeight}>
                                            <ArrowImg rotate={isLeftCalendarOpened ? 180 : 0} />
                                        </ClickableWrapper>
                                    )}
                                </Section>
                            </Column>
                        </SelectWrapper>
                    }
                    endDate={endDate}
                    open={isLeftCalendarOpened}
                    openToDate={startDate}
                    selected={startDate}
                    startDate={startDate}
                    wrapperClassName="date_picker full-width"
                    onChange={onDataPickerChange}
                    onClickOutside={onClickOutside}
                />
            </DataPickerWrapper>
            <DataPickerIcon />
            <DataPickerWrapper>
                <ReactDatePicker
                    // selectsRange
                    customInput={
                        <SelectWrapper>
                            <Column onClick={disabled ? noop : onRightOpenClick}>
                                <TitleSpan>To</TitleSpan>
                                <Section alignCenter justifyBetween noWrap marginTop="4px">
                                    <Row>
                                        <MarginWrapper marginRight="8px">
                                            <CustomImg src={calendarIcon} width="16px" />
                                        </MarginWrapper>
                                        <ItemSpan>
                                            {endDate ? getDateFromString(endDate.toISOString()) : 'none'}
                                        </ItemSpan>
                                    </Row>
                                    {!disabled && (
                                        <ClickableWrapper height={expandButtonHeight} width={expandButtonHeight}>
                                            <ArrowImg rotate={isRightCalendarOpened ? 180 : 0} />
                                        </ClickableWrapper>
                                    )}
                                </Section>
                            </Column>
                        </SelectWrapper>
                    }
                    endDate={endDate}
                    filterDate={isValidToDate}
                    open={isRightCalendarOpened}
                    openToDate={endDate || startDate}
                    selected={startDate}
                    startDate={startDate}
                    wrapperClassName="date_picker full-width"
                    onChange={onDataPickerChange}
                    onClickOutside={onRightClickOutside}
                />
            </DataPickerWrapper>
        </Section>
    );
};
