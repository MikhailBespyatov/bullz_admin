import { grey23 } from 'constants/styles/colors';
import styled from 'styled-components';

export const CheckboxWrapper = styled.div`
    width: 170px;
    height: 59px;
    border-radius: 8px;

    :hover {
        background-color: ${grey23};
        transition: background-color 0.3s;
    }
`;
