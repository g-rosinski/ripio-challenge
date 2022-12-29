import styled from "styled-components";
import { HelperStatus } from "../../../hooks/useInputHelper/useInputHelper.hook";

interface HelperTextProps {
    status?:  HelperStatus
}

export const HelperText = styled.p<HelperTextProps>`
    width: 100%;
    font-size: 12px;
    line-height: 14px;
    color: grey;

    ${({status}) => status === 'error' && `
        color: red;
    `}

    ${({status}) => status === 'success' && `
        color: green;
    `}
`