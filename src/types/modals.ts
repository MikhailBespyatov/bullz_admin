import {
    AffiliateLinksEditableChange,
    DefaultAffiliateLinkEditableChange
} from 'components/common/tables/AffiliateLinksTable/types';
import { VideoCurateEditableChange } from 'components/layouts/cards/videos/VideoCard/types';
import { Id, Index, StrictTitle } from 'types/data';
import { ProductCardEditableChange, TeamCardEditableChange, VideoCardEditableChange } from 'types/form';
import { Visibility } from 'types/styles';
import { noop, OkHandlerType, SubjectType } from 'types/types';

export interface AsyncModal extends StrictTitle {
    visible: boolean;
    content: string;
    subject: SubjectType;
    onOk?: OkHandlerType;
    modalHeight?: string;
}

export interface UseModal extends Visibility {
    close?: noop;
}

export interface EditVideoModalProps extends VideoCardEditableChange, YEAY.UpdateVideoRequest {}
export interface CurateVideoModalProps extends VideoCurateEditableChange, YEAY.SubmitVideoCurationRequest {}

export interface EditProductModalProps extends ProductCardEditableChange, YEAY.UpdateProductRequest {}
export interface EditTeamModalProps extends TeamCardEditableChange, YEAY.GetTeamResponse {}
export interface CreateAffiliateLinkModalProps extends YEAY.CreateManagedProductAffiliateLinkRequest {}
export interface ChangeDefaultAffiliateLinkModalProps
    extends YEAY.CreateManagedProductAffiliateLinkRequest,
        DefaultAffiliateLinkEditableChange {}
export interface ChangeAffiliateLinkModalProps
    extends YEAY.CreateManagedProductAffiliateLinkRequest,
        Index,
        AffiliateLinksEditableChange {}

export interface UploadProductImageModalProps extends ProductCardEditableChange, Id {
    formData: FormData;
    url: string;
}

export interface UploadNewVideoModalProps {
    formData: FormData;
    data: YEAY.CreateVideoRequest;
}

export interface CreateProductAsPrimaryProps extends YEAY.CreateProductRequest {
    videoId: string;
    setSecondVisible?: (visible: boolean) => void;
}

export interface RemoveClick {
    onRemove: noop;
}
