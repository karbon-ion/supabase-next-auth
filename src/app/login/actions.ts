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
      return {error}
    }
    revalidatePath('/', 'layout')
    redirect('/home')
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
    return {error}
  }

  revalidatePath('/', 'layout')
  redirect('/auth/varify-email')
}

export async function signOut(){
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if(error){
    return {error}
  }
  revalidatePath('/', 'layout')
  redirect('/login')
}