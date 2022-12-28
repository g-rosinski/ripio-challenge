import React from "react"
import { useForm } from "../../../hooks/useForm/useForm.hook"
import { Button, Form } from "../../atoms"
import { TextField, SelectField } from "../../molecules/Fields"
import { CurrencySection } from "./TransferForm.styles"
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
                name="emiter"
                label="Emisor"
                value={values.emiter}
                onChange={handleOnChangeField}
                disabled
                readOnly
            />

            <TextField 
                name="receptor"
                label="Destinatario"
                helper="Ingresar el mail del contacto"
                value={values.receptor}
                error={errors.receptor}
                disabled={!editable}
                onChange={handleOnChangeField}
            />
            
            <CurrencySection>
                
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
                    helper="Ingresar un importe a transferir."
                    value={values.amount}
                    error={errors.amount}
                    onChange={handleOnChangeField}
                    disabled={!editable}
                />
            </CurrencySection>

            <Button type="submit" disabled={!editable}>Transferir</Button>
        </Form>
    )
}
