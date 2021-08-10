import { flexStart } from 'constants/styles/mixins';
import { padding } from 'constants/styles/sizes';
import styled from 'styled-components';

export const SliderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: 0 ${padding};
    ${flexStart};
    flex-direction: row;
    flex-wrap: nowrap;
`;
