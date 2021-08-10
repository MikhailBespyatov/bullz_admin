import { ArrowUpOutlined } from '@ant-design/icons';
import { ScrollerIconFont } from 'components/common/dynamic/TopScroller/constants';
import { Wrapper } from 'components/common/dynamic/TopScroller/styles';
import { primaryColor } from 'constants/styles/colors';
import React, { useEffect, useRef, useState } from 'react';

export const TopScroller = () => {
    const scroller = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(false);

    const onTopScrollHandler = () =>
        window.scrollTo({
            top: 0,
            left: 0
        });

    useEffect(() => {
        const scrollEventListener = () => {
            if (window.pageYOffset === 0) setShow(false);
            else setShow(true);
        };

        window.addEventListener('scroll', scrollEventListener);
        return () => {
            window.removeEventListener('scroll', scrollEventListener);
        };
    }, []);

    return (
        <Wrapper ref={scroller} show={show} onClick={onTopScrollHandler}>
            <ArrowUpOutlined style={{ fontSize: ScrollerIconFont, color: primaryColor }} />
        </Wrapper>
    );
};
