import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import history from 'browserHistory';
import { CopyButton } from 'components/common/buttons/CopyButton';
import { Tag } from 'components/common/typography/Tag';
import { AbsentInfo } from 'components/common/typography/titles/AbsentInfo';
import { CardColumnSlider, EllipsisRow } from 'components/grid/Card';
import {
    copyIdMessage,
    deleteTitle,
    hashTagsAbsentMessage,
    nameAbsentMessage,
    parseDeleteModalContent,
    parseDeleteSuccessMessage
} from 'components/layouts/cards/products/ProductCard/constants';
import { CreateAffiliateLinkModal } from 'components/modals/formModals/CreateAffiliateLinkModal';
import { Tooltip } from 'components/modals/Tooltip';
import { ProductEditorModal } from 'componentsNewDesign/modals/formModals/products/ProductEditorModal';
import { ProductImageEditorModal } from 'componentsNewDesign/modals/formModals/products/ProductImageEditorModal';
import { DivClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { Roles } from 'constants/defaults/users';
import { asyncError } from 'constants/notifications';
import { productsLink } from 'constants/routes';
import { antdCardStyle, padding } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React from 'react';
import { API } from 'services';
import { modalEvents } from 'stores/modals/asyncModal';
import { productsEvents } from 'stores/products/products';
import { userStores } from 'stores/users/user';
import { ProductCardEditableFields } from 'types/form';
import { SubjectType } from 'types/types';

const { updateAsyncModalLoading } = modalEvents;

const { Meta } = Card;

interface Props extends YEAY.GetManagedProductResponse {}

export const ProductCard = ({ id = '', name = '', description, hashTags }: Props) => {
    const { access } = useStore(userStores.auth);

    const deleteOkHandler = async (subject: SubjectType) => {
        try {
            updateAsyncModalLoading();
            await API.manageProducts.deleteProductById({
                id: subject.toString()
            });
            updateAsyncModalLoading();

            modalEvents.closeAsyncModal();
            message.success(parseDeleteSuccessMessage(name || ''));
            productsEvents.deleteItemById(subject.toString());
        } catch {
            updateAsyncModalLoading();
            modalEvents.closeAsyncModal();
            message.error(asyncError);
        }
    };

    const moreInfoHandleClick = () => history.push(productsLink + '/' + id);
    const changeEditableFieldsCallback = (fields: ProductCardEditableFields) =>
        productsEvents.updateItemById({ id, ...fields });
    const deleteHandleClick = () =>
        modalEvents.openAsyncModal({
            visible: true,
            title: deleteTitle,
            content: parseDeleteModalContent(name || ''),
            subject: id,
            onOk: deleteOkHandler
        });

    return (
        <>
            <Card
                hoverable
                actions={
                    access === Roles.Administrator || access === Roles.SuperAdministrator
                        ? [
                              <Tooltip key="ellipsis" title="More info">
                                  <EllipsisOutlined key="ellipsis" onClick={moreInfoHandleClick} />
                              </Tooltip>,
                              <ProductEditorModal
                                  key="edit"
                                  description={description}
                                  hashTags={hashTags}
                                  id={id}
                                  name={name}
                                  onChange={changeEditableFieldsCallback}
                              />,
                              <ProductImageEditorModal key="image" id={id} onChange={changeEditableFieldsCallback} />,
                              <CreateAffiliateLinkModal key="affiliateLink" id={id} />,
                              <Tooltip key="setting" title="Delete this product">
                                  <DeleteOutlined onClick={deleteHandleClick} />
                              </Tooltip>
                          ]
                        : [<EllipsisOutlined key="ellipsis" onClick={moreInfoHandleClick} />]
                }
                cover={<MarginWrapper marginTop={padding} />}
                style={antdCardStyle}
            >
                <Meta
                    title={
                        <DivClickableWrapper width="100%" onClick={moreInfoHandleClick}>
                            <EllipsisRow>{name ? name : <AbsentInfo>{nameAbsentMessage}</AbsentInfo>}</EllipsisRow>
                        </DivClickableWrapper>
                    }
                />
                <DivClickableWrapper width="100%" onClick={moreInfoHandleClick}>
                    <Column width="100%">
                        <Row marginBottom="0" marginTop={padding}></Row>
                        <CardColumnSlider>
                            {hashTags?.length ? (
                                hashTags.map((item: string) => <Tag key={item}>{item}</Tag>)
                            ) : (
                                <AbsentInfo>{hashTagsAbsentMessage}</AbsentInfo>
                            )}
                        </CardColumnSlider>
                    </Column>
                </DivClickableWrapper>
                <Row marginBottom="0">
                    <CopyButton removeMarginBottom removeMarginRight subject={id} success={copyIdMessage}>
                        Copy product id
                    </CopyButton>
                </Row>
            </Card>
        </>
    );
};
