import { useState,createContext, useRef } from "react";

export const authContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const hasFetched = useRef(false);

    return (
        <authContext.Provider value={{user,setUser,loading,setLoading,hasFetched}}>
            {children}
        </authContext.Provider>
    )
}