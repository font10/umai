import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [username, setUsername] = useState(undefined)
    const putUsername = (value) => setUsername(value)

    return (
        <StateContext.Provider value={{ username, putUsername }}>
            { children }
        </StateContext.Provider>
    )
}

export const useStateContext  = () => useContext(StateContext)