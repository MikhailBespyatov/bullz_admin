import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card, Tooltip } from 'antd';
import defaultImg from 'assets/defaults/default_img.svg';
import playImg from 'assets/play.svg';
import history from 'browserHistory';
import { AddButton } from 'components/common/buttons/AddButton';
import {
    addButtonHeight,
    playImgDiameter,
    relativeWrapperHeight
} from 'components/layouts/cards/videos/TrendingVideoCard/constants';
import {
    AbsoluteImg,
    FeaturesWrapper,
    PositionWrapper,
    ViewsText
} from 'components/layouts/cards/videos/TrendingVideoCard/styles';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { Column, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { RelativeWrapper } from 'componentsNewDesign/wrappers/grid/RelativeWrapper';
import { Roles } from 'constants/defaults/users';
import { homeLink } from 'constants/routes';
import { antdTrendingCardStyle, padding, trendingCardWidth } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { createTrendingVideoModal } from 'stores/initialize/initialize.modal.store';
import { userStores } from 'stores/users/user';
import { RemoveClick } from 'types/modals';
import { numberConverter } from 'utils/usefulFunctions';

const PositionComponent: FC = ({ children }) => (
    <PositionWrapper>
        <ViewsText>{children}</ViewsText>
    </PositionWrapper>
);

interface Position {
    position: number;
}

interface Props extends YEAY.GetTrendVideosResponse, RemoveClick, Position {}

export const TrendingVideoCard = ({ videoId, thumbnailUrl, viewCount, onRemove, position }: Props) => {
    const { access } = useStore(userStores.auth);

    const moreInfoHandleClick = () => history.push(homeLink + '/' + videoId);

    return (
        <Card
            hoverable
            actions={
                access < Roles.ContentManager
                    ? [
                          <Tooltip key="ellipsis" title="More info">
                              <EllipsisOutlined key="ellipsis" onClick={moreInfoHandleClick} />
                          </Tooltip>,
                          <Tooltip key="setting" title="Delete this video">
                              <DeleteOutlined onClick={onRemove} />
                          </Tooltip>
                      ]
                    : [<EllipsisOutlined key="ellipsis" onClick={moreInfoHandleClick} />]
            }
            style={{ ...antdTrendingCardStyle, position: 'relative', cursor: 'inherit' }}
        >
            <RelativeWrapper height={relativeWrapperHeight}>
                <AbsoluteImg draggable={false} src={thumbnailUrl || defaultImg} />
                <PositionComponent>{position + 1}</PositionComponent>
                <Section alignEnd height="100%" marginBottom="0">
                    <FeaturesWrapper>
                        <Column marginRight="4px">
                            <CustomImg height={playImgDiameter} src={playImg} width={playImgDiameter} />
                        </Column>
                        <ViewsText>{numberConverter(viewCount || 0)}</ViewsText>
                    </FeaturesWrapper>
                </Section>
            </RelativeWrapper>
        </Card>
    );
};

export const EmptyTrendingVideoCard = ({ position }: Position) => {
    const onClick = () => createTrendingVideoModal.openModal({ definedPosition: position });

    return (
        <MarginWrapper marginBottom={padding} marginRight={padding}>
            <RelativeWrapper height={addButtonHeight} width={trendingCardWidth}>
                <PositionComponent>
                    <ViewsText>{position + 1}</ViewsText>
                </PositionComponent>
                <AddButton height="100%" width="100%" onClick={onClick} />
            </RelativeWrapper>
        </MarginWrapper>
    );
};
