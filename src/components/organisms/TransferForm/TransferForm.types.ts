import { UseFormProps } from "../../../hooks/useForm/useForm.hook"

export type TransferFormType = {
    emiter:string,
    receptor:string,
    currency: string, 
    amount: string
}

export type TransferFormProps = UseFormProps<TransferFormType> & {
    currencies: string[]
    editable?: boolean,
}