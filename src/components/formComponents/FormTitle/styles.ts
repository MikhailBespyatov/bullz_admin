import { marginRight } from 'components/common/tags/Tags/constants';
import { ErrorFormTitleMinHeight } from 'components/formComponents/FormTitle/constants';
import { errorColor } from 'constants/styles/colors';
import { padding } from 'constants/styles/sizes';
import styled from 'styled-components';

export const ErrorFormTitle = styled.span`
    color: ${errorColor};
    margin-right: ${marginRight};
    margin-bottom: ${padding};
    min-height: ${ErrorFormTitleMinHeight};
`;
