import { Subtitle, Title, Wrapper } from 'componentsNewDesign/layouts/blocks/GraphicInfoBlock/styles';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { white } from 'constants/styles/colors';
import React from 'react';
import { ReactClick } from 'types/react';
import { Background } from 'types/styles';

interface GraphicInfoBlockProps extends Background, ReactClick<HTMLDivElement> {
    title: string;
    icon?: JSX.Element | null;
    subtitle?: string;
    isSelected: boolean;
}

export const GraphicInfoBlock = ({ title, subtitle, background, icon, onClick }: GraphicInfoBlockProps) => (
    <Wrapper background={background} onClick={onClick}>
        {icon ? (
            <Row alignCenter>
                <MarginWrapper marginRight="9px">{icon}</MarginWrapper>
                <Title color={white}>{title}</Title>
            </Row>
        ) : (
            <Title color={white}>{title}</Title>
        )}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
);
