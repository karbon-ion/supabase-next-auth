"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"
import { locale } from "@/components/utilities/models/models"

interface loginModel {
  email: string,
  password: string
}

export async function login(values: loginModel, local: locale){
    const supabase = await createClient()
    const {error} = await supabase.auth.signInWithPassword(values)

    if(error){
      return {error}
    }
    revalidatePath('/', 'layout')
    redirect(`/${local}/home`)
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

export async function signOut(local: locale){
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if(error){
    return {error}
  }
  revalidatePath('/', 'layout')
  redirect(`/${local || 'en'}/login`)
}