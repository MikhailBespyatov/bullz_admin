import axios from './axios';

export const uploadNewVideo = (formData: FormData, id: string) =>
    axios<YEAY.MessageResponseBase>({
        url: `/media/upload/${id}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
