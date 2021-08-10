import { Subtitle, Title, Wrapper } from 'componentsNewDesign/layouts/blocks/GraphicInfoBlock/styles';
import React from 'react';
import { Background } from 'types/styles';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { ReactClick } from 'types/react';
import { black, white } from 'constants/styles/colors';

interface GraphicInfoBlockProps extends Background, ReactClick<HTMLDivElement> {
    title: string;
    icon?: JSX.Element | null;
    subtitle?: string;
    isSelected: boolean;
}

export const GraphicInfoBlock = ({ title, subtitle, background, icon, onClick, isSelected }: GraphicInfoBlockProps) => {
    const textColor = isSelected ? white : black;
    return (
        <Wrapper background={background} onClick={onClick}>
            {icon ? (
                <Row alignCenter>
                    <MarginWrapper marginRight="9px">{icon}</MarginWrapper>
                    <Title color={textColor}>{title}</Title>
                </Row>
            ) : (
                <Title color={textColor}>{title}</Title>
            )}
            {subtitle && <Subtitle color={textColor}>{subtitle}</Subtitle>}
        </Wrapper>
    );
};
