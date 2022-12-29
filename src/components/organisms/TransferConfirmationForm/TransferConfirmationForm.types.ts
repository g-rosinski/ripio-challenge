import { UseFormProps } from "../../../hooks/useForm/useForm.hook"

export type TransferConfirmationFormType = {
    token:string
}

export type TransferConfirmationFormProps = UseFormProps<TransferConfirmationFormType> & {
    editable?: boolean,
}