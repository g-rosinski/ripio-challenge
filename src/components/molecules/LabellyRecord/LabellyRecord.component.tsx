import React from "react"
import { SpaceLabelBetweenWrapper } from "./LabellyRecord.styles"
import { DividerHorizontal, Label } from "../../atoms"

type LabellyRecordProps = {
    label: string,
    value: string,
    displayDivider?: boolean
}

export const LabellyRecord: React.FC<LabellyRecordProps> = ({
    label,
    value,
    displayDivider = true
}) => (
    <>
        <SpaceLabelBetweenWrapper>
            <Label>{label}:</Label>
            <Label>{value}</Label>
        </SpaceLabelBetweenWrapper>
        {displayDivider && <DividerHorizontal role="presentation" />}
    </>
)