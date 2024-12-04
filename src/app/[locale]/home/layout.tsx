"use client"

import { useAppContext } from "@/components/context/appContext";
import AdminHeader from "@/components/ui/user-header";
import { getDictionary } from "@/components/utilities/dictionaries";
import { locale } from "@/components/utilities/models/models";
import React, { useEffect } from "react";


export default function HomeLayout({children, params
}: Readonly<{
  children: React.ReactNode;
  params: {locale: locale}
}>){

    const {setT, setLang} = useAppContext()

    async function getParamsAndDictFun(){
        try{
          const lang = (await params).locale
          const dict = await getDictionary(lang)
          setT(dict)
          setLang(lang)
        }catch(er){
          console.log(er)
        }
      } 
    
      useEffect(()=>{
        getParamsAndDictFun()
      }, [])

    return (
        <>
        <AdminHeader />
            {children}
        </>
    )
}