export interface PinnedSphereProps {
    top?: number;
    right?: number;
    average?: boolean;
}

export interface ProgressCellSpanProps {
    status?: number;
}

export interface VideoCardEditableFields {
    title?: string;
    subtitle?: string;
    hashTags?: string[];
    curationState?: number;
}

export interface VideoCardEditableChange {
    onChange?: (fields: VideoCardEditableFields) => void;
}

export interface VideoCurateEditableFields {
    curationState: BULLZ.VideoCurationState;
}

export interface VideoCurateEditableChange {
    onChange?: (fields: VideoCurateEditableFields) => void;
}
