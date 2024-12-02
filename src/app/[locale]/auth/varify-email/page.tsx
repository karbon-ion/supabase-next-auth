"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from 'lucide-react'
import Link from "next/link"

export default function VerificationEmailSent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
            Verification Email Sent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            We've sent a verification email to your inbox. Please check your email and click on the verification link to complete the process.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login">
            <Button className="text-black" variant="outline">Return to Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

