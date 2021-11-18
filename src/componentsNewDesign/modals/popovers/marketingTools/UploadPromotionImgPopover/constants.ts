//@ts-ignore
export const getBase64 = (file: UploadFile<any>) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

export const uploadPromotionImageSuccessMessage = 'You successfully uploaded an image';
