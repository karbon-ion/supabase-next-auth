"use client"

import { User } from "@supabase/supabase-js";
import { useContext, useState, createContext } from "react";


export const AppContext = createContext<any>('')

export const useAppContext = ()=> useContext(AppContext)

function ContextProvider({children}: any){
    const [user, setUser] = useState<User | undefined>(undefined)

    return (
        <AppContext.Provider
        value={{
            user,
            setUser
        }}
        >
            {children}
        </AppContext.Provider>
    )
}


export default function Provider({children}: any){
    return (
        <ContextProvider>
            {children}
        </ContextProvider>
    )
}
