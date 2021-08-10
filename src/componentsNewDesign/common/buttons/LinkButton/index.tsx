import linkIcon from 'assets/link_icon.svg';
import { ButtonImg } from 'componentsNewDesign/common/buttons/CopyButton/styles';
import { goToLinkedPage } from 'componentsNewDesign/common/buttons/LinkButton/constants';
import { defaultMongoDBId } from 'constants/defaults/formats';
import React from 'react';

export interface LinkButtonProps {
    id?: string;
    linkRoute: string;
}

export const LinkButton = ({ id, linkRoute }: LinkButtonProps) => {
    const disabled = id === defaultMongoDBId || !id;

    const openLinkInANewTab = () => {
        if (!disabled) {
            goToLinkedPage(linkRoute, id);
        }
    };

    return <ButtonImg pointer disabled={disabled} src={linkIcon} onClick={openLinkInANewTab} />;
};
