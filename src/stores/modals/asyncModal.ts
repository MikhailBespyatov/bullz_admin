import history from 'browserHistory';
import { createAffiliateLinkSuccessMessage } from 'components/modals/formModals/CreateAffiliateLinkModal/constants';
import { uploadNewVideoSuccessMessage } from 'components/modals/formModals/UploadVideoModal/constants';
import { curateVideoSuccessMessage } from 'components/modals/formModals/VideoCurateModal/constants';
import { uploadProductImageSuccessMessage } from 'componentsNewDesign/modals/formModals/products/ProductImageEditorModal/constants';
import { uploadPromotionImageSuccessMessage } from 'componentsNewDesign/modals/popovers/marketingTools/UploadPromotionImgPopover/constants';
import { validationReasons } from 'constants/defaults/videos';
import { noop } from 'constants/functions';
import { asyncError, editSuccessMessage } from 'constants/notifications';
import { marketingToolsLink } from 'constants/routes';
import { combine, createEffect, createEvent, restore } from 'effector';
import { API } from 'services';
import { message } from 'stores/alerts';
import { initializeEffectFailDataWatch } from 'stores/initialize/initialize.effect.failData.watch';
import { initializeLoadingStore } from 'stores/initialize/initialize.loading.store';
import { initializeToggleStore } from 'stores/initialize/initialize.toggle.store';
import { affiliateLinksEffects } from 'stores/products/affiliateLinks';
import { productsEffects, productsStores } from 'stores/products/products';
import { selectProductsEvents } from 'stores/products/selectProducts';
import { teamsStores } from 'stores/team';
import { usersEffects } from 'stores/users/users';
import { videosEvents, videosStores } from 'stores/videos/videos';
import { InitialEditVideoModalProps } from 'types/defaults';
import {
    AsyncModal,
    ChangeAffiliateLinkModalProps,
    ChangeDefaultAffiliateLinkModalProps,
    CreateAffiliateLinkModalProps,
    CreateProductAsPrimaryProps,
    CurateVideoModalProps,
    EditProductModalProps,
    EditTeamModalProps,
    EditVideoModalProps,
    UploadNewVideoModalProps,
    UploadProductImageModalProps,
    UploadPromotionImageModalProps
} from 'types/modals';

const getInitialVideoEditData = createEffect({
    handler: async ({ setFields = noop, setAdditionalIds = noop, id }: InitialEditVideoModalProps) => {
        const data = await API.adminVideos.getCardById({ id: id });
        setAdditionalIds({
            ownerId: data.ownerId || '',
            primaryProductId: data.primaryProductId || ''
        });
        const editableData = {
            title: data?.title || '',
            subtitle: data?.subtitle || '',
            hashTags: data?.hashTags || []
        };

        setFields(editableData);
    }
});

const initialLoading = initializeLoadingStore([getInitialVideoEditData]);

const editVideoInfo = createEffect({
    handler: async ({ onChange = noop, ...values }: EditVideoModalProps) => {
        const {
            ownerId,
            facilitatorId,
            title,
            subtitle,
            primaryProductId,
            secondaryProductIds,
            audioLanguages,
            hashTags,
            isDeleted,
            validation
        } = videosStores.editInfoItem.getState();

        await API.adminVideos.editVideoInfo({
            ownerId,
            facilitatorId,
            title: title || '',
            subtitle: subtitle || '',
            primaryProductId,
            secondaryProductIds: secondaryProductIds || [],
            audioLanguages: audioLanguages || [],
            hashTags: hashTags || [],
            isDeleted,
            videoCurationState: validation?.yeay?.curationState,
            ...values
        });

        onChange({
            title: values.title || '',
            subtitle: values.subtitle || '',
            hashTags: values.hashTags || []
        });

        message.success(editSuccessMessage);
    }
});

const uploadProductImg = createEffect({
    handler: async ({ onChange = noop, formData, id, url }: UploadProductImageModalProps) => {
        await API.manageProducts.uploadProductImg(formData, id);

        onChange({
            imageUrl: url
        });

        message.success(uploadProductImageSuccessMessage);
    }
});

const uploadPromotionImg = createEffect({
    handler: async ({ onChange = noop, formData, id, url }: UploadPromotionImageModalProps) => {
        await API.promotions.uploadPromotionImg(formData, id);

        onChange({
            imageUrl: url
        });

        history.push(marketingToolsLink + '/' + id);
        message.success(uploadPromotionImageSuccessMessage);
    }
});

const uploadNewVideo = createEffect({
    handler: async ({ formData, data }: UploadNewVideoModalProps) => {
        const { videoUploadId } = await API.video.createNewVideo(data);
        await API.media.uploadNewVideo(formData, videoUploadId || '');
        videosEvents.invokeGetItems();

        message.success(uploadNewVideoSuccessMessage);
    }
});

const createAffiliateLink = createEffect({
    handler: async (values: CreateAffiliateLinkModalProps) => {
        await API.curation.createAffiliateLink(values);

        affiliateLinksEffects.getItemsByProductId(values?.productId || '');
        message.success(createAffiliateLinkSuccessMessage);
    }
});

