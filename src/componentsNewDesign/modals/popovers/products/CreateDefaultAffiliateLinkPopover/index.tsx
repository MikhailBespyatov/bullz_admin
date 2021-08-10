import { StyledTextInput } from 'componentsNewDesign/common/inputs/StyledTextInput';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { ApplyPopoverLayout } from 'componentsNewDesign/modals/popovers/ApplyPopoverLayout';
import { localeDefaultValue } from 'componentsNewDesign/modals/popovers/products/CreateAffiliateLinkPopover/constants';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { FC, useState } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { affiliateLinksEffects } from 'stores/products/affiliateLinks';
import { Id, PopoverType } from 'types/data';
import { Disabled } from 'types/form';

export interface PopoverProps extends Disabled, PopoverType, Id {
    urlData?: string;
}

export const CreateDefaultAffiliateLinkPopover: FC<PopoverProps> = ({ id, urlData, ...rest }) => {
    const loading = useStore(modalStores.loading);

    const [url, setUrl] = useState(urlData || '');

    const isApplyAllowed = !!url;

    const onApply = async () => {
        try {
            await modalEffects.changeDefaultAffiliateLink({
                url,
                productId: id,
                /* Any locale, doesn't affect anything '*/
                locale: localeDefaultValue,
                onChange: () => affiliateLinksEffects.getItemsByProductId(id)
            });
        } catch {}
    };

    return (
        <ApplyPopoverLayout
            isApplyAllowed={isApplyAllowed}
            loading={loading}
            modalChildren={
                <>
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
