import { useMemo } from "react";

export type HelperStatus = 'info' | 'success' | 'error'

type UseInputHelperProps = {
    info: string,
    error?: string,
    success?: string,
    disabled?: boolean,
    readOnly?: boolean
} 

type UseInputHelperReturn = {
    interactive: boolean,
    displayHelperText: boolean
    helperText: string,
    helperStatus: HelperStatus,
} 

type UseInputHelperHook = (props: UseInputHelperProps) => UseInputHelperReturn

const useInputHelper: UseInputHelperHook = ({
    error,
    success,
    info,
    disabled = false,
    readOnly = false
}) => {
    return useMemo(() => {
        const interactive = !disabled && !readOnly;
        const helperText = error || success || info || ""
        const displayHelperText = interactive && !!helperText
        let helperStatus: HelperStatus = 'info'
        switch(helperText){
            case error: helperStatus = 'error'; break;
            case success: helperStatus = 'success'; break;
        }
        return ({
            interactive,
            displayHelperText,
            helperText,
            helperStatus,
        })
    }, [error, success, info, disabled, readOnly])
}

export default useInputHelper