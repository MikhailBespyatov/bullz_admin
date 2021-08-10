import { PopoverLayout } from 'componentsNewDesign/modals/popovers/PopoverLayout';
import {
    ItemSpan,
    ItemWrapper,
    TitleSpan,
    TitleWrapper
} from 'componentsNewDesign/modals/popovers/RolesPopover/styles';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { useModal } from 'hooks/modal';
import React, { FC, MouseEvent as MouseEventReact } from 'react';
import { PopoverType } from 'types/data';
import { Disabled } from 'types/form';

export interface PopoverProps extends Disabled, PopoverType {
    title?: string;
    setSubject: (subject: string) => void;
    subjects: string[];
}

export const RolesPopover: FC<PopoverProps> = ({ children, disabled, title, setSubject, subjects, type = 'top' }) => {
    const { close, ...modal } = useModal();

    const onClickItem = (subject: string) => (e: MouseEventReact<HTMLDivElement>) => {
        e.stopPropagation();
        setSubject(subject);
        close();
    };

    return (
        <PopoverLayout
            {...modal}
            close={close}
            disabled={disabled}
            modalChildren={
                <Column>
                    <TitleWrapper alignCenter justifyCenter>
                        <TitleSpan>{title}</TitleSpan>
                    </TitleWrapper>
                    {subjects.map(subject => (
                        <ItemWrapper key={subject} alignCenter justifyCenter onClick={onClickItem(subject)}>
                            <ItemSpan>{subject}</ItemSpan>
                        </ItemWrapper>
                    ))}
                </Column>
            }
            type={type}
            visibleChildren={children}
        />
    );
};
