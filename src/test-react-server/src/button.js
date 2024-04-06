import React, { useContext, useState } from "react";
import { UserContext } from "./context";
export default function Button() {
    const { name } = useContext(UserContext)
    const [count] = useState(20)
    return <button onClick={() => {
        alert("hello")
    }}>{name}{count}</button>
}