import styled from "styled-components";

export const ACContainer = styled.div`
    position: relative;
`

export const ACOptionsContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: .7rem;
    right: .7rem;
    top: 80px;
    z-index: 3;
`

export const ACOptionsList = styled.ul`
    border-radius: 0.375rem;
    border: 1px solid #dee2e6;
    box-shadow: 1px 2px 5px #d0d0d0;
    padding: 0;

    & > li:nth-child(even){
        background-color: #dee2e6;

    }
`

export const ACOption = styled.li`
    background-color: #fff;
    list-style-type: none;
    padding: 0.375rem .7rem;
    cursor: pointer;

    &:hover{
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 .25rem rgba(13,110,253,.25);
    }

    &:focus{
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 .25rem rgba(13,110,253,.25);
    }

`