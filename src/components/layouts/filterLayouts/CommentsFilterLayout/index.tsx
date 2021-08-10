import { RedoOutlined } from '@ant-design/icons';
import { Button } from 'components/common/buttons/Button';
import { Footer } from 'components/grid/Footer';
import { Section } from 'components/grid/Section';
import { TotalBadge } from 'componentsNewDesign/common/badges/TotalBadge';
import { SearchInput } from 'componentsNewDesign/common/inputs/SearchInput';
import { Pagination } from 'componentsNewDesign/layouts/Pagination';
import { defaultLimit } from 'constants/defaults/filterSettings';
import { useStore } from 'effector-react';
import { commentsSearchByThreadIdPlaceholder, commentsSearchByUserIdPlaceholder } from 'pages/Comments/constants';
import React, { FC, useEffect } from 'react';
import { commentsEvents, commentsStores } from 'stores/comments/comments';
import { SearchParameters, TotalRecords } from 'types/data';

interface Props extends TotalRecords {}

export const CommentsFilterLayout: FC<Props> = ({ totalRecords, children }) => {
    const { setIsFirstToTrue, invokeGetComments, updateValues, setDefaultValues } = commentsEvents;
    const { pageIndex, limit, userId, threadId } = useStore(commentsStores.values);

    const isFirst = useStore(commentsStores.isFirst);

    const resetFilters = () => setDefaultValues();

    const onCommentsSearchByUserId = (userId: string) =>
        updateValues({
            userId: userId || undefined
        });
    const onCommentsSearchByThreadId = (threadId: string) =>
        updateValues({
            threadId: threadId || undefined
        });

    const onCurrentPageChange = (page: number, pageSize: number | undefined) =>
        updateValues({
            pageIndex: page,
            limit: pageSize || defaultLimit
        });

    useEffect(() => {
        if (isFirst) {
            invokeGetComments();
            setIsFirstToTrue();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchParameters: SearchParameters[] = [
        {
            searchBy: 'User ID',
            defaultValue: userId || '',
            placeholder: commentsSearchByUserIdPlaceholder,
            onSearch: onCommentsSearchByUserId
        },
        {
            searchBy: 'Thread ID',
            defaultValue: threadId || '',
            placeholder: commentsSearchByThreadIdPlaceholder,
            onSearch: onCommentsSearchByThreadId
        }
    ];
    //console.log(userId);
    return (
        <>
            <Section>
                <SearchInput searchParameters={searchParameters} />
                {/*<SearchCell lg={6}>*/}
                {/*    <Search*/}
                {/*        defaultValue={userId || ''}*/}
                {/*        id="userId"*/}
                {/*        placeholder={commentsSearchByUserIdPlaceholder}*/}
                {/*        onSearch={onCommentsSearchByUserId}*/}
                {/*    />*/}
                {/*</SearchCell>*/}
                {/*<SearchCell removePaddingRight lg={6}>*/}
                {/*    <Search*/}
                {/*        //key={key}*/}
                {/*        defaultValue={threadId || ''}*/}
                {/*        id="threadId"*/}
                {/*        placeholder={commentsSearchByThreadIdPlaceholder}*/}
                {/*        onSearch={onCommentsSearchByThreadId}*/}
                {/*    />*/}
                {/*</SearchCell>*/}
            </Section>
            <Section>
                <Button icon={<RedoOutlined />} type="primary" onClick={resetFilters}>
                    Reset filter settings
                </Button>
            </Section>
            <Section>
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
