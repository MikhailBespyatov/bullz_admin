import { Badge, Descriptions } from 'antd';
import avatarImg from 'assets/product_avatar.svg';
import history from 'browserHistory';
import { Button } from 'components/common/buttons/Button';
import { CopyButton } from 'components/common/buttons/CopyButton';
import { noContentMessage } from 'components/common/tables/ProductDescription/constants';
import { Tag } from 'components/common/typography/Tag';
import { AbsentInfo } from 'components/common/typography/titles/AbsentInfo';
import { CreateAffiliateLinkModal } from 'components/modals/formModals/CreateAffiliateLinkModal';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { ProductEditorModal } from 'componentsNewDesign/modals/formModals/products/ProductEditorModal';
import { ProductImageEditorModal } from 'componentsNewDesign/modals/formModals/products/ProductImageEditorModal';
import { MagnifyImage } from 'componentsNewDesign/modals/MagnifyImage';
import { topicsLink } from 'constants/routes';
import { antdCardAvatarWidth } from 'constants/styles/sizes';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { productsEvents } from 'stores/products/products';
import { ProductCardEditableFields } from 'types/form';

const { Item } = Descriptions;

interface Props extends BULLZ.GetManagedProductResponse {}

interface ParamsProps {
    topicId: string;
}

export const ProductDescription = ({
    name = '',
    primaryReferencesCount,
    brandImageUrl,
    id = '',
    description,
    hashTags
}: Props) => {
    const { topicId } = useParams<ParamsProps>();

    const goToProduct = () => history.push(topicsLink + '/' + id);
    const changeEditableFieldsCallback = (fields: ProductCardEditableFields) =>
        productsEvents.updateItemById({ id, ...fields });

    return (
        <Descriptions
            bordered
            extra={
                <>
                    {!topicId && (
                        <Button removeMarginRight onClick={goToProduct}>
                            Go to topic
                        </Button>
                    )}
                </>
            }
            size="small"
            title="Topic Info"
        >
            <Item label="ID">
                {id ? <Link to={topicsLink + '/' + id}>{id}</Link> : <AbsentInfo>{noContentMessage}</AbsentInfo>}
            </Item>
            <Item label="Name">{name || <AbsentInfo>{noContentMessage}</AbsentInfo>}</Item>
            <Item label="Referenced count">
                {primaryReferencesCount ? (
                    <Badge status="processing" text={primaryReferencesCount} />
                ) : (
                    <Badge status="error" text="Not referenced" />
                )}
            </Item>
            <Item label="Image">
                {brandImageUrl ? (
                    <MagnifyImage
                        src={brandImageUrl}
                        title={name || ''}
                        viewHeight={antdCardAvatarWidth}
                        viewWidth={antdCardAvatarWidth}
                    />
                ) : (
                    <CustomImg center alt="avatar" height={antdCardAvatarWidth} src={avatarImg} />
                )}
            </Item>
            <Item label="Hashtags" span={2}>
                {hashTags?.length ? (
                    hashTags.map(i => <Tag key={i}>{i}</Tag>)
                ) : (
                    <AbsentInfo>{noContentMessage}</AbsentInfo>
                )}
            </Item>
            {/* <Item label="Description" span={3}>
                {description || <AbsentInfo>{noContentMessage}</AbsentInfo>}
            </Item> */}
            <Item label="Actions" span={3}>
                <CopyButton removeMarginBottom subject={id} success="You successfully copied topic id!">
                    Copy topic id
                </CopyButton>
                <ProductEditorModal
                    key="edit"
                    removeMarginBottom
                    description={description}
                    hashTags={hashTags}
                    id={id}
                    name={name}
                    title="Edit"
                    onChange={changeEditableFieldsCallback}
                />
                <ProductImageEditorModal
                    key="image"
                    removeMarginBottom
                    id={id}
                    title="Upload image"
                    onChange={changeEditableFieldsCallback}
                />
                <CreateAffiliateLinkModal
                    key="affiliateLink"
                    removeMarginBottom
                    id={id}
                    title="Create affiliate link"
                />
                {/* <ProductEditorModal key="edit" id={id} title="Edit" onChange={changeEditableFieldsCallback} />
                <ProductImageEditorModal
                    key="image"
                    id={id}
                    title="Upload image"
                    onChange={changeEditableFieldsCallback}
                />
                <CreateAffiliateLinkModal key="affiliateLink" id={id} title="Create affiliate link" /> */}
                {/* <Tooltip key="setting" title="Delete this topic">
                    <DeleteOutlined onClick={deleteHandleClick} />
                </Tooltip> */}
            </Item>
        </Descriptions>
    );
};
