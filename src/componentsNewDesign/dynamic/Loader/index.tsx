import whiteLoader from 'assets/loader_white.gif';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import React, { FC } from 'react';

export interface LoaderProps {
    size?: 'small' | 'middle' | 'large';
    isWhite?: boolean;
}

export const Loader = ({ size = 'small' }: LoaderProps) => {
    const loaderSize = size === 'small' ? '15px' : size === 'middle' ? '30px' : '45px';
    return <CustomImg alt="Loader" height={loaderSize} src={whiteLoader} width={loaderSize} />;
};

interface TextLoaderProps extends LoaderProps {}

export const TextLoader: FC<TextLoaderProps> = ({ children, ...loaderProps }) => (
    <Column alignCenter>
        <MarginWrapper marginBottom="22px">
            <Loader {...loaderProps} />
        </MarginWrapper>
        <Span fontSize="16px" fontWeight="bold" lineHeight="19px">
            {children}
        </Span>
    </Column>
);
