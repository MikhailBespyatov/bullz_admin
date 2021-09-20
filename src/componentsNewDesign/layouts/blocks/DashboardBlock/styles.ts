import { black } from 'constants/styles/colors';
import { disableDefaultHStyleMixin, flexCenter } from 'constants/styles/mixins';
import { xxl_1 } from 'constants/styles/sizes';
import styled from 'styled-components';
import { Active } from 'types/global';
import { Color } from 'types/styles';
import { dashboardBorderColor, dashboardBorderRadius, dashboardCornerNumberDiameter } from './constants';

export const DashboardBlockGrid = styled.section`
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    @media (max-width: ${xxl_1}) {
        grid-template-columns: 1fr;
    }
`;

export const Wrapper = styled.div<Active>`
    position: relative;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    padding: 16px 35px;
    border-radius: ${dashboardBorderRadius};
    border: 1px solid ${({ active }) => (active ? dashboardBorderColor : 'transparent')};
    background: black;
`;

export const DashboardCornerNumber = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    ${flexCenter};
    width: ${dashboardCornerNumberDiameter};
    height: ${dashboardCornerNumberDiameter};
    border-top-left-radius: ${dashboardBorderRadius};
    background: ${dashboardBorderColor};
    color: white;
`;

export const DashboardBlockInnerGrid = styled.section`
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    margin-top: 19px;
`;

export const TotalTitle = styled.h3<Color>`
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    ${disableDefaultHStyleMixin};
    margin-bottom: 10px;
    color: ${({ color }) => color || black};
`;

export const TotalViewsTitle = styled(TotalTitle)`
    color: #3a89ff;
`;

export const TotalSubtitle = styled.h4`
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;
    letter-spacing: 0.04em;
    text-align: left;
    color: #999999;
    ${disableDefaultHStyleMixin};
`;

export const AddButtonBlockSection = styled.section`
    ${flexCenter};
    flex-direction: column;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

export const AddButtonText = styled.span`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0.04em;
    text-align: center;
    opacity: 0.5;
`;
