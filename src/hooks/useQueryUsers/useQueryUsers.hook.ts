import { useState, useEffect } from "react"
import { getUsersByMatch } from "../../services/userService"
import useDebounce from "../useDebounce/useDebounce.hook"
import { useUserContext } from "../../contexts/UserContext"

type UseQueryUsersProps = {
    limit?: number
}

type UseQueryUsersReturn = {
    queryResults: string[],
    setQuery: (query:string) => void
    clearResults: () => void
}

type UseQueryUsers = (props: UseQueryUsersProps) => UseQueryUsersReturn

export const useQueryUsers:UseQueryUsers = ({limit = 10}) => {
    const [query, setQuery] = useState<string>("")
    const [queryDebounced] = useDebounce<string>(query)
    const [queryResults, setQueryResults] = useState<string[]>([])
    const { user } = useUserContext()

    useEffect(() => {
        if(queryDebounced){
            const matchedUsers = getUsersByMatch(user, queryDebounced)
            const options = matchedUsers.map(u => u.username).slice(0, limit - 1)
            setQueryResults(options)
        }
    }, [queryDebounced, user, limit, setQueryResults])

    const clearResults = () => {
        setQueryResults([])
    }

    return {
        queryResults, 
        setQuery,
        clearResults
    }
}