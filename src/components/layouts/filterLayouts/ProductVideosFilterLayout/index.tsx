import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { Footer } from 'componentsNewDesign/grid/Footer';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { defaultLimit } from 'constants/defaults/filterSettings';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { productVideosEvents, productVideosStores } from 'stores/videos/productVideos';
import { TotalRecords } from 'types/data';

const { updateValues } = productVideosEvents;

interface Props extends TotalRecords {}

export const ProductVideosFilterLayout: FC<Props> = ({ totalRecords, children }) => {
    const { pageIndex, limit } = useStore(productVideosStores.values);

    const onCurrentPageChange = (page: number, pageSize: number | undefined) =>
        updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    return (
        <>
            <Section marginBottom="11px">
                <TotalBadge quantity={totalRecords && totalRecords !== -1 ? totalRecords : 0} />
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
