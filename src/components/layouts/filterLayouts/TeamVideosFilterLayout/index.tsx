import { InfoTitle } from 'components/common/typography/titles/InfoTitle';
import { Footer } from 'components/grid/Footer';
import { Section } from 'components/grid/Section';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { defaultLimit } from 'constants/defaults/filterSettings';
import { useStore } from 'effector-react';
import { infoTitle } from 'pages/Home/constants';
import React, { FC } from 'react';
import { playlistEvents, playlistStores } from 'stores/videos/playlist';
import { TotalRecords } from 'types/data';

const { updateValues } = playlistEvents;

interface Props extends TotalRecords {}

export const TeamVideosFilterLayout: FC<Props> = ({ totalRecords, children }) => {
    const { pageIndex, limit } = useStore(playlistStores.values);

    const onCurrentPageChange = (page: number, pageSize: number | undefined) =>
        updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    return (
        <>
            <Section>
                <InfoTitle title={infoTitle}>{totalRecords !== -1 ? totalRecords : 0}</InfoTitle>
            </Section>
            {children}
            <Footer>
                <Pagination
                    currentIndex={pageIndex + 1}
                    defaultSize={limit}
                    totalItems={totalRecords}
                    onSizeChange={onCurrentPageChange}
                />
            </Footer>
        </>
    );
};
