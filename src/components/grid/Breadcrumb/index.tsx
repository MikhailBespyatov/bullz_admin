import { Breadcrumb as AntBreadcrumb } from 'antd';
import { Section } from 'components/grid/Section';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumb = () => {
    const location = useLocation();
    const locationsArray: string[] = location.pathname.split('/');

    return (
        <Section justifyBetween removeMarginRight>
            <AntBreadcrumb>
                {locationsArray.map((item, i) => (
                    <AntBreadcrumb.Item key={item}>
                        {i !== locationsArray.length - 1 ? <Link to={`/${item}`}>{item}</Link> : item}
                    </AntBreadcrumb.Item>
                ))}
            </AntBreadcrumb>
            {/* <AbsentInfo>version {appVersion || '9.9.9.'}</AbsentInfo> */}
        </Section>
    );
};
