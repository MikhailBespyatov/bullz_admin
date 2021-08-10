import { StyledTextInput } from 'componentsNewDesign/common/inputs/StyledTextInput';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { ApplyPopoverLayout } from 'componentsNewDesign/modals/popovers/ApplyPopoverLayout';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { FC, useEffect, useState } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { productsEffects, productsEvents } from 'stores/products/products';
import { Id, PopoverType } from 'types/data';
import { Disabled } from 'types/form';

const { loadEditInfoItemById } = productsEffects;

export interface PopoverProps extends Disabled, PopoverType, Id {
    name: string;
}

export const EditProductPopover: FC<PopoverProps> = ({ id, name, ...rest }) => {
    const loading = useStore(modalStores.loading);
    const pending = useStore(loadEditInfoItemById.pending);

    const [productNameValue, setProductNameValue] = useState('');

    const onApplyClick = async () => {
        await loadEditInfoItemById(id);
        modalEffects.editProductInfo({
            onChange: (fields: YEAY.UpdateProductRequest) => productsEvents.updateItemById({ id, ...fields }),
            name: productNameValue,
            id: id
        });
        setProductNameValue('');
    };

    useEffect(() => setProductNameValue(name), [name]);

    return (
        <ApplyPopoverLayout
            loading={loading || pending}
            modalChildren={
                <Section marginBottom={filterMargin}>
                    <MarginWrapper marginBottom="8px">
                        <Span fontSize="11px" fontWeight="500" lineHeight="13px">
                            Name
                        </Span>
                    </MarginWrapper>
                    <StyledTextInput
                        disableClearButton
                        disableEnterKeyDown
                        defaultValue={productNameValue}
                        placeholder="Type here..."
                        onChange={setProductNameValue}
                    />
                </Section>
            }
            title="Edit Info"
            onApply={onApplyClick}
            {...rest}
        />
    );
};
