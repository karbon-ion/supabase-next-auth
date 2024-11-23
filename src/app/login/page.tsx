"use client"

import Link from 'next/link'
import { login, signup } from './actions'
import { Formik, Form } from 'formik'
import { LabeledField } from '@/components/ui/form-utilities'
import { Button } from '@/components/ui/button'
import * as Yup from 'yup'
import { useState } from 'react'



export default function LoginPage() {

  const [error, setError] = useState<string>('')
  const [btnLoading, setBtnLoading] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl text-black font-semibold mb-6">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setBtnLoading(true)
            const {error} = await login(values)
            setError(error.message)
            setBtnLoading(false)
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-4">
                <LabeledField name='email' label='Email' />
              </div>
              <div className="mb-4">
                <LabeledField name='password' type='password' label='Password' />
              </div>
              <div className="text-red-700">{error}</div>
              <div className="flex items-center justify-between">
                <Button
                  isLoading={btnLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  type='submit'
                >
                  {btnLoading ? 'Laoding...':'Login'}
                </Button>
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    className="text-blue-500 cursor-pointer hover:underline"
                    href='/signup'
                  >
                    Create one
                  </Link>
                  <Link
                    className="text-blue-500 cursor-pointer hover:underline"
                    href='/auth/reset-password-email'
                  >
                    Reset Password
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

