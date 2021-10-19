import { PlusOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import defaultImg from 'assets/defaults/default_img.svg';
import playImg from 'assets/play.svg';
import { Loader } from 'components/common/dynamic/Loader';
import { playImgDiameter, relativeWrapperHeight } from 'components/layouts/cards/videos/TrendingVideoCard/constants';
import { AbsoluteImg, FeaturesWrapper, ViewsText } from 'components/layouts/cards/videos/TrendingVideoCard/styles';
import { Tooltip } from 'components/modals/Tooltip';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { Column, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { antdCardStyle } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React from 'react';
import { CreateVideoProps } from 'stores/initialize/initialize.modal.store';
import { trendingsEffects, trendingsStores } from 'stores/trendings';
import { numberConverter } from 'utils/usefulFunctions';

interface Props extends BULLZ.AdminGetVideoResponse, CreateVideoProps {}

export const CreateTrendingVideoCard = ({
    id = '',
    thumbnailUrl,
    engagementStatistics,
    streaming,
    definedPosition
}: Props) => {
    const loading = useStore(trendingsStores.createLoading);

    const screenGrabUrl = streaming?.details?.screenGrabUrl || '';

    const selectHandleClick = () => trendingsEffects.createVideo({ id, definedPosition });

    return (
        <Card
            hoverable
            actions={[
                loading ? (
                    <Loader size="small" />
                ) : (
                    <Tooltip key="select" title="Create this video as trending">
                        <PlusOutlined onClick={selectHandleClick} />
                    </Tooltip>
                )
            ]}
            //cover={<CustomImg height="300px" src={thumbnailUrl || ''} width="100%" />}
            style={antdCardStyle}
        >
            <RelativeWrapper height={relativeWrapperHeight}>
                <AbsoluteImg src={thumbnailUrl || screenGrabUrl || defaultImg} />
                <Section alignEnd height="100%" marginBottom="0">
                    <FeaturesWrapper>
                        <Column marginRight="4px">
                            <CustomImg height={playImgDiameter} src={playImg} width={playImgDiameter} />
                        </Column>
                        <ViewsText>{numberConverter(engagementStatistics?.views || 0)}</ViewsText>
                    </FeaturesWrapper>
                </Section>
            </RelativeWrapper>
        </Card>
    );
};
