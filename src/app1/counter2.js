import * as React from 'react'
import "./counter.css"
import printMe from './print'
import { ThemeContext } from './context'
import useSWR from 'swr'
import { fetcher } from './fetcher'

export default function Counter2() {
    const { data, error, isLoading } = useSWR('/api/user', fetcher)
    console.log(data, error)
    return <div>Counter2:{isLoading ? 'loading' : data}</div>
}


if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}