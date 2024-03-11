import * as React from 'react'
import "./counter.css"
import printMe from './print'
import { ThemeContext } from './context'

export default function Counter2() {
    const { setValue } = React.useContext(ThemeContext)
    return <button onClick={() => setValue(val => ({ ...val, theme: val.theme === 'dark' ? 'light' : "dark" }))}>
        changeTheme
    </button>
}


if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}