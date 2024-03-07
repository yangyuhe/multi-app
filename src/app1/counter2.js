import * as React from 'react'
import "./counter.css"
import printMe from './print'

export default function Counter2() {
    const [c, setC] = React.useState(0)
    return <div className='bg'>the5 count2:{c}<button onClick={() => setC(c => c + 1)}>addxy</button></div>
}


if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}