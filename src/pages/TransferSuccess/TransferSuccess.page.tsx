import React  from "react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { Button, Title } from "../../components/atoms"
import BasicPage from "../../components/layouts/BasicPage/BasicPage.component"
import { RootState } from "../../redux/store"
import { paths } from "../../routers/app.router"
import { TransferTicket } from "../../components/organisms/TransferTicket"


export const TransferSuccessPage = () => {
    const navigate = useNavigate()
    const { history } = useSelector((state: RootState) => state.transferHistory)
    const lastTransfer = history[history.length - 1]

    const handleOnClickNewTransfer = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate(paths.transferencia)
    }

    if(!lastTransfer.transfer_date){
        return <Navigate to={paths.transferencia} replace />
    }
    
    return (
        <BasicPage>
            <Title>Transferencia exitosa!</Title>
            <TransferTicket {...lastTransfer} />
            <Button onClick={handleOnClickNewTransfer}>Nueva transferencia</Button>
        </BasicPage>
    )
}
