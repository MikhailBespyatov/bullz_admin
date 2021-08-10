import { Id } from 'types/data';

export interface InitialEditVideoModalProps extends Id {
    setFields: (props: YEAY.UpdateVideoRequest) => void;
    setAdditionalIds: (props: { ownerId: string; primaryProductId: string }) => void;
}
