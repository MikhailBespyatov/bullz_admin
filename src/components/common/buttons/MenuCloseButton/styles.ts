import { LogProps } from 'components/common/buttons/MenuCloseButton/types';
import { primaryColor, white } from 'constants/styles/colors';
import { borderMixin } from 'constants/styles/mixins';
import { transitionTime } from 'constants/styles/others';
import { borderRadius, CloseButtonDiameter, headerHeight, padding, sm, sm_1 } from 'constants/styles/sizes';
import styled from 'styled-components';

export const BtnHL = styled.div`
    z-index: 9;
    height: ${CloseButtonDiameter};
    width: calc(${CloseButtonDiameter} + 4px);
    position: fixed;
    top: calc(${padding} + ${headerHeight});
    right: calc(2 * ${padding});
    ${borderMixin};
    border-radius: ${borderRadius};
    background: ${white};
    @media (min-width: ${sm}) {
        display: none;
    }
    @media (max-width: ${sm_1}) {
        display: block;
    }
`;

export const Log = styled.div<LogProps>`
    height: 2px;
    width: 30px;
    display: block;
    margin: 5px auto;
    position: relative;
    background-color: ${primaryColor};
    border-radius: 5px;
    transition: ${transitionTime};

    ${({ isClosed }) =>
        isClosed
            ? ''
            : `
  &:nth-of-type(1) {
    transform: translateY(7px) rotate(45deg);
  };
  &:nth-of-type(2) {
    opacity: 0;
  }
  &:nth-of-type(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
  `}
`;

export const ContainerHL = styled.div`
    height: ${CloseButtonDiameter};
    width: ${CloseButtonDiameter};
    position: relative;
    margin: auto;
    padding-top: 4px;
    border: 3px solid transparent;
    -moz-border-radius: 100%;
    -webkit-border-radius: 100%;
    border-radius: 100%;
    -moz-transition: 0.3s;
    -o-transition: 0.3s;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    cursor: pointer;
`;
