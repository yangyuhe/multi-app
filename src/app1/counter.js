import * as React from 'react'
import "./counter.css"
import { ThemeContext } from './context'
import useSWR from 'swr'
import { fetcher } from './fetcher'

export default function Counter() {
    const { data, error, isLoading } = useSWR('/api/user', fetcher)
    return <div>Counter:{isLoading ? 'loading' : data}</div>
}