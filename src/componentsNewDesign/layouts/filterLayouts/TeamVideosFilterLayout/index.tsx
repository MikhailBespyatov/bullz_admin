import { Footer } from 'components/grid/Footer';
import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { titlePadding } from 'componentsNewDesign/layouts/filterLayouts/TeamVideosFilterLayout/constants';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { defaultLimit } from 'constants/defaults/filterSettings';
import { useStore } from 'effector-react';
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
            <ContentText fontSize="16px" fontWeight="700" padding={titlePadding}>
                Team videos
            </ContentText>

            <MarginWrapper marginBottom="20px" marginTop="20px">
                <TotalBadge quantity={totalRecords} />
            </MarginWrapper>

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
