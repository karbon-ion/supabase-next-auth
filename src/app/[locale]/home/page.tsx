"use client"

import { redirect } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { useEffect } from 'react'
import { useAppContext } from '@/components/context/appContext'

export default function Home() {

  const {user, setUser} = useAppContext()

  async function getUser(){
    try{
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        redirect('/login')
      }
      console.log(data.user, 'user')
      setUser(data.user)
    }catch(er){
      console.log(er)
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  return <p>Hello {user?.email}</p>
}