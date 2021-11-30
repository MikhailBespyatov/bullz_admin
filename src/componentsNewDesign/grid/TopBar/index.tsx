import { useMediaQuery } from '@material-ui/core';
import { ItemActiveBorder, ItemSpan, Wrapper } from 'componentsNewDesign/grid/TopBar/styles';
import { Column } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { MarginWrapper } from 'componentsNewDesign/wrappers/grid/MarginWrapper';
import { hoverGrey3 } from 'constants/styles/colors';
import { xs } from 'constants/styles/sizes';
import React, { useEffect, useState } from 'react';

export interface TopBarProps extends BULLZ.AdminGetVideoResponse, BULLZ.BullzValidationInfo {
    content: string[];
    onChange: (itemName: string) => void;
    defaultActiveItem?: string;
}

export const TopBar = ({ content, onChange, defaultActiveItem = content[0] }: TopBarProps) => {
    const [activeItemName, setActiveItemName] = useState(defaultActiveItem);
    const isMobile = useMediaQuery(`(max-width: ${xs})`);

    const onChangeItem = (nameItem: string) => {
        setActiveItemName(nameItem);
        onChange(nameItem);
    };

    useEffect(() => setActiveItemName(defaultActiveItem), [defaultActiveItem]);

    // console.log('content', content);

    return (
        <Wrapper noWrap={isMobile}>
            {content.map(item => {
                const isActive = item === activeItemName;

                return (
                    <MarginWrapper key={item} marginRight="40px">
                        <Column>
                            <MarginWrapper marginBottom="16px" marginTop="16px">
                                <ItemSpan
                                    pointer
                                    opacity={isActive ? 1 : 0.2}
                                    textHover={hoverGrey3}
                                    onClick={() => onChangeItem(item)}
                                >
                                    {item}
                                </ItemSpan>
                            </MarginWrapper>
                            {isActive && <ItemActiveBorder />}
                        </Column>
                    </MarginWrapper>
                );
            })}
        </Wrapper>
    );
};
