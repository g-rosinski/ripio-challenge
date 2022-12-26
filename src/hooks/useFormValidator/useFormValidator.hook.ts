import { ValidationRule } from "../../shared/validation.rules"


export const useFormValidator = <Form extends {}>() => {
    type Fields = keyof Form

    const validate = (value: any, validations: ValidationRule[]): string => {
        for(let validation of validations){
            const error = validation(value)
            if(!!error){
                return error
            }
        }
        return ""
    }

    const validateForm= (values:Form, validations: {[Field in Fields]?: ValidationRule[]}) => {
        const errors = {} as {[Field in Fields]: string}
        for(const field in validations){
            if(!!validations[field] && validations[field]?.length){
                errors[field] = validate(values[field], validations[field]!)
            }
        }
        return errors
    }

    return {
        validateForm
    }
}