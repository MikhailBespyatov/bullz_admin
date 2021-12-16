import { noop } from 'constants/functions';
import { combine, createEvent, createStore } from 'effector';
import { StrictVisibility } from 'types/styles';

interface Modal extends StrictVisibility {}

const initializeStoreModal = () => {
    const openModal = createEvent();
    const closeModal = createEvent();

    const modal = createStore<Modal>({
        visible: false
    })
        .on(openModal, () => ({
            visible: true
        }))
        .on(closeModal, () => ({
            visible: false
        }));

    return { modal, openModal, closeModal };
};

export const createTagTrendingModal = initializeStoreModal();
export const createUserTrendingModal = initializeStoreModal();
export const createDescriptionVideoCardModal = initializeStoreModal();
//export const createVideoTrendingModal = initializeStoreModal();

const initializeGenericStore = <T>(initialState: T) => {
    const openModal = createEvent<T>();
    const closeModal = createEvent();

    const visible = createStore(false)
        .on(openModal, () => true)
        .on(closeModal, () => false);
    const state = createStore<T>(initialState).on(openModal, (_, newState) => newState);
    const modal = combine(visible, state);

    return { modal, openModal, closeModal };
};

export type subjectType = 'tag' | 'video' | 'user';

export interface DeleteEmitterModal {
    emitterId?: string;
}

export const deleteEmitterModal = initializeGenericStore<DeleteEmitterModal>({
    emitterId: ''
});

export interface RemoveTrendingModal {
    id?: string;
    subject?: subjectType;
    subjectName?: string;
}

export const removeTrendingModal = initializeGenericStore<RemoveTrendingModal>({
    id: '',
    subject: 'tag',
    subjectName: ''
});

export interface VideoHashtagsEditorModal {
    id: string;
    hashTags: string[];
}

export const videoHashtagsEditorModal = initializeGenericStore<VideoHashtagsEditorModal>({
    id: '',
    hashTags: []
});

export interface CreateVideoProps {
    definedPosition?: number;
}

export const createTrendingVideoModal = initializeGenericStore<CreateVideoProps>({});

export interface UserReportProps {
    id?: string;
}

export const userReportModal = initializeGenericStore<any>({});

export const simpleModal = initializeStoreModal();

export interface RemoveOrBanUserModalProps {
    teamId: string;
}

export const removeOrBanUserModal = initializeGenericStore<RemoveOrBanUserModalProps>({ teamId: '' });

export interface PromotionCreatedCongratsModalProps {
    promotionName?: string;
    promotionId?: string;
}

export const promotionCreatedCongratsModal = initializeGenericStore<PromotionCreatedCongratsModalProps>({
    promotionName: '',
    promotionId: ''
});

export interface ConfirmPromotionActivationModalProps {
    promotionName?: string;
    promotionId?: string;
    onOk: () => void;
}

export const confirmPromotionActivationModal = initializeGenericStore<ConfirmPromotionActivationModalProps>({
    promotionName: '',
    promotionId: '',
    onOk: noop
});

export interface InformationalModalProps {
    infoText: string;
}

export const informationalModal = initializeGenericStore<InformationalModalProps>({
    infoText: ''
});
