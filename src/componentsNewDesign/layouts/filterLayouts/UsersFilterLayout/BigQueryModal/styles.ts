import { black, white } from 'constants/styles/colors';
import styled from 'styled-components';

export const BigQueryTitle = styled.span`
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    color: ${white};
`;

export const BigQueryDescription = styled.span`
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;

    color: ${white};

    opacity: 0.7;
`;
export const ImageWrapper = styled.div`
    margin-left: 8px;
    position: relative;

    &:after {
        content: 'Count is calculated without filtering by blocked and deleted users';

        position: absolute;
        top: 24px;
        left: -16px;

        display: none;

        width: 197px;
        height: 44px;

        padding: 9px 10px;
        background: ${white};
        box-shadow: 0px 12px 36px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        box-sizing: border-box;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        line-height: 13px;
        color: ${black};
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -8px;

        display: none;

        border: 15px solid transparent;
        border-bottom: 15px solid ${white};
    }

    &:hover:before,
    &:hover:after {
        display: block;
        cursor: help;
    }
`;
