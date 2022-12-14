import { HoveredCopyButton } from 'componentsNewDesign/common/buttons/CopyButton';
import { ContentText } from 'componentsNewDesign/common/typography/ContentText/styles';
import { Row } from 'componentsNewDesign/wrappers/grid/FlexWrapper';
import { grey13 } from 'constants/styles/colors';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { capitalizeChar } from 'utils/usefulFunctions';

export const Breadcrumb = () => {
    const location = useLocation();
    const locationsArray = location.pathname.split('/');

    const section = capitalizeChar(
        locationsArray[1]
            .split('_')
            .reduce((firstWord, secondWord) => `${capitalizeChar(firstWord)} ${capitalizeChar(secondWord)}`)
    );
    const subsections = locationsArray.filter((_, i) => i > 1);

    return (
        <Row alignCenter>
            {section && <ContentText color={grey13}>{section} /&nbsp;</ContentText>}
            {!!subsections?.length && (
                <>
                    {subsections.map((item, i) => (
                        <ContentText key={i.toString()} padding="0px 4px 0px 0px">
                            {item}
                        </ContentText>
                    ))}
                    <HoveredCopyButton
                        subject={subsections[subsections.length - 1]}
                        success={section.slice(0, -1) + 'ID was copied'}
                    />
                </>
            )}
        </Row>
    );
};
