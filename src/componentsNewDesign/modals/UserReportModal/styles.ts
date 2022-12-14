import { bodyModalHeight, modalWidth } from 'componentsNewDesign/modals/UserReportModal/constants';
import { Column, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { modalVerticalPadding } from 'componentsNewDesign/wrappers/ModalWrapper/constant';
import { xs, xxs } from 'constants/styles/sizes';
import styled from 'styled-components';

export const ModalHeader = styled(Column)`
    position: absolute;
    // top: ${modalVerticalPadding};
    top: 10px;
    left: 0;
    width: ${modalWidth};

    @media screen and (max-width: ${xs}) {
        width: 100%;
    }
`;

export const SectionWithPadding = styled(Section)`
    padding: 0 ${modalVerticalPadding};

    @media screen and (max-width: ${xs}) {
        padding: 0 16px;
    }
`;

export const ReportBody = styled(Column)`
    height: ${bodyModalHeight};
    width: 100%;
    padding: 10px 0;
`;

export const Title = styled.span`
    font-size: 15px;
    line-height: 18px;
    font-style: normal;
    font-weight: 500;
`;

export const Subtitle = styled(Title)``;
export const Parameter = styled(Title)``;

export const Report = styled.pre`
    display: flex;
    flex-direction: column;
    height: 390px;
    overflow: auto;
    width: 100%;
    flex-wrap: nowrap;

    ${Subtitle} {
        // margin-left: 1em;
    }

    ${Parameter} {
        // margin-left: 2em;
    }

    @media screen and (max-width: ${xxs}) {
        height: 250px;
    }
`;
