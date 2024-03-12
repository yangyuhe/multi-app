import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createContext } from "use-context-selector";
export const ThemeContext = React.createContext()


export function ThemeContextProvider({ children }) {
    const [value, setValue] = React.useState({
        theme: 'dark',
        height: 10
    })

    const theme = useMemo(() => {
        return value.theme;
    }, [value])
    const height = useMemo(() => {
        return value.height;
    }, [value])


    return <ThemeContext.Provider value={{ setValue, theme, height }}>
        {children}
    </ThemeContext.Provider>
}

export const EffectThemeContext = createContext(null)

export function EffectThemeContextProvider({ children }) {
    const res = React.useState({
        theme: 'dark',
        height: 10
    })


    return <EffectThemeContext.Provider value={res}>
        {children}
    </EffectThemeContext.Provider>
}