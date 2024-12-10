"use client"

import { User } from "@supabase/supabase-js";
import { useContext, useState, createContext } from "react";
import en from '../../messages/en.json'


export const AppContext = createContext<any>('')

export const useAppContext = ()=> useContext(AppContext)

function ContextProvider({children}: any){
    const [user, setUser] = useState<User | undefined>(undefined)
    const [t, setT] = useState(en)
    const [lang, setLang] = useState<string>()

    return (
        <AppContext.Provider
        value={{
            user,
            setUser,

            t,
            setT,

            lang,
            setLang
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
