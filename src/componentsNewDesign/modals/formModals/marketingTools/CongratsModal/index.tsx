import yeayLogo from 'assets/bullz_logo_white.svg';
import history from 'browserHistory';
import { SimpleButton } from 'componentsNewDesign/common/buttons/SimpleButton';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { marketingToolsLink } from 'constants/routes';
import { black, grey27, white } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import { useNonScrolledBackground } from 'hooks/nonScrolledBackground';
import React from 'react';
import { promotionForm } from 'stores/forms/promotionForm';
import { promotionCreatedCongratsModal } from 'stores/initialize/initialize.modal.store';
import { Modal, ModalContentWrapper, Triangle, Wrapper } from './styles';

const { modal, closeModal } = promotionCreatedCongratsModal;

export const CongratsModal = () => {
    const [visible, { promotionId }] = useStore(modal);

    const onDoneClick = () => {
        closeModal();
        history.push(marketingToolsLink);
        promotionForm.resetValues();
    };

    useNonScrolledBackground(visible);

    return (
        <Wrapper visible={visible}>
            <Modal>
                <AbsoluteWrapper right="0px" top="0px" width="100%" zIndex="5">
                    <Column alignCenter marginTop="60px">
                        <CustomImg src={yeayLogo} width="180px" />
                    </Column>
                </AbsoluteWrapper>
                <Triangle />
                <ModalContentWrapper>
                    <Row>
                        <Span alignCenter color={black} fontSize="32px" fontWeight="700" lineHeight="35px">
                            CONGRATS!
                        </Span>
                    </Row>
                    <Column alignCenter marginBottom="30px" width="400px">
                        <Span alignCenter color="#333333" fontSize="17px" fontWeight="400">
                            You have successfully started the&nbsp;promotion
                        </Span>
                        <Span alignCenter color="#333333" fontSize="17px" fontWeight="400">
                            (id {promotionId})
                        </Span>
                    </Column>

                    <SimpleButton
                        background={black}
                        backgroundHover={grey27}
                        borderRadius="4px"
                        color={white}
                        fontSize="16px"
                        fontWeight="400"
                        marginBottom="40px"
                        padding="8px"
                        textHover={white}
                        width="100px"
                        onClick={onDoneClick}
                    >
                        Done
                    </SimpleButton>
                </ModalContentWrapper>
            </Modal>
        </Wrapper>
    );
};