const changeAffiliateLink = createEffect({
    handler: async ({ i, onChange = noop, ...values }: ChangeAffiliateLinkModalProps) => {
        await API.curation.createAffiliateLink(values);

        onChange(i, values?.url || '');
        message.success(createAffiliateLinkSuccessMessage);
    }
});

const changeDefaultAffiliateLink = createEffect({
    handler: async ({ onChange = noop, ...values }: ChangeDefaultAffiliateLinkModalProps) => {
        await API.curation.createAffiliateLink({ ...values, isDefault: true });

        onChange();
        message.success(createAffiliateLinkSuccessMessage);
    }
});

const curateVideo = createEffect({
    handler: async ({ onChange = noop, ...values }: CurateVideoModalProps) => {
        await API.curation.curate({
            ...values,
            isApproved: values.reason === validationReasons.None ? true : false
        });

        onChange({
            curationState:
                values.reason === validationReasons.None ? validationReasons.Accepted : validationReasons.Rejected
        });

        message.success(curateVideoSuccessMessage);
    }
});

const editProductInfo = createEffect({
    handler: async ({ onChange = noop, ...values }: EditProductModalProps) => {
        const {
            name,
            // description,
            // brand,
            tags,
            link
            // color,
            // features,
            // category,
            //brandImageUrl,
            // primaryImageId
        } = productsStores.editInfoItem.getState();

        const response = await API.manageProducts.editProductInfo({
            name: name || '',
            // description: description || '',
            // brand: brand || '',
            tags: tags || [],
            link: link || '',
            // color: color || '',
            // features: features || [],
            // category: category || [],
            // hashTags: hashTags || [],
            //brandImageUrl: brandImageUrl || '',
            // primaryImageId: primaryImageId || '',
            ...values
        });

        onChange({
            name: response.name || '',
            //TODO: Fix it when "product/" will be done
            // @ts-ignore Back is broken
            // description: values.description || '',
            tags: response.tags || []
        });

        message.success(editSuccessMessage);
    }
});

const editTeamInfo = createEffect({
    handler: async ({ onChange = noop, ...values }: EditTeamModalProps) => {
        const { name, urlName } = teamsStores.editInfoItem.getState();
        try {
            // TODO: await
            const updateTeamResponse = await API.team.updateTeam({
                name: name || '',
                urlName: urlName || '',
                // adminIds: ['5fcaebc4ea5401178bba58e4'],
                ...values
            });

            onChange({
                name: values.name || '',
                urlName: values.urlName || ''
            });

            message.success(editSuccessMessage);
            //console.log('updateTeamResponse', updateTeamResponse);

            return updateTeamResponse;
        } catch (error) {
            const errorMessage = error?.data?.message;
            message.error(errorMessage || asyncError);

            return {
                isSuccess: false
            };
        }
    }
});

const createProductAndSetAsPrimary = createEffect({
    handler: async ({ videoId, ...values }: CreateProductAsPrimaryProps) => {
        const { id } = await API.manageProducts.createProduct(values);
        await editVideoInfo({
            id: videoId || '',
            primaryProductId: id
        });
        productsEffects.loadSingleItemById(id || '');
        videosEvents.setSingleItem({ ...videosStores.video.getState(), primaryProductId: id });
        selectProductsEvents.setVisibleToFalse();

        message.success('You successfully updated primary product of video');
    }
});

const loading = initializeLoadingStore([
    editVideoInfo,
    uploadProductImg,
    uploadPromotionImg,
    uploadNewVideo,
    createAffiliateLink,
    changeAffiliateLink,
    changeDefaultAffiliateLink,
    curateVideo,
    editProductInfo,
    editTeamInfo,
    createProductAndSetAsPrimary,
    usersEffects.deleteUsersById
]);

initializeEffectFailDataWatch([
    getInitialVideoEditData,
    editVideoInfo,
    uploadProductImg,
    uploadPromotionImg,
    uploadNewVideo,
    createAffiliateLink,
    changeAffiliateLink,
    changeDefaultAffiliateLink,
    curateVideo,
    editProductInfo,
    editTeamInfo,
    createProductAndSetAsPrimary,
    usersEffects.deleteUsersById
]);

const [asyncModalLoading, updateAsyncModalLoading] = initializeToggleStore();

const initialAsyncModal: AsyncModal = { visible: false, title: '', content: '', subject: '' };

const openAsyncModal = createEvent<AsyncModal>();
const closeAsyncModal = createEvent();

const asyncModal = restore<AsyncModal>(openAsyncModal, initialAsyncModal).on(closeAsyncModal, () => initialAsyncModal);

const asyncModalStore = combine(loading, asyncModal);

export const modalEvents = { openAsyncModal, closeAsyncModal, updateAsyncModalLoading };
export const modalEffects = {
    editVideoInfo,
    editProductInfo,
    editTeamInfo,
    getInitialVideoEditData,
    curateVideo,
    createAffiliateLink,
    changeAffiliateLink,
    uploadProductImg,
    uploadPromotionImg,
    uploadNewVideo,
    createProductAndSetAsPrimary,
    changeDefaultAffiliateLink
};
export const modalStores = { asyncModalStore, initialLoading, loading, asyncModalLoading };
