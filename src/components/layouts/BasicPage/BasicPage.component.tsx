import React  from "react"
import { PageContainer } from "./BasicPage.styles"

interface BasicPageProps {
    children: React.ReactNode
}

export const BasicPage: React.FC<BasicPageProps> = ({children}) => {
    return (
        <PageContainer>
            { children }
        </PageContainer>
    )
}

export default BasicPage