import { FlexGrow } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { ellipsisMixin } from 'constants/styles/mixins';
import { xs } from 'constants/styles/sizes';
import styled from 'styled-components';
import {
    BackgroundColor,
    BorderProperties,
    BorderRadius,
    Color,
    Padding,
    Sizes,
    TextAlignment,
    TextProperties
} from 'types/styles';

interface TableProps
    extends BackgroundColor,
        BorderRadius,
        BorderProperties,
        Sizes,
        Padding,
        Color,
        TextProperties,
        TextAlignment {
    center?: boolean;
}

export const EllipsisTableText = styled.span<TableProps>`
    text-align: ${({ alignTextCenter }) => (alignTextCenter && ' center') || 'start'};
    font-size: ${({ fontSize }) => fontSize || '12px'};
    ${({ color }) => color && `color: ${color}`};
    ${({ width }) => width && `width: ${width}`};
    ${ellipsisMixin};
`;

export const TableWrapper = styled.div<TableProps>`
    margin-top: 8px;
    width: 100%;
    padding: 19px 20px;
    ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
    ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
    ${({ border }) => border && `border: ${border}`};

    @media (max-width: ${xs}) {
        padding: 0;
    }
`;

export const Table = styled.table<TableProps>`
    border-collapse: collapse;
    width: 100%;
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    text-align: center;
`;
export const TableRow = styled.tr<TableProps>`
    width: 100%;
    height: 60px;
    padding: 24px 0px;
    ${({ borderTop }) => borderTop && `border-top: ${borderTop}`};
    ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
    ${({ color }) => color && `color: ${color}`};
    ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};

    text-align: center;

    @media (max-width: ${xs}) {
        height: 34px;
        th:first-child {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        th:last-child {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
`;

export const TableHeader = styled.th<TableProps>`
    text-align: center;
    font-size: 10px;
    ${({ width }) => width && `width: ${width}`};

    &:first-child {
        border-radius: 8px 0px 0px 0px;
    }
    &:last-child {
        border-radius: 0px 8px 0px 0px;
    }

    @media (max-width: ${xs}) {
        font-size: 10px;
    }
`;
export const TableData = styled.td<TableProps>`
    text-align: center;
    ${({ color }) => color && `color: ${color}`};
    ${({ padding }) => padding && `padding: ${padding}`};
    ${({ width }) => width && `width: ${width}`};
`;

export const DeleteButtonWrapper = styled(FlexGrow)`
    align-self: flex-start;
`;
