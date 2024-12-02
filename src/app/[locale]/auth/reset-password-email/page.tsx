'use client'

import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { supabase } from '@/utils/supabase/client'
import { LabeledField } from '@/components/ui/form-utilities'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function ResetPasswordForm() {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [newPassword, setNewPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: 'http://localhost:3000/auth/reset-password' })
        if (error) {
            setEmailError(error.message)
        }
        setIsSubmitting(false)
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 text-black">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Enter your new password below.</CardDescription>
                </CardHeader>
                <form onSubmit={submitEmail}>
                    <CardContent className='space-y-4'>
                        <div className="space-y-2">
                            <Label htmlFor="password">Enter Email</Label>
                            <Input
                                id="password"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white"
                            />
                        </div>
                        <CardFooter>
                            <Button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                isLoading={isSubmitting} type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending Email...' : 'Send Email'}
                            </Button>
                        </CardFooter>
                    </CardContent>
                </form>
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
            </Card>
        </div>
    )
}