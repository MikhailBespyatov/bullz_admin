import invalidLinkIcon from 'assets/invalid_link_icon.svg';
import isTrustedIcon from 'assets/trusted-icon.svg';
import { CustomImage } from 'componentsNewDesign/common/imgComponents/CustomImg/styles';
import { StyledTextInput } from 'componentsNewDesign/common/inputs/StyledTextInput';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { ApplyPopoverLayout } from 'componentsNewDesign/modals/popovers/ApplyPopoverLayout';
import { Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { blue3, errorColor } from 'constants/styles/colors';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { FC, useEffect, useState } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { productsEffects, productsEvents } from 'stores/products/products';
import { Id, PopoverType } from 'types/data';
import { Disabled } from 'types/form';
import { isValidHttpUrl } from 'utils/usefulFunctions';

const { loadEditInfoItemById } = productsEffects;

export interface PopoverProps extends Disabled, PopoverType, Id {
    name: string;
}

export const EditProductPopover: FC<PopoverProps> = ({ id, name, ...rest }) => {
    const loading = useStore(modalStores.loading);
    const pending = useStore(loadEditInfoItemById.pending);
    const [isValid, setIsValid] = useState(false);
    const [productNameValue, setProductNameValue] = useState('');
    const [productLinkValue, setProductLinkValue] = useState('');
    useEffect(() => {
        const isValid = isValidHttpUrl(productLinkValue);
        if (isValid) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [productLinkValue]);

    const onApplyClick = async () => {
        await modalEffects.editProductInfo({
            onChange: (fields: BULLZ.UpdateTopicRequest) => productsEvents.updateItemById({ id, ...fields }),
            name: productNameValue,
            link: productLinkValue,
            id: id
        });
        await productsEffects.loadSingleItemById(id);

        setProductNameValue('');
        setProductLinkValue('');
    };

    useEffect(() => setProductNameValue(name), [name]);

    return (
        <ApplyPopoverLayout
            isApplyAllowed={isValid}
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
                        backgroundColor="transparent"
                        defaultValue={productNameValue}
                        placeholder="Type here..."
                        onChange={setProductNameValue}
                    />
                    <MarginWrapper marginBottom="8px">
                        <Span fontSize="11px" fontWeight="500" lineHeight="13px">
                            Topic Link
                        </Span>
                    </MarginWrapper>
                    <StyledTextInput
                        disableClearButton
                        disableEnterKeyDown
                        backgroundColor="transparent"
                        defaultValue={productLinkValue}
                        placeholder="Type here..."
                        onChange={setProductLinkValue}
                    />
                    <Row alignCenter>
                        <MarginWrapper marginRight="4px">
                            {productLinkValue !== '' ? (
                                isValid ? (
                                    <CustomImage height="12px" src={isTrustedIcon} width="12px" />
                                ) : (
                                    <CustomImage height="12px" src={invalidLinkIcon} width="12px" />
                                )
                            ) : null}
                        </MarginWrapper>
                        <Span color={isValid ? blue3 : errorColor}>
                            {productLinkValue !== '' ? (isValid ? 'Valid Link' : 'Invalid Link') : ''}
                        </Span>
                    </Row>
                </Section>
            }
            title="Edit Info"
            onApply={onApplyClick}
            {...rest}
        />
    );
};
