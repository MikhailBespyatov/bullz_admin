import { StyledLink, StyledLinkProps } from 'componentsNewDesign/common/links/ExternalLink/styles';
import React, { FC } from 'react';

interface Props extends StyledLinkProps {
    href: string;
}

export const ExternalLink: FC<Props> = ({ href, children = href }) => (
    <StyledLink href={href} target="_blank">
        {children}
    </StyledLink>
);
