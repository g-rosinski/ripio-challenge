import React, { useCallback, useEffect }  from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { paths } from "../../routers/app.router"
import { isEmail, maxValue, required } from "../../shared/validation.rules"
import { currencyFormat } from "../../shared/formatter"
import { BasicPage } from "../../components/layouts/BasicPage"
import { TransferForm, TransferFormType } from "../../components/organisms/TransferForm"
import { Title } from "../../components/atoms"
import { useUserContext } from "../../contexts/UserContext"
import { CURRENCY_LIST } from "../../mocks/crypto-currencies"
import { RootState, useAppDispatch } from "../../redux/store"
import { newTransfer, setTransfer } from "../../redux/slices/transferSlice"
import { existUser } from "../../services/userService"
import { useFormValidator, useQueryUsers } from "../../hooks"

export const TransferPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { balance } = useSelector((state: RootState) => state.balance)
    const transfer = useSelector((state: RootState) => state.transfer)
    const { validateForm } = useFormValidator<TransferFormType>()
    const { queryResults, setQuery, clearResults } = useQueryUsers({})
    const { user } = useUserContext()

    useEffect(() => {
        if(!Object.keys(balance).length){
            dispatch({type: 'FETCH_USER_BALANCE', payload: user})
        }
        dispatch(newTransfer())
    }, [dispatch, user, balance])

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

            <TransferForm 
                initialValues={{
                    ...transfer, 
                    emiter: user,
                    amount: transfer.amount?.toString() || ''
                }}
                currencies={CURRENCY_LIST.map(currency => ({
                    value: currency, 
                    label: `${currency} - Saldo: ${currencyFormat(balance[currency] || 0)}`
                }))}
                receptorOptions={queryResults}
                onQueryReceptor={setQuery}
                onSelectReceptor={() => clearResults()}
                onSubmit={handleOnSubmitForm}
                validateForm={validateTransferForm}
            />
        </BasicPage>
    )
}
