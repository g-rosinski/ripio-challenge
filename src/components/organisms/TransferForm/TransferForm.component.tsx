import React from "react"
import { useForm } from "../../../hooks/useForm/useForm.hook"
import { Button, Form } from "../../atoms"
import { TextField, SelectField } from "../../molecules/Fields"
import { TransferFormProps, TransferFormType } from "./TransferForm.types"

export const TransferForm: React.FC<TransferFormProps> = ({
    initialValues,
    currencies,
    editable = true,
    onSubmit,
    validateForm,
}) => {

    const { 
        values, 
        errors, 
        handleOnChangeField, 
        handleOnSubmitForm 
    } = useForm<TransferFormType>({
        initialValues,
        validateForm,
        onSubmit
    })

    return (
        <Form onSubmit={handleOnSubmitForm}>
            <TextField 
                name="receptor"
                label="Destinatario"
                helper="Ingresar mail valido"
                value={values.receptor}
                error={errors.receptor}
                disabled={!editable}
                onChange={handleOnChangeField}
                />
            
            <SelectField 
                name="currency"
                label="Moneda"
                options={currencies}
                onChange={handleOnChangeField}
                disabled={!editable}
            />
            <TextField 
                name="amount"
                label="Importe"
                helper="Ingresar importe valido"
                value={values.amount}
                error={errors.amount}
                onChange={handleOnChangeField}
                disabled={!editable}
            />

            <Button type="submit" disabled={!editable}>Enviar</Button>
        </Form>
    )
}
