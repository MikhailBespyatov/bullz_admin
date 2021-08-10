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
import React, { FC, useEffect, useState } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { affiliateLinksEvents } from 'stores/products/affiliateLinks';
import { Id, Index, PopoverType } from 'types/data';
import { Disabled } from 'types/form';

export interface PopoverProps extends Disabled, PopoverType, Id, Index {
    url: string;
    cultureInfo?: string;
    disabledSelector?: boolean;
}

export const ChangeAffiliateLinkPopover: FC<PopoverProps> = ({
    id,
    i,
    url: defaultUrl,
    cultureInfo = localeDefaultValue,
    disabledSelector,
    ...rest
}) => {
    const loading = useStore(modalStores.loading);

    const [locale, setLocale] = useState(cultureInfo);
    const [url, setUrl] = useState(defaultUrl);

    const isApplyAllowed = !!url;

    const onChange = (index: number) => setLocale(localeValues[index]);

    const onApply = async () => {
        try {
            await modalEffects.changeAffiliateLink({
                url,
                locale,
                productId: id,
                i,
                onChange: (i: number, url: string) => affiliateLinksEvents.updateAffiliateLinkUrlByIndex({ i, url })
            });
        } catch {}
    };

    useEffect(() => setUrl(defaultUrl), [defaultUrl]);
    useEffect(() => setLocale(cultureInfo), [cultureInfo]);

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
                        <Select
                            border={inputBorder}
                            defaultIndex={localeValues.findIndex(value => value === locale)}
                            disabled={disabledSelector}
                            selector={localeValues}
                            width="100%"
                            onChange={onChange}
                        />
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
