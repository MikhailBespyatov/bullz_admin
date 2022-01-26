import {
    AffiliateLinksEditableChange,
    DefaultAffiliateLinkEditableChange
} from 'components/common/tables/AffiliateLinksTable/types';
import { VideoCurateEditableChange } from 'components/layouts/cards/videos/VideoCard/types';
import { Id, Index, StrictTitle } from 'types/data';
import {
    ProductCardEditableChange,
    PromotionCardImageUrlChange,
    TeamCardEditableChange,
    VideoCardEditableChange
} from 'types/form';
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

export interface EditVideoModalProps extends VideoCardEditableChange, BULLZ.UpdateVideoRequest {}
export interface CurateVideoModalProps extends VideoCurateEditableChange, BULLZ.SubmitVideoCurationRequest {}

export interface EditProductModalProps extends ProductCardEditableChange, BULLZ.UpdateTopicRequest {}
export interface EditTeamModalProps extends TeamCardEditableChange, BULLZ.GetTeamResponse {}
export interface CreateAffiliateLinkModalProps extends BULLZ.CreateManagedProductAffiliateLinkRequest {}
export interface ChangeDefaultAffiliateLinkModalProps
    extends BULLZ.CreateManagedProductAffiliateLinkRequest,
        DefaultAffiliateLinkEditableChange {}
export interface ChangeAffiliateLinkModalProps
    extends BULLZ.CreateManagedProductAffiliateLinkRequest,
        Index,
        AffiliateLinksEditableChange {}

export interface UploadProductImageModalProps extends ProductCardEditableChange, Id {
    formData: FormData;
    url: string;
}

export interface UploadPromotionImageModalProps extends PromotionCardImageUrlChange, Id {
    formData: FormData;
    url: string;
}

export interface UploadNewVideoModalProps {
    formData: FormData;
    data: BULLZ.CreateVideoRequest;
}

export interface CreateProductAsPrimaryProps extends BULLZ.CreateTopicRequest {
    videoId: string;
    setSecondVisible?: (visible: boolean) => void;
}

export interface RemoveClick {
    onRemove: noop;
}
export interface DeleteOrBlockUserModalProps {
    visible?: boolean;
    action?: 'delete' | 'block';
    userId: string;
    username: string;
    reasonsList: Array<{
        value: BULLZ.UserDisablingReason;
        data: string;
    }>;
    onOk?: OkHandlerType;
}

export interface StatusModalProps {
    visible?: boolean;
    status?: 'inProcess' | 'success';
    //subject: SubjectType;
    title: string;
    content: string;
    buttonText?: string;
    onClick?: noop;
    onCloseClick?: noop;
}
