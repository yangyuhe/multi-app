import * as React from 'react'
import "./counter.css"
import { ThemeContext } from './context'

export default function Counter() {
    const { value } = React.useContext(ThemeContext)
    return <div>{value.theme}</div>
}