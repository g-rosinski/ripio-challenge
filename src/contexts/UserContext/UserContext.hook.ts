import { useContext } from "react"
import { UserContext } from "./UserContext.context"

export const useUserContext = () => {
    const context = useContext(UserContext)
    if(context === undefined){
        throw new Error("useUserContext debe estar dentro de un UserContextProvider")
    }
    return context
}