import { Modal } from 'antd';
import { Button } from 'components/common/buttons/Button';
import { Loader } from 'components/common/dynamic/Loader';
import { FeatureCell } from 'components/grid/Card';
import { Section } from 'components/grid/Section';
import { SelectProductCard } from 'components/layouts/cards/products/SelectProductCard';
import { Empty } from 'components/layouts/resultLayouts/Empty';
import { SelectProductsFilterLayout } from 'componentsNewDesign/layouts/filterLayouts/SelectProductsFilterLayout';
import { useStore } from 'effector-react';
import { notFoundMessage } from 'pages/Products/constants';
import React from 'react';
import { selectProductsEvents, selectProductsStores } from 'stores/products/selectProducts';
import { Title } from 'types/data';

interface Props extends Title {}

export const SelectProductFilterModal = ({ title = 'Change primary product' }: Props) => {
    const { items, totalRecords } = useStore(selectProductsStores.products);
    const visible = useStore(selectProductsStores.visible);
    const loading = useStore(selectProductsStores.loading);

    const { updateVisible } = selectProductsEvents;

    // const selectHandleClick = (id: string) => {
    //     updateVisible();
    //     productsEffects.loadSingleItemById(id);
    // };

    return (
        <>
            {title ? (
                <Button onClick={() => updateVisible()}>{title}</Button>
            ) : (
                <FeatureCell onClick={() => updateVisible()}>{'Edit'}</FeatureCell>
            )}
            <Modal
                footer={[]}
                title="Select new primary product"
                visible={visible}
                width="100%"
                //onOk={() => updateVisible()}
                onCancel={() => updateVisible()}
            >
                <SelectProductsFilterLayout totalRecords={totalRecords}>
                    {loading ? (
                        <Section justifyCenter>
                            <Loader size="large" />
                        </Section>
                    ) : (
                        <Section removeMarginRight>
                            {items?.length ? (
                                items.map(item => (
                                    <SelectProductCard
                                        key={item.id + 'select'}
                                        {...item}
                                        //selectHandleClick={selectHandleClick}
                                    />
                                ))
                            ) : (
                                <Empty description={notFoundMessage} />
                            )}
                        </Section>
                    )}
                </SelectProductsFilterLayout>
            </Modal>
        </>
    );
};
