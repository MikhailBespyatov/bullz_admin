import verifiedImg from 'assets/is_trusted.svg';
import { verifiedImgDiameter } from 'components/common/imgComponents/UserImg/constants';
import { statisticsTableColumns } from 'components/common/tables/DescriptionTable/constants';
import { AbsentInfo } from 'components/common/typography/titles/AbsentInfo';
import { OverflowAutoLayout } from 'components/layouts/OverflowAutoLayout';
import { CopyButton } from 'componentsNewDesign/common/buttons/CopyButton';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { SubtitleIdLink } from 'componentsNewDesign/layouts/blocks/PropertyBlock';
import {
    assistiveTextColor,
    tableDataBorder,
    tableDataPadding
} from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/constants';
import {
    Table,
    TableData,
    TableHeader,
    TableRow,
    TableWrapper
} from 'componentsNewDesign/layouts/descriptionLayouts/ProductDescription/styles';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { homeLink, usersLink } from 'constants/routes';
import { grey27, grey29 } from 'constants/styles/colors';
import React from 'react';
import { noContentMessage } from './constants';
import { ItemSpan, ItemWrapper } from './styles';

interface Props extends BULLZ.QueryVideoStatisticsResponse {
    removeItem?: keyof BULLZ.VideoStatisticsResponse;
}
interface DataTable extends BULLZ.QueryVideoStatisticsResponse {
    [key: string]: any;
}
export const StatisticsTable = ({ items, removeItem }: Props) => {
    const data = items?.map(({ userId, videoId, userInfo, videoInfo, ...rest }) => {
        const dataTable: DataTable = {
            ...rest,
            userId: userId ? (
                <ItemWrapper
                    alignCenter
                    justifyBetween
                    noWrap
                    marginBottom="0"
                    opacity={userInfo?.isDisabled ? 0.3 : 1}
                >
                    <Column alignCenter justifyCenter marginRight="10px">
                        <SubtitleIdLink id={userId} linkRoute={usersLink}>
                            <ItemSpan fontSize="12px" fontWeight="bold" lineThrough={userInfo?.isDisabled || undefined}>
                                {userId}
                            </ItemSpan>
                        </SubtitleIdLink>
                        <ItemSpan fontSize="12px" fontWeight="bold" lineThrough={userInfo?.isDisabled || undefined}>
                            {userInfo?.username}
                        </ItemSpan>
                    </Column>
                    {userInfo?.isTrusted && (
                        <MarginWrapper marginRight="10px">
                            <CustomImg height={verifiedImgDiameter} src={verifiedImg} width={verifiedImgDiameter} />
                        </MarginWrapper>
                    )}
                    <MarginWrapper marginRight="10px">
                        <CopyButton diameter="18px" subject={userId} success={`Success copy User ID (${userId})`} />
                    </MarginWrapper>
                </ItemWrapper>
            ) : (
                <AbsentInfo>{noContentMessage}</AbsentInfo>
            ),
            videoId: videoId ? (
                <ItemWrapper
                    alignCenter
                    justifyBetween
                    noWrap
                    marginBottom="0"
                    opacity={videoInfo?.isDeleted ? 0.3 : 1}
                >
                    <MarginWrapper marginRight="10px">
                        <SubtitleIdLink id={videoId} linkRoute={homeLink}>
                            <ItemSpan fontSize="12px" fontWeight="bold" lineThrough={videoInfo?.isDeleted || undefined}>
                                {videoId}
                            </ItemSpan>
                        </SubtitleIdLink>
                    </MarginWrapper>
                    <CopyButton diameter="18px" subject={videoId} success={`Success copy Video ID ( ${videoId})`} />
                </ItemWrapper>
            ) : (
                <AbsentInfo>{noContentMessage}</AbsentInfo>
            )
        };

        removeItem && delete dataTable[removeItem];
        return dataTable;
    });

    const sumPartsOfTableWidth = statisticsTableColumns
        .map(({ width }) => width)
        .reduce((prev, curr) => prev + curr, 0);

    return (
        <OverflowAutoLayout>
            <TableWrapper backgroundColor={grey29} borderRadius="20px">
                <Table>
                    <TableRow backgroundColor={grey27}>
                        {statisticsTableColumns
                            .filter(({ key }) => removeItem !== key)
                            .map(({ title, width }) => (
                                <TableHeader key={title} width={(width * 100) / sumPartsOfTableWidth + '%'}>
                                    {title}
                                </TableHeader>
                            ))}
                    </TableRow>
                    {data &&
                        data.map((dataRow, i) => (
                            <TableRow key={i.toString()} borderTop={tableDataBorder} color={assistiveTextColor}>
                                {statisticsTableColumns
                                    .filter(({ key }) => removeItem !== key)
                                    .map(({ key, width }, i) => (
                                        <TableData
                                            key={i.toString()}
                                            padding={tableDataPadding}
                                            width={(width * 100) / sumPartsOfTableWidth + '%'}
                                        >
                                            <Row alignCenter justifyCenter width="100%">
                                                {typeof dataRow[key] === 'number' ? (
                                                    <Span fontSize="10px" fontWeight="bold" lineHeight="12px">
                                                        {dataRow[key]}
                                                    </Span>
                                                ) : (
                                                    dataRow[key]
                                                )}
                                            </Row>
                                        </TableData>
                                    ))}
                            </TableRow>
                        ))}
                </Table>
            </TableWrapper>
        </OverflowAutoLayout>
    );
};
