import React, { useContext } from "react";
import { ThemeContext } from "./context";


function useSelector(context, fn) {
    const
}
export function Middle({ children }) {

    const { height } = useContext(ThemeContext)
    console.log('height:', height)
    return <div>
        {height}px
    </div>
}