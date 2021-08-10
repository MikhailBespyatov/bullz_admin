import { StyledTextInput } from 'componentsNewDesign/common/inputs/StyledTextInput';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { ApplyPopoverLayout } from 'componentsNewDesign/modals/popovers/ApplyPopoverLayout';
import { popoverMinWidth, title } from 'componentsNewDesign/modals/popovers/teams/EditTeamInfoPopover/constants';
import { Column, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { filterMargin } from 'constants/styles/sizes';
import { useStore } from 'effector-react';
import React, { FC, useEffect, useState } from 'react';
import { modalEffects, modalStores } from 'stores/modals/asyncModal';
import { Id, PopoverType } from 'types/data';
import { Disabled } from 'types/form';

export interface EditTeamInfoPopoverProps extends Disabled, PopoverType, Id /*Index*/ {
    name: string;
    urlName: string;
    onChange?: (fields: YEAY.UpdateTeamRequest) => void;
}

export const EditTeamInfoPopover: FC<EditTeamInfoPopoverProps> = ({ onChange, id, name, urlName, ...rest }) => {
    const loading = useStore(modalStores.loading);

    const [newName, setNewName] = useState(name);
    const [newUrlName, setNewUrlName] = useState(urlName);

    const isApplyAllowed = !!(newUrlName && newName);

    // const onChange = (index: number) => setLocale(localeValues[index]);

    // const changeEditableFieldsCallback = (fields: ProductCardEditableFields) =>
    // teamsEvents.updateItemById({ id, ...fields });

    const onApply = async () => {
        // console.log('onApply', 'ID___', id);
        // console.log('newName___', newName);
        // console.log('newUrlName___', newUrlName);
        //teamsEvents.updateItemById({ id, name, urlName });
        modalEffects.editTeamInfo({ onChange: onChange, id, name: newName, urlName: newUrlName });
    };

    useEffect(() => setNewName(name), [name]);
    useEffect(() => setNewUrlName(urlName), [urlName]);

    return (
        <ApplyPopoverLayout
            isApplyAllowed={isApplyAllowed}
            loading={loading}
            minWidth={popoverMinWidth}
            modalChildren={
                <>
                    <Column marginBottom={filterMargin} width="100%">
                        <MarginWrapper marginBottom="8px">
                            <Span fontSize="11px" fontWeight="500" lineHeight="13px">
                                Name
                            </Span>
                        </MarginWrapper>

                        <StyledTextInput
                            disableClearButton
                            disableEnterKeyDown
                            defaultValue={name}
                            placeholder="Type here..."
                            onChange={setNewName}
                        />
                    </Column>
                    <Section marginBottom={filterMargin}>
                        <MarginWrapper marginBottom="8px">
                            <Span fontSize="11px" fontWeight="500" lineHeight="13px">
                                URL Name
                            </Span>
                        </MarginWrapper>
                        <StyledTextInput
                            disableClearButton
                            disableEnterKeyDown
                            defaultValue={urlName}
                            placeholder="Type here..."
                            onChange={setNewUrlName}
                        />
                    </Section>
                </>
            }
            title={title}
            onApply={onApply}
            {...rest}
        />
    );
};
