import React, { useContext } from "react";
import { UserContext } from "./context";
export default function Button() {
    const { name } = useContext(UserContext)
    return <button onClick={() => {
        alert("hello")
    }}>{name}</button>
}