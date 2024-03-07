import * as React from 'react'
import "./counter.css"

export default function Counter() {
    const [c, setC] = React.useState(0)
    return <div className='bg'>11{c}<button onClick={() => setC(c => c + 1)}>addxy</button></div>
}