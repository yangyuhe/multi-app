import React, { useContext, useMemo } from "react";
import { ThemeContext } from "./context";

export function Middle() {

    const { height } = useContext(ThemeContext)
    const random = useMemo(() => {
        return Math.random()
    }, [height])
    return <div>
        {height}px{random}
    </div>
}