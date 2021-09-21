import { grey23 } from 'constants/styles/colors';
import { filterMargin } from 'constants/styles/sizes';
import styled from 'styled-components';
import { singleLayoutPaddingTop } from './constants';

export const SingleMainWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding-left: ${filterMargin};
    padding-top: ${singleLayoutPaddingTop};
    padding-bottom: 30px;
    background-color: ${grey23};
`;
