import React from "react"


function getUsers() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(['lili', 'xiaoming'])
        }, 2000);
    })
}

export default function Users({ list = ['user1'] }) {
    return <ul>
        {list.map(item => {
            return <li key={item}>{item}</li>
        })}
    </ul>
}

