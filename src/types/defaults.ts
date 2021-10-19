import { Id } from 'types/data';

export interface InitialEditVideoModalProps extends Id {
    setFields: (props: BULLZ.UpdateVideoRequest) => void;
    setAdditionalIds: (props: { ownerId: string; primaryProductId: string }) => void;
}
