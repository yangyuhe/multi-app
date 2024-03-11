import React, { useMemo, useState } from "react"
export const ThemeContext = React.createContext()

export function ThemeContextProvider({ children }) {
    const [value, setValue] = React.useState({
        theme: 'dark',
    })
    const [height, setHeight] = useState(0)

    const val = useMemo(() => ({
        value, setValue, height
    }), [value, height])
    return <ThemeContext.Provider value={val}>
        {children}
    </ThemeContext.Provider>
}