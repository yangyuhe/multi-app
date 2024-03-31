import React from "react";

export const UserContext = React.createContext({})

export function UserContextProvider({ children }) {
    return <UserContext.Provider value={{ name: "hexiang", id: 1 }}>
        {children}
    </UserContext.Provider>
}