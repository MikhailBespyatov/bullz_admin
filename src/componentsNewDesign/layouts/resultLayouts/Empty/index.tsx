import { useMediaQuery } from '@material-ui/core';
import emptyLogo from 'assets/empty_logo.svg';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { xs } from 'constants/styles/sizes';
import React from 'react';
import { Title } from 'types/data';
import { SubtitleSpan, TitleSpan } from './styles';

interface ImageProps {
    imageHeight?: string;
    imageWidth?: string;
    imageSrc?: string;
    imageWrapperBorderRadius?: string;
    imageWrapperBackgroundColor?: string;
    imageWrapperHeight?: string;
    imageWrapperWidth?: string;
    emptyLayoutMarginTop?: string;
    titleWidth?: string;
    titleFontSize?: string;
    titleFontWeight?: string;
    titleLineHeight?: string;
}

export interface EmptyProps extends Title, ImageProps {}

export const Empty = ({
    title,
    titleWidth,
    titleFontSize,
    titleFontWeight,
    titleLineHeight,
    subtitle,
    imageHeight = '347px',
    imageSrc = emptyLogo,
    imageWidth = '495px',
    imageWrapperBorderRadius,
    imageWrapperBackgroundColor,
    imageWrapperHeight,
    imageWrapperWidth,
    emptyLayoutMarginTop
}: EmptyProps) => {
    const isMobile = useMediaQuery(`(max-width: ${xs})`);

    return (
        <Column alignCenter={!isMobile} marginTop={emptyLayoutMarginTop || '20px'} width="100%">
            <ContentWrapper
                backgroundColor={imageWrapperBackgroundColor || 'transparent'}
                borderRadius={imageWrapperBorderRadius || '0px'}
                height={imageWrapperHeight || 'fit-content'}
                minWidth="fit-content"
                width={isMobile ? '100%' : imageWrapperWidth || 'fit-content'}
            >
                <Section alignCenter justifyCenter height="100%">
                    <CustomImg height={imageHeight} src={imageSrc} width={isMobile ? '200px' : imageWidth} />
                </Section>
            </ContentWrapper>

            <Row
                justifyCenter={isMobile}
                marginBottom="23px"
                marginTop="37px"
                width={isMobile ? '100%' : titleWidth || 'fit-content'}
            >
                <TitleSpan fontSize={titleFontSize} fontWeight={titleFontWeight} lineHeight={titleLineHeight}>
                    {title}
                </TitleSpan>
            </Row>
            <Row justifyCenter width="430px">
                <SubtitleSpan>{subtitle}</SubtitleSpan>
            </Row>
        </Column>
    );
};
//     <Row justifyCenter marginBottom="23px" marginTop="37px" width={titleWidth || 'fit-content'}>
//         <TitleSpan fontSize={titleFontSize} fontWeight={titleFontWeight} lineHeight={titleLineHeight}>
//             {title}
//         </TitleSpan>
//     </Row>
//     <Row justifyCenter width="430px">
//         <SubtitleSpan>{subtitle}</SubtitleSpan>
//     </Row>
// </Column>
