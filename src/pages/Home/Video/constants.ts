export const title = 'Video page';

export const notFoundMessage = 'There is not such video';
export const topicNotFoundMessage = 'There is not such primary topic';
export const userNotFoundMessage = 'There is not such user';

export const videoWrapperWidth = '300px';
export const videoWrapperHeight = '200px';

export enum InfoTabs {
    Video,
    Product,
    User,
    Statistics,
    WomVideo
}
export const curatorTabs = ['Video Info', 'Topic Info'];
export const otherTabs = [...curatorTabs, 'User info'];
export const administratorsTabs = [...otherTabs, 'Statistics Info', 'Wom Video Info'];

export const deleteButtonText = (isVideoTab: boolean) => `Delete ${isVideoTab ? 'Video' : 'Topic'}`;
