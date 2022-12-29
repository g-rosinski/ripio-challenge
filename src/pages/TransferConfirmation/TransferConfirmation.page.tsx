import React  from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { Title } from "../../components/atoms"
import BasicPage from "../../components/layouts/BasicPage/BasicPage.component"
import { TransferConfirmationForm, TransferConfirmationFormType } from "../../components/organisms/TransferConfirmationForm"
import { useFormValidator } from "../../hooks"
import { RootState } from "../../redux/store"
import { paths } from "../../routers/app.router"
import { checkToken } from "../../services/tokenService"
import { matchLength, required } from "../../shared/validation.rules"

export const TransferConfirmationPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { validateForm } = useFormValidator<TransferConfirmationFormType>()
    const { amount, ...transfer } = useSelector((state: RootState) => state.transfer)

    const validateConfirmationForm = (form: TransferConfirmationFormType) => {
        const errors = validateForm(form, {
            token: [ required(), matchLength(6) ]
        })

        if(!errors.token && form.token){
            errors.token = !checkToken(form.token)? "Token ingresado no es valido" : ""
        }
        return errors
    }

    const handleOnSubmitForm = (form: TransferConfirmationFormType) => {
        dispatch({type: 'TRANSFER_REQUESTED', payload: {
            ...transfer,
            amount: amount!
        }})
        navigate(paths.transferencia_exitosa)
    }

    if(!amount){
        return <Navigate to={paths.transferencia} replace />
    }

    return (
        <BasicPage>
            <Title>Confirmar transferencia</Title>
            <TransferConfirmationForm
                initialValues={{token: ''}}
                onSubmit={handleOnSubmitForm}
                validateForm={validateConfirmationForm}
            />
        </BasicPage>
    )
}
