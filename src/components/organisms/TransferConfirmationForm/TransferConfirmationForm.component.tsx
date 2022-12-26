import React from "react"
import { useForm } from "../../../hooks/useForm/useForm.hook"
import { Button, Form } from "../../atoms"
import { TextField } from "../../molecules/Fields"
import { TransferConfirmationFormProps, TransferConfirmationFormType } from "./TransferConfirmationForm.types"

export const TransferConfirmationForm: React.FC<TransferConfirmationFormProps> = ({
    initialValues,
    onSubmit,
    validateForm,
    editable = true
}) => {
    const { 
        values, 
        errors, 
        handleOnChangeField, 
        handleOnSubmitForm 
    } = useForm<TransferConfirmationFormType>({
        initialValues,
        validateForm,
        onSubmit
    })


    return (
        <Form onSubmit={handleOnSubmitForm}>
            <TextField 
                name="token"
                label="Token"
                helper="Verificar token para confirmar la transferencia"
                value={values.token}
                error={errors.token}
                disabled={!editable}
                onChange={handleOnChangeField}
            />

            <Button type="submit" disabled={!editable}>Verificar</Button>
        </Form>
    )
}
