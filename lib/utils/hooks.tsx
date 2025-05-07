import {useEffect, useState} from "react";

export function useTimeSeconds({intervalSeconds}: { intervalSeconds: number }) {
    const [time, setTime] = useState(Date.now() / 1000)

    useEffect(() => {
        const s = setInterval(
            () => setTime(Date.now() / 1000),
            intervalSeconds * 1000)

        return () => clearInterval(s)
    }, [intervalSeconds])

    return time
}