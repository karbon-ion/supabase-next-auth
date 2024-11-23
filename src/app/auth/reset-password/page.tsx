'use client'

import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { supabase } from '@/utils/supabase/client'
import { LabeledField } from '@/components/ui/form-utilities'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function ResetPasswordForm() {

    const [valid, setValid] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function resetPassword(npassword: string){
        const {data, error} = await supabase.auth.updateUser({password: npassword})
        if(error){
            setEmailError(error.message)
            return
        }
        redirect('/')
    }

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == "PASSWORD_RECOVERY") {
                setValid(true)
            }
        })
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 text-black">
            {valid && <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Enter your new password below.</CardDescription>
                </CardHeader>
                    <Formik
                        initialValues={{ password: '', cPassword: '' }}
                        onSubmit={(values)=>{
                            setIsSubmitting(true)
                            resetPassword(values.password)
                            setIsSubmitting(false)
                        }}
                        validationSchema={Yup.object({
                            password: Yup.string().required(),
                            cPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords Must Match').required()
                        })}
                        >
                        {() => (
                            <Form>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <LabeledField name='password' type='password' label='Password' />
                                    </div>
                                    <div className="space-y-2">
                                        <LabeledField name='cPassword' type='password' label='Confirm New Password' />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button isLoading={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Resetting Password...' :'Reset Password'}
                                    </Button>
                                </CardFooter>
                            </Form>
                        )}
                    </Formik>
                
                <Link
                    className="text-blue-500 cursor-pointer hover:underline"
                    href='/login'
                  >
                    Login
                  </Link>
                {emailError && (
                    <Alert className="mt-4" variant={emailError ? "destructive" : "default"}>
                        <AlertTitle>{emailError ? "Error" : "Success"}</AlertTitle>
                        <AlertDescription>{emailError}</AlertDescription>
                    </Alert>
                )}
            </Card>}
        </div>
    )
}