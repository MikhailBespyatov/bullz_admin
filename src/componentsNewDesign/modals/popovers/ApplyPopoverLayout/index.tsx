import closeIcon from 'assets/close.svg';
import { CardButton } from 'componentsNewDesign/common/buttons/CardButton';
import { HorizontalLine } from 'componentsNewDesign/common/dividers/HorizontalLine';
import { CustomImg } from 'componentsNewDesign/common/imgComponents/CustomImg';
import { BooleanCheckbox } from 'componentsNewDesign/common/inputs/Checkbox';
import { PopoverLayout } from 'componentsNewDesign/modals/popovers/PopoverLayout';
import { AbsoluteWrapper } from 'componentsNewDesign/wrappers/grid/AbsoluteWrapper';
import { FlexGrow, Section } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { closeIconDiameter } from 'componentsNewDesign/wrappers/ModalWrapper/constant';
import { grey10, grey27 } from 'constants/styles/colors';
import { useModal } from 'hooks/modal';
import React, { FC, useState } from 'react';
import { Loading, PopoverType, Title } from 'types/data';
import { Disabled } from 'types/form';
import { MinSizes } from 'types/styles';
import { popoverZIndex } from './constants';
import { AgreementSpan, ContentWrapper, TitleSpan, TitleWrapper } from './styles';

export interface ApplyPopoverLayoutProps
    extends PopoverType,
        Pick<Title, 'title'>,
        Disabled,
        Loading,
        Pick<MinSizes, 'minWidth'> {
    onApply: () => Promise<void>;
    isApplyAllowed?: boolean;
    modalChildren: JSX.Element | null;
}

export const ApplyPopoverLayout: FC<ApplyPopoverLayoutProps> = ({
    type = 'top',
    children,
    title,
    disabled,
    onApply,
    isApplyAllowed = true,
    modalChildren,
    loading,
    minWidth
}) => {
    const modal = useModal();
    const [checked, setChecked] = useState(false);

    const applyClick = async () => {
        if (checked) {
            await onApply();
            modal.close();
            setChecked(false);
        }
    };

    return (
        <PopoverLayout
            {...modal}
            disabled={disabled}
            minWidth={minWidth}
            modalChildren={
                <>
                    <TitleWrapper alignCenter justifyCenter>
                        <TitleSpan>{title}</TitleSpan>
                    </TitleWrapper>
                    <AbsoluteWrapper right="15px" top="15px" zIndex={popoverZIndex.toString()}>
                        <CustomImg
                            pointer
                            height={closeIconDiameter}
                            src={closeIcon}
                            width={closeIconDiameter}
                            onClick={() => modal.close()}
                        />
                    </AbsoluteWrapper>
                    <MarginWrapper marginBottom="10px">
                        <HorizontalLine background={grey10} opacity={0.1} />
                    </MarginWrapper>
                    <ContentWrapper>
                        <FlexGrow flexGrow="1">{modalChildren}</FlexGrow>
                        <Section>
                            <Section alignCenter justifyCenter noWrap marginBottom="10px">
                                <MarginWrapper marginRight="12px">
                                    <BooleanCheckbox defaultChecked={checked} onChange={setChecked} />
                                </MarginWrapper>
                                <AgreementSpan>Are you sure?</AgreementSpan>
                            </Section>
                            <Section justifyCenter zIndex="31">
                                <CardButton
                                    background={grey27}
                                    disabled={!checked || loading || !isApplyAllowed}
                                    onClick={applyClick}
                                >
                                    {loading ? 'Loading...' : 'Apply'}
                                </CardButton>
                            </Section>
                        </Section>
                    </ContentWrapper>
                </>
            }
            type={type}
            visibleChildren={children}
        />
    );
};
