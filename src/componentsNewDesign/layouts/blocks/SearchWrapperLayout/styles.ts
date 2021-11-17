import { Section } from 'components/grid/Section';
import { headerWidth, headerWidthMobile } from 'componentsNewDesign/grid/Header/constants';
import styled from 'styled-components';

export const SearchWrapperLayout = styled(Section)`
    padding-right: ${headerWidth};

    @media (max-width: 320px) {
        padding-right: ${headerWidthMobile};
        padding-left: ${headerWidthMobile};
        margin-top: 8px;
        margin-bottom: 0;
    }
`;
