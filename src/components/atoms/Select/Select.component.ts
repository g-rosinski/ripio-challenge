import styled from "styled-components";

export const Select = styled.select`
    border: 1px solid #dee2e6;
    background-color: #fff;
    color: #212529;
    min-width: 100px;
    width: 100%;
    padding: .575rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    border-radius: .375rem;

    &:focus {
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 .25rem rgba(13,110,253,.25);
    }

    &:disabled {
        background-color: #e9ecef;
        opacity: 1;
    }

`