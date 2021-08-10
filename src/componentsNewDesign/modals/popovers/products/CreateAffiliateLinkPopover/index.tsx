import { Select } from 'componentsNewDesign/common/inputs/Select';
import { StyledTextInput } from 'componentsNewDesign/common/inputs/StyledTextInput';
import { inputBorder } from 'componentsNewDesign/common/inputs/StyledTextInput/constants';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { ApplyPopoverLayout } from 'componentsNewDesign/modals/popovers/ApplyPopoverLayout';
import {
    localeDefaultValue,
    localeValues
} from 'componentsNewDesign/modals/popovers/products/CreateAffiliateLinkPopover/constants';
import { Column, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { FC, useState } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { Id, PopoverType } from 'types/data';
import { Disabled } from 'types/form';

export interface PopoverProps extends Disabled, PopoverType, Id {}

export const CreateAffiliateLinkPopover: FC<PopoverProps> = ({ id, ...rest }) => {
    const loading = useStore(modalStores.loading);

    const [locale, setLocale] = useState(localeDefaultValue);
    const [url, setUrl] = useState('');

    const isApplyAllowed = !!url;

    const onChange = (index: number) => setLocale(localeValues[index]);

    const onApply = async () => {
        try {
            await modalEffects.createAffiliateLink({ url, locale, productId: id });
        } catch {}
    };

    return (
        <ApplyPopoverLayout
            isApplyAllowed={isApplyAllowed}
            loading={loading}
            modalChildren={
                <>
                    <Column marginBottom={filterMargin} width="100%">
                        <MarginWrapper marginBottom="8px">
                            <Span fontSize="11px" fontWeight="500" lineHeight="13px">
                                Locale
                            </Span>
                        </MarginWrapper>
                        <Select border={inputBorder} selector={localeValues} width="100%" onChange={onChange} />
                    </Column>
                    <Section marginBottom={filterMargin}>
                        <MarginWrapper marginBottom="8px">
                            <Span fontSize="11px" fontWeight="500" lineHeight="13px">
                                Name
                            </Span>
                        </MarginWrapper>
                        <StyledTextInput
                            disableClearButton
                            disableEnterKeyDown
                            defaultValue={url}
                            placeholder="Type here..."
                            onChange={setUrl}
                        />
                    </Section>
                </>
            }
            title="Edit Info"
            onApply={onApply}
            {...rest}
        />
    );
};
