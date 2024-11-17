"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

interface loginModel {
  email: string,
  password: string
}

export async function login(values: loginModel){
    const supabase = await createClient()
    const {error} = await supabase.auth.signInWithPassword(values)

    if(error){
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/')
}

interface signUpModel {
  name: string
  email: string
  password: string
}

export async function signup(values:signUpModel){
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp(values)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/private')
}