import { format } from "fecha"
import React  from "react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { Button, Label, Title } from "../../components/atoms"
import BasicPage from "../../components/layouts/BasicPage/BasicPage.component"
import { RootState } from "../../redux/store"
import { paths } from "../../routers/app.router"


export const TransferSuccessPage = () => {
    const navigate = useNavigate()
    const { history } = useSelector((state: RootState) => state.transferHistory)
    const { emiter, receptor, currency, amount, transfer_date, status } = history[history.length - 1]

    const handleOnClickNewTransfer = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate(paths.transferencia)
    }

    if(!transfer_date){
        return <Navigate to={paths.transferencia} replace />
    }
    
    return (
        <BasicPage>
            <Title>Transferencia exitosa!</Title>
            <Label>Se transfirió {currency} {amount}</Label>
            <Label>De: {emiter}</Label>
            <Label>A: {receptor}</Label>
            <Label>Fecha: {format(transfer_date!,'DD/MM/YYYY  HH:mm')}</Label>
            <Label>Status: {status}</Label>
            <Button onClick={handleOnClickNewTransfer}>Nueva transferencia</Button>
        </BasicPage>
    )
}
