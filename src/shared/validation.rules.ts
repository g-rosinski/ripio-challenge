import { emailRegex } from "./regexRules"

export type ValidationRule = (value:string) => string | false

export const required = (message?: string):ValidationRule => 
                        (value:string) => 
                        (!value ? (message || "Este campo es requerido") : false)

export const minValue = (min:number, message?: string):ValidationRule => 
                        (value:string) => 
                        (!!value && Number(value) < min ? (message || `Valor mínimo es ${min}`) : false)

export const maxValue = (max:number, message?: string):ValidationRule => 
                        (value:string) => 
                        (!!value && Number(value) > max ? (message || `Valor máximo es ${max}`) : false)

export const matchLength = (length:number, message?: string):ValidationRule => 
                        (value:string) => 
                        (!!value && value.length !== length ? (message || `Valor debe contener ${length} caracteres`) : false)

export const isEmail = (message?: string):ValidationRule => 
                        (value:string) => 
                        (!!value && !value.match(new RegExp(emailRegex)) ? (message || "Valor ingresado no es un email valido") : false)


