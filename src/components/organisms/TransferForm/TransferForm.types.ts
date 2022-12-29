import { UseFormProps } from "../../../hooks/useForm/useForm.hook"
import { SelectOption } from "../../molecules/Fields/SelectField/SelectField.component"

export type TransferFormType = {
    emiter:string,
    receptor:string,
    currency: string, 
    amount: string
}

export type TransferFormProps = UseFormProps<TransferFormType> & {
    currencies: SelectOption[],
    receptorOptions: string[] 
    onQueryReceptor: (username:string) => void,
    onSelectReceptor: (username:string) => void,
    editable?: boolean,
}