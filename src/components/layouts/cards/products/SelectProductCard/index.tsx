import { PlusOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import avatarImg from 'assets/product_avatar.svg';
import { CopyButton } from 'components/common/buttons/CopyButton';
import { Tag } from 'components/common/typography/Tag';
import { AbsentInfo } from 'components/common/typography/titles/AbsentInfo';
import { CardColumnSlider } from 'components/grid/Card';
import { hashTagsAbsentMessage, nameAbsentMessage } from 'components/layouts/cards/products/ProductCard/constants';
import { copyIdMessage } from 'components/layouts/cards/products/SelectProductCard/constants';
import { Tooltip } from 'components/modals/Tooltip';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { MagnifyImage } from 'componentsNewDesign/modals/MagnifyImage';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { asyncError } from 'constants/notifications';
import { antdCardAvatarWidth, antdCardWidth, padding } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { useMemo } from 'react';
import { modalEffects } from 'stores/modals/asyncModal';
import { productsEffects } from 'stores/products/products';
import { selectProductsEvents } from 'stores/products/selectProducts';
import { videosEffects, videosEvents, videosStores } from 'stores/videos/videos';

const { Meta } = Card;

interface Props extends BULLZ.TopicResponse {}

export const SelectProductCard = ({ id: productId, name, tags }: Props) => {
    const video = useStore(videosStores.video);

    //Mock
    const imageUrl = '';

    const id = useMemo(() => productId, [productId]);

    const selectHandleClick = async () => {
        try {
            selectProductsEvents.setVisibleToFalse();
            await videosEffects.loadEditInfoItemById(video.id || '');
            await modalEffects.editVideoInfo({
                id: video.id || '',
                primaryProductId: id
            });
            await productsEffects.loadSingleItemById(id || '');
            videosEvents.setSingleItem({ ...video, primaryProductId: id });

            message.success('You successfully updated primary product of video');
        } catch {
            message.error(asyncError);
        }
    };

    return (
        <Card
            hoverable
            actions={[
                <Tooltip key="select" title="Select this product as primary">
                    <PlusOutlined onClick={selectHandleClick} />
                </Tooltip>
            ]}
            cover={
                <MarginWrapper marginTop={padding}>
                    {imageUrl ? (
                        <MagnifyImage
                            src={imageUrl}
                            title={name || ''}
                            viewHeight={antdCardAvatarWidth}
                            viewWidth={antdCardAvatarWidth}
                        />
                    ) : (
                        <CustomImg center alt="avatar" height={antdCardAvatarWidth} src={avatarImg} />
                    )}
                </MarginWrapper>
            }
            style={{ width: antdCardWidth, marginBottom: padding, marginRight: padding }}
        >
            <Meta title={name || <AbsentInfo>{nameAbsentMessage}</AbsentInfo>} />
            <Row marginBottom="0" marginTop={padding} />
            <CardColumnSlider>
                {tags?.length ? (
                    tags.map((item: string) => <Tag key={item}>{item}</Tag>)
                ) : (
                    <AbsentInfo>{hashTagsAbsentMessage}</AbsentInfo>
                )}
            </CardColumnSlider>
            <Row marginBottom="0">
                <CopyButton removeMarginBottom removeMarginRight subject={id} success={copyIdMessage}>
                    Copy product id
                </CopyButton>
            </Row>
        </Card>
    );
};
