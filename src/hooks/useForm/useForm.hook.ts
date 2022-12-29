import { useState, ChangeEvent, useCallback, FormEvent } from "react"

export type UseFormProps<Form extends {}> = {
    initialValues: Form,
    validateForm: (form: Form) => {[key in keyof Form]?: string},
    onSubmit: (form: Form) => void,
}

type UseFormReturn<Form extends {}> = {
    values: Form,
    errors: {[key in keyof Form]?: string},
    handleOnChangeField: (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    handleOnSubmitForm: (e: FormEvent) => void,
    changeFieldValue: (field: keyof Form, value: string) => void
}


export const useForm = <F extends {}>({initialValues, validateForm, onSubmit}: UseFormProps<F>):UseFormReturn<F> => {
    const [values, setValues] = useState<F>(initialValues)
    const [errors, setErrors] = useState<{[key in keyof F]?: string}>({})

    const changeFieldValue = useCallback((field: keyof F, value: string) => {
        setValues({
            ...values,
            [field]: value
        })
    }, [values, setValues])

    const handleOnChangeField = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        changeFieldValue(e.target.name as keyof F, e.target.value)
    }

    const handleOnSubmitForm = useCallback((e: FormEvent) => {
        e.preventDefault()
        const validatedForm = validateForm(values)
        const formErrors = Object.values(validatedForm).filter(err => err)
        if(formErrors.length > 0){
            setErrors(validatedForm)
        }else{
            onSubmit(values)
        }
    }, [values, validateForm, onSubmit, setErrors])

    return {
        values,
        errors,
        changeFieldValue,
        handleOnChangeField,
        handleOnSubmitForm
    }
}