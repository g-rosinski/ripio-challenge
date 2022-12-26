import React, { useCallback, useEffect }  from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { TransferForm, TransferFormType } from "../../components/organisms/TransferForm"
import { isEmail, maxValue, required } from "../../shared/validation.rules"
import { CURRENCY_LIST } from "../../mocks/crypto-currencies"
import { RootState, useAppDispatch } from "../../redux/store"
import { newTransfer, setEmiter, setTransfer } from "../../redux/slices/transferSlice"
import { Label, Title } from "../../components/atoms"
import { existUser } from "../../services/userService"
import { BasicPage } from "../../components/layouts/BasicPage"
import { paths } from "../../routers/app.router"
import { useFormValidator } from "../../hooks"
import { useUserContext } from "../../contexts/UserContext"

export const TransferPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { balance } = useSelector((state: RootState) => state.balance)
    const transfer = useSelector((state: RootState) => state.transfer)
    const { validateForm } = useFormValidator<TransferFormType>()
    const { user } = useUserContext()

    useEffect(() => {
        dispatch({type: 'FETCH_USER_BALANCE', payload: user})
        dispatch(newTransfer())
        dispatch(setEmiter(user))        
    }, [dispatch, user])

    const validateTransferForm = useCallback((form: TransferFormType) => {
        const founds = balance[form.currency] | 0
        const errors = validateForm(form, {
            receptor: [ required(), isEmail() ],
            amount: [
                required(),
                maxValue(founds, `No posee fondos suficientes, limite $${founds}`)
            ],
        })

        if(!errors.receptor && form.receptor){
            errors.receptor = !existUser(form.receptor)? 'Destinatario no existe' : ''
        }
        return errors
    },[balance, validateForm])

    const handleOnSubmitForm = (form: TransferFormType) => {
        dispatch(setTransfer({...form, amount: Number(form.amount)}))
        navigate(paths.transferencia_confirmar)
    }

    return (
        <BasicPage>
            <Title>Enviar transferencia</Title>

            {transfer.emiter && <Label>Emisor: {transfer.emiter}</Label>}
            <TransferForm 
                initialValues={{
                    ...transfer, 
                    amount: transfer.amount?.toString() || ''
                }}
                currencies={CURRENCY_LIST}
                onSubmit={handleOnSubmitForm}
                validateForm={validateTransferForm}
            />
            
        </BasicPage>
    )
}

