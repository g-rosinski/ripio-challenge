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
    onQueryReceptor: (username:string) => void,
    receptorOptions: string[] 
    editable?: boolean,
}