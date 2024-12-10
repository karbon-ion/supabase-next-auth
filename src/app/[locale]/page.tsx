"use client"

import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const [logedIn, setLogedIn] = useState(false)

  async function getUser(){
    try{
      const {data, error} = await supabase.auth.getUser()
      if(error || !data?.user){
        setLogedIn(false)
      }
      else{
        setLogedIn(true)
      }
    }catch(er){
      console.log(er)
    }
  }

  useEffect(()=>{
    getUser()

    if (logedIn){
      redirect('/login')
    }
  },[])

  return (<>{logedIn}</>);
}
