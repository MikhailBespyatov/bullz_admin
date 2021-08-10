import { Title } from 'components/common/typography/titles/Title';
import React, { FC } from 'react';
import { Title as TitleProps } from 'types/data';

interface Props extends TitleProps {}

export const InfoTitle: FC<Props> = ({ title = 'title', children }) => (
    <>
        <Title>{title}</Title>
        {children}
    </>
);
