import { ModalButton } from 'componentsNewDesign/common/buttons/ModalButton';
import { ContentText } from 'componentsNewDesign/modals/AsyncModal/styles';
import { Column, Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { ModalWrapper } from 'componentsNewDesign/wrappers/ModalWrapper';
import { black, errorColor } from 'constants/styles/colors';
import { useStore } from 'effector-react';
import React from 'react';
import { removeTrendingModal } from 'stores/initialize/initialize.modal.store';
import { trendingsEffects, trendingsStores } from 'stores/trendings';

export const AsyncDeleteTrendingModal = () => {
    const [visible, data] = useStore(removeTrendingModal.modal);
    const loading = useStore(trendingsStores.removeLoading);

    const okHandler = () => trendingsEffects.removeItem(data);
    const onCancel = () => removeTrendingModal.closeModal();

    return (
        <ModalWrapper height="230px" visible={visible} width="580px" onClose={onCancel}>
            <Column alignCenter width="100%">
                {/* <Row marginBottom="20px">
                    <TitleText>{title}</TitleText>
                </Row> */}
                <Row marginBottom="38px">
                    <ContentText>
                        Are you sure you want to remove{' '}
                        {data?.subject !== 'video' ? <>a {data?.subject} </> : <> this video from position </>}
                        {data?.subjectName} in trendings?
                    </ContentText>
                </Row>
                <Row marginBottom="0">
                    <Column marginRight="8px">
                        <ModalButton background={errorColor} disabled={loading} onClick={onCancel}>
                            Cancel
                        </ModalButton>
                    </Column>
                    <ModalButton background={black} onClick={okHandler}>
                        {loading ? 'Loading...' : 'Ok'}
                    </ModalButton>
                </Row>
            </Column>
        </ModalWrapper>
    );
};
