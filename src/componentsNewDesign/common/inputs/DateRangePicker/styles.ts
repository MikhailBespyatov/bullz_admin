import arrow from 'assets/black_left_arrow.svg';
import { dataPickerIconDiameter } from 'componentsNewDesign/common/inputs/DateRangePicker/constants';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { xs } from 'constants/styles/sizes';
import styled, { css } from 'styled-components';

export const DataPickerStyles = css`
    .date_picker.full-width {
        width: 100%;
    }
    div > .react-datepicker {
        border: 0;
        border-radius: 0 0 8px 8px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        box-shadow: 0 9px 12px rgb(0 0 0 / 24%);
    }
    .react-datepicker > .react-datepicker__triangle {
        visibility: hidden;
    }
    .react-datepicker__tab-loop > .react-datepicker-popper {
        margin: 0;
    }
    .react-datepicker-popper {
        z-index: 30;
    }
    .react-datepicker__month-container > .react-datepicker__header {
        background-color: white;
        border: 0;
    }
    .react-datepicker__header > .react-datepicker__current-month {
        padding: 25px 0;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 15px;
    }
    .react-datepicker__week > .react-datepicker__day,
    .react-datepicker__day-names > .react-datepicker__day-name {
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 27px;
        height: 27px;
        align-items: center;
    }
    .react-datepicker__month-container > .react-datepicker__month {
        margin: 0;
    }
    .react-datepicker__month-container {
        padding: 0 17px 14px 17px;
    }
    .react-datepicker__day--selected,
    .react-datepicker__day:hover,
    .react-datepicker__day--keyboard-selected,
    .react-datepicker__day--in-range {
        border-radius: 50%;
        background-color: black;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.17);
        outline: none;
        color: white;
    }
    .react-datepicker__navigation--previous,
    .react-datepicker__navigation--next,
    .react-datepicker__navigation--previous:hover,
    .react-datepicker__navigation--next:hover {
        top: 32px;
        background: url(${arrow}) no-repeat;
        background-position: center;
        background-size: cover;
        border-right-color: transparent;
        border-left-color: transparent;
        outline: none;
        height: 21px;
        width: 21px;
    }
    .react-datepicker__navigation--next,
    .react-datepicker__navigation--next:hover {
        transform: rotate(180deg);
    }
    .react-datepicker__day--outside-month {
        color: #c4c4c4;
    }
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__month-text--in-selecting-range,
    .react-datepicker__quarter-text--in-selecting-range,
    .react-datepicker__year-text--in-selecting-range {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
    }
`;

export const DataPickerWrapper = styled(Row)`
    width: fit-content;

    @media (min-width: 1100px) {
        width: 170px;
    }
    @media (min-width: 1180px) {
        width: 200px;
    }

    @media (min-width: 1300px) {
        width: 240px;
    }

    @media (min-width: 1340px) {
        width: 260px;
    }

    @media (max-width: ${xs}) {
        width: 100%;
    }
`;
export const DataPickerIconWrapper = styled(ContentWrapper)`
    background-color: 'transparent';
    border-radius: '50%';
    min-width: 30px;
    margin: 0 5px;
    height: 37px;

    @media (min-width: 1270px) {
        min-width: ${dataPickerIconDiameter};
    }
`;
