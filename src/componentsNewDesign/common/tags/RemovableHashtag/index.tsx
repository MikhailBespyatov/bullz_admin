import closeImg, { ReactComponent as CloseImg } from 'assets/white_close_button.svg';
import { ManagerLayout } from 'components/layouts/RolesLayouts';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { closeImgDiameter } from 'componentsNewDesign/common/tags/RemovableHashtag/constants';
import { Span } from 'componentsNewDesign/common/typography/Span';
import { ClickableWrapper } from 'componentsNewDesign/wrappers/ClicableWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { noop } from 'constants/functions';
import React from 'react';
import { Disabled } from 'types/form';
import { CloseButton, Wrapper } from './styled';
import { HashtagType } from './types';

export interface RemovableHashtagProps extends Disabled, HashtagType {
    subject: string;
    onRemove?: (subject: string) => void;
    text?: string;
    untouchable?: boolean;
}

export const RemovableHashtag = ({
    subject,
    text = subject,
    onRemove = noop,
    untouchable,
    type = 'product',
    ...props
}: RemovableHashtagProps) => (
    <Wrapper {...props}>
        <Span color="rgba(255, 255, 255, 0.7)" fontSize="11px" fontWeight="500" lineHeight="13px">
            &#35;{text}
        </Span>
        {type === 'product' ? (
            <ManagerLayout>
                {!untouchable && (
                    <MarginWrapper marginLeft="8px">
                        <CustomImg
                            pointer
                            height={closeImgDiameter}
                            src={closeImg}
                            width={closeImgDiameter}
                            onClick={() => onRemove(subject)}
                        />
                        <ClickableWrapper>
                            <CloseImg />
                        </ClickableWrapper>
                    </MarginWrapper>
                )}
            </ManagerLayout>
        ) : (
            <>
                {!untouchable && (
                    <MarginWrapper marginLeft="8px">
                        <CloseButton
                            height={closeImgDiameter}
                            width={closeImgDiameter}
                            onClick={() => onRemove(subject)}
                        >
                            <CloseImg />
                        </CloseButton>
                    </MarginWrapper>
                )}
            </>
        )}
    </Wrapper>
);
