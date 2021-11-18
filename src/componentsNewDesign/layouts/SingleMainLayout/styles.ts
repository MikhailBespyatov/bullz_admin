import { grey30 } from 'constants/styles/colors';
import { filterMargin, filterMarginMobile, xs, xxs } from 'constants/styles/sizes';
import styled from 'styled-components';
import { singleLayoutPaddingTop } from './constants';

export const SingleMainWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding-left: ${filterMargin};
    padding-right: ${filterMargin};
    padding-top: ${singleLayoutPaddingTop};
    padding-bottom: 30px;
    background-color: ${grey30};
    border-radius: 32px;

    @media (max-width: ${xs}) {
        border-radius: 0;
        padding: 14px 8px;
    }

    @media (max-width: ${xxs}) {
        border-radius: 0;
        padding-left: ${filterMarginMobile};
        padding-right: ${filterMarginMobile};
        padding-top: 14px;
        padding-bottom: 30px;
    }
`;
