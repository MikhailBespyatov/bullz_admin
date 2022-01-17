import closeIcon from 'assets/close.svg';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { HorizontalLine } from 'componentsNewDesign/common/dividers/HorizontalLine';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { BooleanCheckbox } from 'componentsNewDesign/common/inputs/Checkbox';
import {
    ConfirmationSpan,
    HiddenCheckbox,
    ItemSpan,
    ModalContentWrapper,
    StyledLabel,
    StyledTextArea,
    SubtitleSpan,
    TitleSpan
} from 'componentsNewDesign/modals/DeleteOrBlockUserModal/styles';
import { ContentWrapper } from 'componentsNewDesign/wrappers/ContentWrapper';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { closeIconDiameter } from 'componentsNewDesign/wrappers/ModalWrapper/constant';
import { ModalBackground } from 'componentsNewDesign/wrappers/ModalWrapper/styles';
import { errorColor, grey27, white } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React, { useState } from 'react';
import { modalEvents, modalStores } from 'stores/modals/asyncModal';
import { usersEffects } from 'stores/users/users';

const { deleteUsersById, blockUsersById } = usersEffects;
const { closeDeleteOrBlockUserModal, openStatusModal } = modalEvents;

export const DeleteOrBlockUserModal = () => {
    const { visible, action, userId, username, reasonsList, onOk } = useStore(modalStores.deleteOrBlockUserModal);
    const isDeletePending = useStore(deleteUsersById.pending);
    const [confirmationCheckboxChecked, setConfirmationCheckboxChecked] = useState(false);
    const [comment, setComment] = useState('');

    const title = action === 'delete' ? `Deleting ${username}` : `Blocking ${username}`;
    const buttonText = action === 'delete' ? 'Delete' : 'Block';

    const [selectedReasons, setSelectedReasons] = useState<BULLZ.UserDisablingReason[]>([]);

    const onCheckboxChange = (value: BULLZ.UserDisablingReason) => {
        !selectedReasons.some(reason => value === reason)
            ? setSelectedReasons([...selectedReasons, value])
            : setSelectedReasons(selectedReasons.filter(reason => value !== reason));
    };

    const resetState = () => {
        setSelectedReasons([]);
        setComment('');
        setConfirmationCheckboxChecked(false);
    };

    const onClose = () => {
        closeDeleteOrBlockUserModal();
        resetState();
    };

    const applyClick = async () => {
        if (!confirmationCheckboxChecked) return null;

        if (action === 'delete') {
            const idsArray = await deleteUsersById({ users: [{ userId, reasons: selectedReasons, comment }] });
            !!idsArray.length && onOk && onOk(userId);

            onClose();

            !!idsArray.length &&
                openStatusModal({
                    status: 'success',
                    title: 'Deleted',
                    content: `${username} is successfully deleted.`
                });
        }

        if (action === 'block') {
            const idsArray = await blockUsersById({ users: [{ userId, reasons: selectedReasons, comment }] });
            !!idsArray.length && onOk && onOk(userId);

            onClose();

            !!idsArray.length &&
                openStatusModal({
                    status: 'success',
                    title: 'Blocked',
                    content: `${username} is successfully blocked.`
                });
        }
    };

    if (!visible) return null;

    return (
        <>
            <ModalBackground onClick={onClose} />
            <ModalContentWrapper>
                <Section alignCenter justifyCenter height="42px">
                    <TitleSpan>{title}</TitleSpan>
                </Section>

                <AbsoluteWrapper right="15px" top="15px">
                    <CustomImg
                        pointer
                        height={closeIconDiameter}
                        src={closeIcon}
                        width={closeIconDiameter}
                        onClick={onClose}
                    />
                </AbsoluteWrapper>

                <HorizontalLine background={white} opacity={0.1} />

                <ContentWrapper padding="5px 16px 8px">
                    <Section alignCenter justifyCenter height="30px">
                        <SubtitleSpan>What is the reason?</SubtitleSpan>
                    </Section>

                    {reasonsList.map(({ value, data }) => {
                        const checked = selectedReasons.includes(value);
                        return (
                            <StyledLabel key={value} active={checked}>
                                <HiddenCheckbox
                                    checked={checked}
                                    name={data}
                                    onChange={() => onCheckboxChange(value)}
                                />
                                <ItemSpan>{data}</ItemSpan>
                            </StyledLabel>
                        );
                    })}

                    <StyledTextArea
                        placeholder="Add Comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />

                    <Section alignCenter justifyCenter noWrap marginBottom="20px">
                        <MarginWrapper marginRight="12px">
                            <BooleanCheckbox
                                defaultChecked={confirmationCheckboxChecked}
                                onChange={setConfirmationCheckboxChecked}
                            />
                        </MarginWrapper>
                        <ConfirmationSpan>Are you sure ?</ConfirmationSpan>
                    </Section>

                    <Section alignCenter justifyCenter>
                        <MarginWrapper marginRight="10px">
                            <CardButton background={grey27} onClick={onClose}>
                                Cancel
                            </CardButton>
                        </MarginWrapper>

                        <CardButton
                            background={errorColor}
                            disabled={!confirmationCheckboxChecked}
                            isLoading={isDeletePending}
                            type="secondary"
                            onClick={applyClick}
                        >
                            {buttonText}
                        </CardButton>
                    </Section>
                </ContentWrapper>
            </ModalContentWrapper>
        </>
    );
};
