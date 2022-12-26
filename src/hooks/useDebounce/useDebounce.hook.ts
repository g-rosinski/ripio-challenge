import { useEffect, useState } from "react";

const useDebounce = <T extends string | number>(value: T, delay: number = 300) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return [
        debouncedValue
    ]
}

export default useDebounce;