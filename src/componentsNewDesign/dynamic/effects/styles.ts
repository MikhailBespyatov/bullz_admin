import styled from 'styled-components';
import { Active } from 'types/global';
import { Opacity } from 'types/styles';

interface OpacityActiveEffectProps extends Active, Opacity {}

export const OpacityActiveEffect = styled.div<OpacityActiveEffectProps>`
    opacity: ${({ active, opacity }) => (active ? '1' : opacity !== undefined ? opacity : '0.4')};
`;

export const CardHoverOpacityEffect = styled.div`
    opacity: 0;
`;
