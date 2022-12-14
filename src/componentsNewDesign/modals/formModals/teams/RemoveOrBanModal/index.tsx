import { ModalButton } from 'componentsNewDesign/common/buttons/ModalButton';
import { ConfirmCheckbox } from 'componentsNewDesign/common/inputs/ConfirmCheckbox';
import { StyledTextInput } from 'componentsNewDesign/common/inputs/StyledTextInput';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { Loader } from 'componentsNewDesign/dynamic/Loader';
import { Column, Row, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { ModalWrapper } from 'componentsNewDesign/wrappers/ModalWrapper';
import { errorColor, grey27 } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React, { useState } from 'react';
import { removeOrBanUserModal } from 'stores/initialize/initialize.modal.store';
import { teamsEffects } from 'stores/team';
import {
    banUserTitle,
    inputLabel,
    inputPlaceholder,
    marginBottom,
    modalButtonWidth,
    modalTitle,
    removeUserTitle
} from './constants';

const { removeOrBanMember } = teamsEffects;

export interface RemoveOrBanModalProps extends BULLZ.RemoveTeamMemberRequest {}

export const RemoveOrBanModal = () => {
    const [visible, { teamId }] = useStore(removeOrBanUserModal.modal);
    const isPending = useStore(removeOrBanMember.pending);
    const [userIdValue, setUserIdValue] = useState('');

    const onClose = () => removeOrBanUserModal.closeModal();

    const isConfirmedDefault = false;
    const [isBanConfirmed, setIsBanConfirmed] = useState(isConfirmedDefault);
    const [isRemovalConfirmed, setIsRemovalConfirmed] = useState(isConfirmedDefault);

    const onInputChange = (value: string) => {
        setUserIdValue(value);
    };

    const onBanCheckboxChange = (isChecked: boolean) => {
        setIsBanConfirmed(isChecked);
        //console.log('BAN isChecked', isChecked);
    };

    const onRemoveCheckboxChange = (isChecked: boolean) => {
        setIsRemovalConfirmed(isChecked);
        // console.log('Remove isChecked', isChecked);
    };

    const okApplyClick = async () => {
        await removeOrBanMember({
            userId: userIdValue,
            teamId: teamId,
            isBanned: isBanConfirmed
        });
        onClose();
    };

    if (!visible) return null;

    return (
        <ModalWrapper height="fit-content" visible={visible} width="700px" onClose={onClose}>
            <Column alignCenter width="100%">
                <Row marginBottom={marginBottom}>
                    <Span fontSize="14px" fontWeight="500" lineHeight="17px">
                        {modalTitle}
                    </Span>
                </Row>
                <Section alignCenter marginBottom="8px">
                    <ContentText fontSize="11px">{inputLabel}</ContentText>
                </Section>
                <Section alignCenter marginBottom={marginBottom}>
                    <StyledTextInput
                        disableEnterKeyDown
                        backgroundColor="transparent"
                        height="30px"
                        placeholder={inputPlaceholder}
                        onChange={onInputChange}
                    />
                </Section>
                <Section marginBottom="10px">
                    <ConfirmCheckbox
                        fontSize="11px"
                        isConfirmed={isConfirmedDefault}
                        title={banUserTitle}
                        onChange={onBanCheckboxChange}
                    />
                </Section>
                <Section marginBottom={marginBottom}>
                    <ConfirmCheckbox
                        fontSize="11px"
                        isConfirmed={isConfirmedDefault}
                        title={removeUserTitle}
                        onChange={onRemoveCheckboxChange}
                    />
                </Section>

                <Row marginBottom="19px">
                    <Column marginRight="8px">
                        <ModalButton
                            background={grey27}
                            disabled={!isRemovalConfirmed}
                            width={modalButtonWidth}
                            onClick={okApplyClick}
                        >
                            {isPending ? <Loader isWhite /> : isBanConfirmed ? 'Remove and Ban' : 'Remove'}
                        </ModalButton>
                    </Column>

                    <ModalButton background={errorColor} width={modalButtonWidth} onClick={onClose}>
                        Cancel
                    </ModalButton>
                </Row>
            </Column>
        </ModalWrapper>
    );
};
