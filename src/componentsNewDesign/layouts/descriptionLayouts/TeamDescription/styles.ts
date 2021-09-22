import { Span } from 'componentsNewDesign/common/typography/Span';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { white } from 'constants/styles/colors';
import styled from 'styled-components';

export const TeamPropertyWrapper = styled(Section)`
    margin-right: 8px;
    margin-bottom: 16px;
    justify-content: space-between;
`;

export const SubtitleBlock = styled(Span)`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: ${({ color }) => color || white};
`;
